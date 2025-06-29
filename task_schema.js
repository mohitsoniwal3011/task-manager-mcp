/**
 * Task schema definitions for validation using zod.
 * Includes schemas for creating, updating, retrieving, and deleting tasks.
 */
import { z } from "zod";

/**
 * Schema for updating a task. All fields are optional except id, which is required.
 */
const taskUpdateSchema = z.object({
    id: z.string().describe("The ID of the task"), // required
    task_name: z.string().optional().describe("The name of the task"),
    owner: z.string().optional().describe("The owner of the task"),
    due_date: z.string().optional().describe("The due date of the task"),
    summary: z.string().optional().describe("The summary of the task"),
    priority: z.string().optional().describe("The priority of the task"),
    status: z.string().optional().describe("The status of the task"),
    created_date: z.string().optional().describe("The created date of the task"),
    estimated_hours: z.number().optional().describe("The estimated hours of the task"),
    tags: z.array(z.string()).optional().describe("The tags of the task"),
});

/**
 * Schema for creating a new task. All fields are required.
 */
const taskCreateSchema = z.object({
    id: z.string().describe("The ID of the task"),
    task_name: z.string().describe("The name of the task"),
    owner: z.string().describe("The owner of the task"),
    due_date: z.string().describe("The due date of the task"),
    summary: z.string().describe("The summary of the task"),
    priority: z.string().describe("The priority of the task"),
    status: z.string().describe("The status of the task"),
    created_date: z.string().describe("The created date of the task"),
    estimated_hours: z.number().describe("The estimated hours of the task"),
    tags: z.array(z.string()).describe("The tags of the task"),
});

/**
 * Schema for retrieving a task by its ID (expects a string ID).
 */
const getTaskByIdSchema = z.string().describe("The ID of the task to retrieve")

/**
 * Schema for deleting a task by its ID (expects a string ID).
 */
const deleteTaskSchema = z.string().describe("The ID of task to delete")

export {
    taskCreateSchema,
    taskUpdateSchema,
    getTaskByIdSchema,
    deleteTaskSchema
}