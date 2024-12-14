import { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectForm from './components/ProjectForm'
import PersonaForm from './components/PersonaForm'
import PersonaList from './components/PersonaList'
import PersonaDetails from './components/PersonaDetails'
import './App.css'

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchPersonas(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchPersonas = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/projects/${projectId}/personas`);
      setPersonas(response.data);
    } catch (error) {
      console.error('Error fetching personas:', error);
    }
  };

  const handleProjectCreated = (project) => {
    setProjects([...projects, project]);
  };

  const handlePersonaCreated = (persona) => {
    setPersonas([...personas, persona]);
  };

  const handleGeneratePersonas = async () => {
    if (!selectedProject || personas.length < 2) {
      alert('Please create at least 2 initial personas before generating more.');
      return;
    }

    try {
      setIsGenerating(true);
      const response = await axios.post(`http://localhost:5001/api/projects/${selectedProject.id}/personas/generate`);
      setPersonas([...personas, ...response.data]);
    } catch (error) {
      console.error('Error generating personas:', error);
      alert('Failed to generate personas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPersona = async (persona) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/projects/${selectedProject.id}/personas/${persona.id}/export`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${persona.name.toLowerCase().replace(/\s+/g, '-')}-persona.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting persona:', error);
      alert('Failed to export persona. Please try again.');
    }
  };

  const handlePersonaUpdate = (updatedPersona) => {
    setPersonas(personas.map(p => 
      p.id === updatedPersona.id ? updatedPersona : p
    ));
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>
          <span role="img" aria-label="personas">👥</span> Persona Generator
        </h1>
      </header>
      
      <div className="content">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">
            <span role="img" aria-label="projects">📂</span> Projects
          </h2>
          <ProjectForm onProjectCreated={handleProjectCreated} />
          
          {projects.length > 0 && (
            <div className="form-group">
              <label className="form-label">Select Project:</label>
              <select
                className="form-input"
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = projects.find(p => p.id === e.target.value);
                  setSelectedProject(project);
                }}
              >
                <option value="">Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedProject && (
          <>
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">
                <span role="img" aria-label="create">✨</span> Create Persona
              </h2>
              <PersonaForm
                projectId={selectedProject.id}
                onPersonaCreated={handlePersonaCreated}
              />
            </div>

            {personas.length >= 2 && !isGenerating && (
              <div className="flex justify-center my-8">
                <button
                  onClick={handleGeneratePersonas}
                  className="btn btn-primary"
                >
                  <span role="img" aria-label="ai">🤖</span>
                  Generate 10 AI Personas
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p className="mt-4">Generating 10 Personas...</p>
              </div>
            )}

            <PersonaList
              personas={personas}
              onPersonaClick={setSelectedPersona}
            />
          </>
        )}
      </div>

      {selectedPersona && (
        <PersonaDetails
          persona={selectedPersona}
          onClose={() => setSelectedPersona(null)}
          projectId={selectedProject?.id}
          onPersonaUpdate={handlePersonaUpdate}
          onExport={handleExportPersona}
        />
      )}
    </div>
  );
}

export default App
