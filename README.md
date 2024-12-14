# Persona Generator

A powerful web application that helps you generate and manage user personas for your projects. This tool leverages AI to create realistic and detailed user personas that can help in user-centered design and development processes.

## Features

### 🎯 Core Features

- **AI-Powered Persona Generation**: Create detailed user personas using advanced AI technology
- **Persona Management**: Create, view, edit, and delete personas
- **Project Organization**: Group personas by projects for better organization
- **Rich Persona Details**: Generate comprehensive persona profiles including:
  - Demographics
  - Goals and motivations
  - Pain points
  - User behaviors
  - Technical proficiency
  - Preferences

### 💻 Technical Features

- **Modern Tech Stack**:
  - Frontend: React with Vite
  - Backend: Node.js
  - AI Integration: OpenAI API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback and updates when generating or editing personas

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jbjs5820/-Persona_Generator.git
cd -Persona_Generator
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# In the backend directory
cp .env.example .env
```
Then edit `.env` and add your OpenAI API key.

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3001`

## Project Structure

```
├── backend/             # Backend server code
│   ├── server.js       # Main server file
│   └── ...
├── frontend/           # Frontend React application
│   ├── src/           # Source files
│   ├── components/    # React components
│   └── ...
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- All contributors who help improve this project

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
