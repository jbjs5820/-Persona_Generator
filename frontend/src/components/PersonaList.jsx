import React from 'react';

const PersonaList = ({ personas, onPersonaClick }) => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">
        <span role="img" aria-label="personas">👥</span> Personas ({personas.length})
      </h2>
      <div className="persona-grid">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className="persona-card"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{persona.name}</h3>
              <span className={`text-sm px-2 py-1 rounded-full ${
                persona.isAIGenerated 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'bg-blue-500/20 text-blue-300'
              }`}>
                {persona.isAIGenerated ? '🤖 AI' : '👤 Base'}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <span role="img" aria-label="age">🎂</span>{' '}
                <span className="font-medium">Age:</span> {persona.age}
              </p>
              <p className="text-sm text-gray-300">
                <span role="img" aria-label="occupation">💼</span>{' '}
                <span className="font-medium">Occupation:</span> {persona.occupation}
              </p>
              <p className="text-sm text-gray-300">
                <span role="img" aria-label="background">📍</span>{' '}
                <span className="font-medium">Background:</span> {persona.background}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => onPersonaClick(persona)}
                className="btn btn-secondary text-sm"
              >
                View Details <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaList;
