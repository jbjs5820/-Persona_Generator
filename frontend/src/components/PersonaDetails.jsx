import React from 'react';

const PersonaDetails = ({ persona, onClose }) => {
  if (!persona) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {persona.name}
            <span className={`ml-3 text-sm px-3 py-1 rounded-full ${
              persona.isAIGenerated 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {persona.isAIGenerated ? '🤖 AI Generated' : '👤 Base Persona'}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-400">Age</p>
              <p className="text-white text-lg">{persona.age}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Occupation</p>
              <p className="text-white text-lg">{persona.occupation}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Location</p>
              <p className="text-white text-lg">{persona.location}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Background</h3>
            <p className="text-gray-300">{persona.background}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Goals</h3>
            <div className="text-gray-300 space-y-1">
              {typeof persona.goals === 'string' ? (
                <p>{persona.goals}</p>
              ) : (
                <ul className="list-disc list-inside">
                  {Array.isArray(persona.goals) && persona.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Pain Points</h3>
            <div className="text-gray-300 space-y-1">
              {typeof persona.painPoints === 'string' ? (
                <p>{persona.painPoints}</p>
              ) : (
                <ul className="list-disc list-inside">
                  {Array.isArray(persona.painPoints) && persona.painPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaDetails;
