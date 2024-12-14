const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const PDFDocument = require('pdfkit');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// In-memory storage
let projects = [];
let personas = {};

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Test OpenAI route
app.get('/api/test-openai', async (req, res) => {
  try {
    console.log('Testing OpenAI connection...');
    console.log('API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Return a simple JSON object with a test message."
        },
        {
          role: "user",
          content: "Return a JSON object with a 'message' field that says 'OpenAI API is working!'"
        }
      ],
      temperature: 0.7,
    });

    console.log('OpenAI Response:', completion.choices[0].message);
    res.json({ 
      success: true, 
      response: completion.choices[0].message,
      apiKeyPresent: !!process.env.OPENAI_API_KEY
    });
  } catch (error) {
    console.error('OpenAI Test Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      apiKeyPresent: !!process.env.OPENAI_API_KEY
    });
  }
});

// Projects Routes
app.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  const project = {
    _id: Date.now().toString(),
    name,
    description,
    createdAt: new Date().toISOString(),
    status: 'New'
  };
  projects.push(project);
  personas[project._id] = {
    base: [],
    generated: []
  };
  res.json(project);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:projectId', (req, res) => {
  const project = projects.find(p => p._id === req.params.projectId);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Personas Routes
app.post('/api/projects/:projectId/personas', (req, res) => {
  const { projectId } = req.params;
  const persona = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  if (!personas[projectId]) {
    personas[projectId] = { base: [], generated: [] };
  }
  
  personas[projectId].base.push(persona);
  res.json(persona);
});

app.get('/api/projects/:projectId/personas', (req, res) => {
  const { projectId } = req.params;
  const projectPersonas = personas[projectId] || { base: [], generated: [] };
  res.json([...projectPersonas.base, ...projectPersonas.generated]);
});

app.put('/api/projects/:projectId/personas/:personaId', (req, res) => {
  const { projectId, personaId } = req.params;
  const projectPersonas = personas[projectId];
  
  if (!projectPersonas) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const personaIndex = projectPersonas.base.findIndex(p => p._id === personaId);
  if (personaIndex === -1) {
    return res.status(404).json({ error: 'Persona not found' });
  }

  projectPersonas.base[personaIndex] = {
    ...projectPersonas.base[personaIndex],
    ...req.body,
    _id: personaId
  };

  res.json(projectPersonas.base[personaIndex]);
});

app.post('/api/projects/:projectId/personas/generate', async (req, res) => {
  const { projectId } = req.params;
  console.log('Starting persona generation for project:', projectId);

  if (!personas[projectId]) {
    console.error('Project not found:', projectId);
    return res.status(404).json({ error: 'Project not found' });
  }

  if (personas[projectId].base.length < 2) {
    console.error('Not enough base personas:', personas[projectId].base.length);
    return res.status(400).json({ error: 'Please create at least 2 base personas before generating AI personas. This helps ensure the generated personas are relevant to your project.' });
  }

  try {
    const basePersonas = personas[projectId].base;
    const project = projects.find(p => p._id === projectId);
    console.log('Base personas:', basePersonas.length);
    const remainingCount = 10; 
    const generatedPersonas = [];

    for (let i = 0; i < remainingCount; i += 2) {
      console.log(`Generating batch ${i/2 + 1}`);
      const batchSize = Math.min(2, remainingCount - i);
      const prompt = `Project Context: "${project.description}"

Based on the project context above and these ${basePersonas.length} base personas: ${JSON.stringify(basePersonas)}, generate ${batchSize} new unique personas that are specifically relevant to this project's context and goals. Each persona should be different from the base personas and from each other, but all should be potential users or stakeholders for this specific project. Return a JSON array of ${batchSize} personas. Respond in the same language as the project description.`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that generates highly contextual personas. Analyze the project description carefully and ensure all generated personas are relevant to that specific context. Return only valid JSON array containing personas. Each persona should have: name, age, occupation, location, background, goals, painPoints. Make sure to create diverse but contextually appropriate personas. Use the same language as the project description for all content.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8,
          response_format: { type: "json_object" },
          max_tokens: 2000
        });

        console.log('OpenAI response received for batch', i/2 + 1);
        const responseContent = completion.choices[0].message.content;
        console.log('Response content:', responseContent);

        const parsedResponse = JSON.parse(responseContent);
        const batchPersonas = Array.isArray(parsedResponse) ? parsedResponse : parsedResponse.personas;

        if (!Array.isArray(batchPersonas)) {
          throw new Error('Invalid response format from OpenAI');
        }

        const formattedBatchPersonas = batchPersonas.map(persona => ({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...persona,
          createdAt: new Date().toISOString(),
          generated: true
        }));

        generatedPersonas.push(...formattedBatchPersonas);
        personas[projectId].generated.push(...formattedBatchPersonas);
        console.log(`Added ${formattedBatchPersonas.length} personas to batch ${i/2 + 1}`);

        if (i + batchSize < remainingCount) {
          console.log('Waiting before next batch...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (batchError) {
        console.error('Error in batch ${i/2 + 1}:', batchError);
        console.error('Error details:', batchError.stack);
      }
    }

    console.log(`Generation complete. Total personas generated: ${generatedPersonas.length}`);
    res.json(generatedPersonas);
  } catch (error) {
    console.error('Error generating personas:', error);
    console.error('Error details:', error.stack);
    res.status(500).json({ 
      error: 'Failed to generate personas', 
      details: error.message,
      stack: error.stack 
    });
  }
});

// Export persona as PDF
app.get('/api/projects/:projectId/personas/:personaId/export', async (req, res) => {
  const { projectId, personaId } = req.params;
  
  try {
    const projectPersonas = personas[projectId];
    if (!projectPersonas) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const persona = projectPersonas.base.find(p => p._id === personaId) || projectPersonas.generated.find(p => p._id === personaId);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${persona.name.toLowerCase().replace(/\s+/g, '-')}-persona.pdf`);
    
    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(24).text(persona.name, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text('Basic Information', { underline: true });
    doc.fontSize(12).text(`Age: ${persona.age}`);
    doc.fontSize(12).text(`Occupation: ${persona.occupation}`);
    doc.fontSize(12).text(`Location: ${persona.location}`);
    doc.moveDown();
    
    doc.fontSize(14).text('Background', { underline: true });
    doc.fontSize(12).text(persona.background);
    doc.moveDown();
    
    if (persona.goals && persona.goals.length > 0) {
      doc.fontSize(14).text('Goals', { underline: true });
      persona.goals.forEach(goal => {
        doc.fontSize(12).text(`• ${goal}`);
      });
      doc.moveDown();
    }
    
    if (persona.painPoints && persona.painPoints.length > 0) {
      doc.fontSize(14).text('Pain Points', { underline: true });
      persona.painPoints.forEach(point => {
        doc.fontSize(12).text(`• ${point}`);
      });
    }

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Error exporting persona:', error);
    res.status(500).json({ error: 'Failed to export persona' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});