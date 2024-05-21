# Task Management Code Challenge

This repository contains a solution for a code challenge that involves creating a task management system. The system allows users to create tasks, update their status, and retrieve them.

## Features

-   Create a new task with a title and description.
-   Update the status of a task. The status can be "New", "In Progress", "Done", or "Archived".
-   Retrieve a task by its ID.

## Implementation Details

The task management system is implemented using TypeScript. The system uses the State and Factory design patterns to handle task status changes. The State pattern allows the system to change its behavior based on the task's current status, and the Factory pattern is used to create the appropriate state object based on the task's status.

The `Task` class represents a task. Each task has an ID, title, description, and status. The status of a task is managed by a `TaskState` object, which is created by the `TaskStateFactory`.

## Usage

To use the task management system, create a new `Task` object and call its methods to update its status and retrieve its details. Note that the `state` property is not included when a task is returned.

## Future Improvements

Future improvements could include adding more task statuses, implementing persistence, and adding user authentication.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request if you have any improvements or suggestions.
