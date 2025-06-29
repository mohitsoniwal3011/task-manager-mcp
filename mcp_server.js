/**
 * MCP Task Manager Server
 * Sets up the MCP server, registers task management tools, and handles stdio transport.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  updateTaskById,
  createTask,
  getTaskByTaskId,
  getAllTasks,
  deleteTaskByTaskId
} from "./task_utils.js"

import {
  taskCreateSchema,
  taskUpdateSchema,
  getTaskByIdSchema,
  deleteTaskSchema
} from "./task_schema.js"

/**
 * Initialize the MCP server with metadata.
 */
const server = new McpServer({
  name: "task-manager-mcp",
  version: "1.0.0",
  title: "Task Manager MCP",
  description: "Task Manager MCP",
})

/**
 * Register tool to get all tasks.
 */
server.tool(
  "get-tasks",
  "Get all tasks",
  () => getAllTasks()
);

/**
 * Register tool to get a task by its ID.
 */
server.tool(
  "get-task-by-id",
  "Get a task by id",
  { id: getTaskByIdSchema },
  ({ id }) => getTaskByTaskId({ id })
);

/**
 * Register tool to create a new task.
 */
server.tool(
  "create-task",
  "Create a new task",
  {
    task: taskCreateSchema
  },
  ({ task }) => createTask(task)
)

/**
 * Register tool to update a task.
 */
server.tool(
  "update-task",
  "Update a task",
  {
    task: taskUpdateSchema
  },
  ({ task }) => updateTaskById(task)
);

/**
 * Register tool to delete a task by its ID.
 */
server.tool(
  "delete-task",
  "Delete a task by its task ID",
  {
    id: deleteTaskSchema
  },
  ({ id }) => deleteTaskByTaskId({id})
)

/**
 * Main entry point: connects the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("task MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 
