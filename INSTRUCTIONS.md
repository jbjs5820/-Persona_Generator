# Project Overview
The Persona Generator is a Next.js web application that helps create and manage user personas for projects. It uses a Next.js frontend with Express.js backend (or Next.js API routes), integrates with OpenAI's API for AI-generated personas, and supports multiple storage options.

## ⚠️ IMPORTANT INSTRUCTIONS - READ FIRST
1. **ALWAYS read this entire document before starting any new task or making any changes to the codebase.**
2. **NEVER modify existing functionalities that are already working in the application.**
   - All completed features (marked with ✅) are final and working
   - Any changes to existing features could break the application flow
   - Focus only on implementing new features from the Pending Tasks section
3. **If you need to integrate with existing features:**
   - Study the existing implementation first
   - Create new components/functions instead of modifying existing ones
   - Use existing APIs and interfaces
   - Test thoroughly in isolation before integration
4. **Always create a new branch for any new feature implementation**

Remember: The application has a specific flow for persona creation (5 base + 95 AI-generated) that is already working. This core functionality must remain untouched.

## Project Structure
```
my-personas-app/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── routes/
│   │   ├── personas.js
│   │   ├── projects.js
│   │   └── storage.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── pages/
│   │   ├── _app.js
│   │   ├── index.js
│   │   ├── projects.js
│   │   ├── create-personas.js
│   │   ├── context.js
│   │   ├── personas.js
│   │   ├── personas/[id].js
│   │   ├── storage.js
│   │   └── report.js
│   ├── components/
│   │   ├── PersonaForm.js
│   │   ├── ContextForm.js
│   │   ├── PersonaList.js
│   │   ├── PersonaCard.js
│   │   └── ReportVisuals.js
│   ├── styles/
│   │   └── globals.css
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── airtable.js
│   │   └── sheets.js
│   └── package.json
└── README.md
```

## Completed Steps

### 1. Backend Setup
1.1. ✅ Created Express server with basic endpoints
1.2. ✅ Set up CORS and middleware
1.3. ✅ Created initial API structure

### 2. Frontend Setup
2.1. ✅ Created Next.js application with Tailwind CSS
2.2. ✅ Set up basic page routing
2.3. ✅ Implemented initial UI components
2.4. ✅ Implemented 5 base personas creation flow
2.5. ✅ Created context/problem definition page
2.6. ✅ Integrated OpenAI for 95 personas generation

## Pending Tasks

### 3. Core Functionality
3.1. [ ] Implement persona editing functionality
    ```
    Prompt: "Create a React component for editing persona details. The component should:
    - Accept a persona object with fields for demographics, psychographics, goals, and pain points
    - Include form validation for required fields
    - Handle real-time updates
    - Save changes to the backend
    - Show success/error notifications
    Use Tailwind CSS for styling and include proper TypeScript types."
    ```

3.2. [ ] Create report generation system
    ```
    Prompt: "Develop a report generation system that:
    - Analyzes 100 personas
    - Creates visualizations using Chart.js or Recharts
    - Generates insights about demographic patterns
    - Shows acceptance rates in different segments
    - Exports to PDF using react-pdf
    Include the component structure and data processing logic."
    ```

3.3. [ ] Add data validation for persona inputs
    ```
    Prompt: "Implement a comprehensive validation system for persona data that:
    - Validates all required fields
    - Checks data format and types
    - Provides real-time feedback
    - Prevents submission of invalid data
    - Includes custom validation rules for specific fields
    Create reusable validation hooks and utilities."
    ```

3.4. [ ] Implement storage integration
    ```
    Prompt: "Create a storage system that:
    - Supports multiple storage backends (Supabase, Airtable, Google Sheets)
    - Implements a common interface for all storage providers
    - Handles data synchronization
    - Includes error handling and retry logic
    - Provides status updates for long operations
    Document the integration process and API endpoints."
    ```

3.5. [ ] Create persona comparison tools
    ```
    Prompt: "Develop a tool to compare multiple personas side by side:
    - Allow selection of 2-4 personas for comparison
    - Show demographic overlaps and differences
    - Highlight common goals and pain points
    - Generate insights about persona relationships
    - Export comparison data
    Include the component design and comparison logic."
    ```

### 4. Testing & Documentation
4.1. [ ] Create comprehensive documentation
    ```
    Prompt: "Write detailed documentation covering:
    - System architecture
    - API endpoints
    - Component hierarchy
    - State management
    - Storage integration
    Include code examples and common use cases."
    ```

4.2. [ ] Add end-to-end tests
    ```
    Prompt: "Create end-to-end tests using Cypress that:
    - Test the complete persona creation flow
    - Verify storage integration
    - Test report generation
    - Check comparison tools
    - Validate form submissions
    Include test cases and setup instructions."
    ```

4.3. [ ] Implement unit tests
    ```
    Prompt: "Write unit tests that:
    - Cover all core functionality
    - Test edge cases
    - Mock external dependencies
    - Verify state updates
    - Test utilities and hooks
    Use Jest and React Testing Library."
    ```

### 5. Deployment & CI/CD
5.1. [ ] Set up CI/CD pipeline
    ```
    Prompt: "Create a CI/CD pipeline that:
    - Runs tests on pull requests
    - Builds the application
    - Deploys to staging
    - Handles production deployment
    - Includes rollback procedures
    Document the deployment process."
    ```

5.2. [ ] Configure monitoring and logging
    ```
    Prompt: "Implement monitoring and logging:
    - Set up error tracking
    - Add performance monitoring
    - Configure log aggregation
    - Create alerts
    - Add usage analytics
    Include setup instructions and dashboard configuration."
    ```

5.3. [ ] Implement security measures
    ```
    Prompt: "Add security features:
    - Implement authentication
    - Add authorization rules
    - Set up CORS properly
    - Add rate limiting
    - Configure security headers
    Document security best practices."
    ```

## Application Flow

1. Dashboard
   - View existing projects
   - Create new project
   - Search/filter projects

2. Initial Personas Creation
   - Create 5 base personas
   - Input demographics, psychographics, goals, pain points

3. Context Definition
   - Define problem/market context
   - Set project goals
   - Input competitor information

4. AI Generation
   - Generate 95 additional personas
   - Review and validate generated personas

5. Management
   - Edit individual personas
   - Filter and search
   - Export/import functionality

6. Storage
   - Choose storage solution
   - Handle data persistence
   - Manage project history

7. Reporting
   - Generate analysis reports
   - Create visualizations
   - Export findings

## Running the Application

### Backend
1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create .env file:
   ```
   OPENAI_API_KEY=your_key
   PORT=5000
   ```

3. Start server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start Next.js:
   ```bash
   npm run dev
   ```

Access the application at http://localhost:3000

## Best Practices
- Follow Next.js and React best practices
- Implement proper error handling
- Use TypeScript for better type safety
- Keep components focused and reusable
- Write clear documentation
- Maintain consistent code style

## Notes
- OpenAI API key required for persona generation
- Minimum 5 base personas required
- Support for multiple storage options
- CSV import/export functionality available
