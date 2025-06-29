# Task Manager MCP

A modular, extensible Task Manager built using the Model Context Protocol (MCP). This project provides a robust backend for managing tasks, supporting CRUD operations, validation, and extensibility for future features.

## Features
- Create, read, update, and delete tasks
- Task schema validation using Zod
- Command-line (stdio) server interface
- Prevents duplicate task IDs
- Well-documented codebase

## Project Structure
```
task-manager-mcp/
├── index.html
├── mcp_server.js
├── package.json
├── package-lock.json
├── task_data.json
├── task_schema.js
├── task_utils.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd task-manager-mcp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the MCP Server
```bash
node mcp_server.js
```
You should see:
```
task MCP Server running on stdio
```

## Usage
The MCP server exposes tools for managing tasks:
- **get-tasks**: Retrieve all tasks
- **get-task-by-id**: Retrieve a task by its ID
- **create-task**: Create a new task (ID must be unique)
- **update-task**: Update an existing task
- **delete-task**: Delete a task by its ID

All data is stored in `task_data.json` in the project root.

## Code Overview
- **task_utils.js**: Core logic for task CRUD operations and validation
- **task_schema.js**: Zod schemas for task validation
- **mcp_server.js**: MCP server setup and tool registration

## Extending the Project
You can enhance this project by adding:
- Subtasks and task dependencies
- User authentication and roles
- Notifications and reminders
- REST/GraphQL API endpoints
- Database integration (e.g., MongoDB, PostgreSQL)
- Web or mobile frontend

## Contributing
Pull requests and issues are welcome! Please ensure code is well-documented and tested.

## License
MIT 