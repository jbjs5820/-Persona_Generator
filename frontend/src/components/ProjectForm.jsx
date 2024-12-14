import { useState } from 'react';
import axios from 'axios';

function ProjectForm({ onProjectCreated }) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/projects', {
        name: projectName,
        description
      });
      onProjectCreated(response.data);
      setProjectName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="projectName" className="form-label">
          <span role="img" aria-label="project">📂</span> Project Name
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="form-input"
          placeholder="Enter project name..."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          <span role="img" aria-label="description">📝</span> Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows={3}
          placeholder="Describe your project..."
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        <span role="img" aria-label="create">✨</span>
        Create Project
      </button>
    </form>
  );
}

export default ProjectForm;
