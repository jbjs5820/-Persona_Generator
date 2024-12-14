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

### Backend Setup
1. ✅ Created Express server with basic endpoints
2. ✅ Set up CORS and middleware
3. ✅ Created initial API structure

### Frontend Setup
1. ✅ Created Next.js application with Tailwind CSS
2. ✅ Set up basic page routing
3. ✅ Implemented initial UI components
4. ✅ Implemented 5 base personas creation flow
5. ✅ Created context/problem definition page
6. ✅ Integrated OpenAI for 95 personas generation

## Pending Tasks

### Core Functionality
1. [ ] Implement persona editing functionality
    ```
    Prompt: "Create a React component for editing persona details. The component should:
    - Accept a persona object with fields for demographics, psychographics, goals, and pain points
    - Include form validation for required fields
    - Handle real-time updates
    - Save changes to the backend
    - Show success/error notifications
    Use Tailwind CSS for styling and include proper TypeScript types."
    ```

2. [ ] Create report generation system
    ```
    Prompt: "Develop a report generation system that:
    - Analyzes 100 personas
    - Creates visualizations using Chart.js or Recharts
    - Generates insights about demographic patterns
    - Shows acceptance rates in different segments
    - Exports to PDF using react-pdf
    Include the component structure and data processing logic."
    ```

3. [ ] Add data validation for persona inputs
    ```
    Prompt: "Implement a comprehensive validation system for persona data that:
    - Validates demographic data formats
    - Ensures required fields are filled
    - Checks for data consistency
    - Provides user-friendly error messages
    - Includes both frontend and backend validation
    Use Zod or Yup for schema validation. Show the implementation for both client and server-side validation."
    ```

4. [ ] Implement persona search and filtering
    ```
    Prompt: "Create a search and filter system for personas that includes:
    - Real-time search across all persona fields
    - Multiple filter criteria (age, location, interests)
    - Advanced filtering with AND/OR conditions
    - Sorting capabilities
    - URL-based filter state
    Use React hooks for state management and demonstrate efficient search algorithms."
    ```

5. [ ] Create persona comparison tools
    ```
    Prompt: "Develop a tool to compare multiple personas side by side:
    - Allow selection of 2-4 personas for comparison
    - Show demographic overlaps and differences
    - Visualize shared characteristics
    - Calculate similarity scores
    - Generate comparison reports
    Include the component structure and comparison logic implementation."
    ```

### Storage Integration
1. [ ] Set up Supabase integration
    ```
    Prompt: "Create a Supabase integration that:
    - Sets up authentication with Supabase
    - Implements CRUD operations for personas
    - Handles real-time updates
    - Manages project data storage
    - Includes error handling
    Show the complete implementation including schema design and API methods."
    ```

2. [ ] Implement Airtable connection
    ```
    Prompt: "Develop an Airtable integration that:
    - Connects to Airtable API
    - Syncs persona data bidirectionally
    - Handles rate limiting
    - Manages data mapping
    - Includes error recovery
    Include authentication setup and data transformation logic."
    ```

3. [ ] Add Google Sheets support
    ```
    Prompt: "Create a Google Sheets integration that:
    - Authenticates with Google Sheets API
    - Reads/writes persona data
    - Manages worksheet creation and updates
    - Handles concurrent access
    - Includes version control
    Show the implementation with OAuth setup and data sync logic."
    ```

4. [ ] Create CSV import/export functionality
    ```
    Prompt: "Implement CSV handling that:
    - Imports CSV files with persona data
    - Validates CSV structure and content
    - Exports personas to CSV format
    - Handles large datasets efficiently
    - Includes progress tracking
    Use Papa Parse for CSV processing and show error handling implementation."
    ```

5. [ ] Implement project history management
    ```
    Prompt: "Develop a project history system that:
    - Tracks all changes to personas
    - Maintains version history
    - Allows reverting changes
    - Shows audit trail
    - Handles concurrent edits
    Include the data structure and state management implementation."
    ```

### User Interface
1. [ ] Create dashboard for project management
    ```
    Prompt: "Design and implement a dashboard that:
    - Shows project overview statistics
    - Lists recent activities
    - Provides quick access to common actions
    - Includes project analytics
    - Features responsive layout
    Use Tailwind CSS for styling and include dark mode support."
    ```

2. [ ] Implement persona list view with filters
    ```
    Prompt: "Create a persona list view component that:
    - Shows persona cards in a grid/list layout
    - Implements infinite scroll
    - Provides quick filter options
    - Includes bulk actions
    - Features responsive design
    Show the implementation using React virtualization for performance."
    ```

3. [ ] Build persona detail/edit pages
    ```
    Prompt: "Develop persona detail pages that:
    - Show all persona information
    - Allow inline editing
    - Include image/avatar management
    - Show related personas
    - Track edit history
    Use React Query for data management and show form handling implementation."
    ```

4. [ ] Add report visualization components
    ```
    Prompt: "Create visualization components that:
    - Show demographic distributions
    - Display psychographic patterns
    - Generate heat maps of characteristics
    - Create comparative charts
    - Export to various formats
    Use D3.js or Recharts and include responsive design implementation."
    ```

5. [ ] Create storage selection interface
    ```
    Prompt: "Implement a storage selection interface that:
    - Lists available storage options
    - Shows connection status
    - Handles authentication flows
    - Provides storage quotas/limits
    - Includes error recovery
    Show the implementation with proper state management."
    ```

### Documentation & Testing
1. [ ] Write API documentation
    ```
    Prompt: "Generate comprehensive API documentation that:
    - Details all endpoints and methods
    - Includes request/response examples
    - Shows authentication flows
    - Provides error codes and handling
    - Includes rate limiting info
    Use OpenAPI/Swagger format and include markdown documentation."
    ```

2. [ ] Create user guide
    ```
    Prompt: "Create a user guide that:
    - Explains all features and workflows
    - Includes step-by-step tutorials
    - Provides troubleshooting guides
    - Shows best practices
    - Features screenshots and examples
    Generate in markdown format with proper structure and navigation."
    ```

3. [ ] Implement unit tests
    ```
    Prompt: "Write unit tests that:
    - Cover all core functionality
    - Test edge cases
    - Mock external services
    - Include snapshot tests
    - Maintain good coverage
    Use Jest and React Testing Library, show implementation for key components."
    ```

4. [ ] Add integration tests
    ```
    Prompt: "Create integration tests that:
    - Test complete workflows
    - Verify API interactions
    - Check storage operations
    - Test authentication flows
    - Include performance tests
    Use Cypress or Playwright, show implementation for main user journeys."
    ```

5. [ ] Create deployment guide
    ```
    Prompt: "Write a deployment guide that:
    - Details infrastructure setup
    - Includes environment configuration
    - Shows CI/CD pipeline setup
    - Provides monitoring setup
    - Includes backup procedures
    Include Docker and cloud deployment instructions."
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
