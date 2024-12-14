import React from 'react';

const ProjectDetails = ({ project }) => {
  if (!project) return null;

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          <span role="img" aria-label="project">📂</span> {project.name}
        </h2>
        <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
          {project.status}
        </span>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Description</p>
          <p className="text-gray-300">{project.description}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400">
          <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
