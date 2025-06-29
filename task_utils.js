import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

// Required for ES modules to simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve relative path to absolute
const dataFilePath = path.resolve(__dirname, "task_data.json");


/**
 * Updates a task by its ID.
 * @param {Object} task - The task object with updated fields. Must include the task's id.
 * @returns {Object} Result message content.
 */
const updateTaskById = (task) => {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    const taskIndex = tasks.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
        const existingTask = tasks.tasks[taskIndex];
        const updatedTask = { ...existingTask, ...task };
        tasks.tasks[taskIndex] = updatedTask;

        fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));

        return {
            content: [
                {
                    type: "text",
                    text: `Task updated successfully: ${updatedTask.task_name || existingTask.task_name}`,
                },
            ],
        };
    } else {
        return {
            content: [
                {
                    type: "text",
                    text: `Task with id ${task.id} not found.`,
                },
            ],
        };
    }
}

/**
 * Creates a new task if the ID does not already exist.
 * @param {Object} task - The task object to create. Must include a unique id.
 * @returns {Object} Result message content.
 */
const createTask = (task) => {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    // Check for duplicate ID
    const duplicate = tasks.tasks.find((t) => t.id === task.id);
    if (duplicate) {
        return {
            content: [
                {
                    type: "text",
                    text: `Task with id ${task.id} already exists.`,
                },
            ],
        };
    }
    tasks.tasks.push(task);
    fs.writeFileSync("/Users/mohit/Code/MCPs/task_data.json", JSON.stringify(tasks, null, 2));
    return {
        content: [
            {
                type: "text",
                text: `Task created successfully: ${task.task_name}`,
            },
        ],
    };
}

/**
 * Retrieves a task by its ID.
 * @param {Object} param0 - Object containing the id of the task to retrieve.
 * @param {string} param0.id - The ID of the task.
 * @returns {Object} Result message content.
 */
const getTaskByTaskId = ({ id }) => {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    const task = tasks.tasks?.find((task) => task.id == id);
    return {
        content: [
            {
                type: "text",
                text: task ? JSON.stringify(task) : `Task with id ${id} not found.`,
            },
        ],
    };
}

/**
 * Retrieves all tasks from the data file.
 * @returns {Object} Result message content.
 */
const getAllTasks = () => {
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(fs.readFileSync(dataFilePath, "utf-8")),
            },
        ],
    };
}

/**
 * Deletes a task by its ID.
 * @param {Object} param0 - Object containing the id of the task to delete.
 * @param {string} param0.id - The ID of the task.
 * @returns {Object} Result message content.
 */
const deleteTaskByTaskId = ({ id }) => {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    const taskIndex = tasks.tasks.findIndex((t) => t.id === id);

    if (taskIndex !== -1) {
        const deletedTask = tasks.tasks.splice(taskIndex, 1)[0]; // remove and store deleted task
        fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));

        return {
            content: [
                {
                    type: "text",
                    text: `Task deleted successfully: ${deletedTask.task_name || deletedTask.id}`,
                },
            ],
        };
    } else {
        return {
            content: [
                {
                    type: "text",
                    text: `Task with id ${id} not found.`,
                },
            ],
        };
    }
};


export {
    updateTaskById,
    createTask,
    getTaskByTaskId,
    getAllTasks, 
    deleteTaskByTaskId
}

