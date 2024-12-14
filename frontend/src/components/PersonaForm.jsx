import { useState } from 'react';
import axios from 'axios';

function PersonaForm({ projectId, onPersonaCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    location: '',
    background: '',
    goals: '',
    painPoints: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/projects/${projectId}/personas`, formData);
      onPersonaCreated(response.data);
      setFormData({
        name: '',
        age: '',
        occupation: '',
        location: '',
        background: '',
        goals: '',
        painPoints: ''
      });
    } catch (error) {
      console.error('Error creating persona:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <span role="img" aria-label="name">👤</span> Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            <span role="img" aria-label="age">🎂</span> Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="occupation" className="form-label">
            <span role="img" aria-label="occupation">💼</span> Occupation
          </label>
          <input
            type="text"
            name="occupation"
            id="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            <span role="img" aria-label="location">📍</span> Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="background" className="form-label">
          <span role="img" aria-label="background">📝</span> Background
        </label>
        <textarea
          name="background"
          id="background"
          value={formData.background}
          onChange={handleChange}
          rows={3}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="goals" className="form-label">
          <span role="img" aria-label="goals">🎯</span> Goals
        </label>
        <textarea
          name="goals"
          id="goals"
          value={formData.goals}
          onChange={handleChange}
          rows={3}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="painPoints" className="form-label">
          <span role="img" aria-label="pain points">❗</span> Pain Points
        </label>
        <textarea
          name="painPoints"
          id="painPoints"
          value={formData.painPoints}
          onChange={handleChange}
          rows={3}
          className="form-input"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        <span role="img" aria-label="create">✨</span>
        Create Persona
      </button>
    </form>
  );
}

export default PersonaForm;
