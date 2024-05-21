# Task Management System

This project is a RESTful API for managing tasks, built using Express Web Server. It leverages design patterns (State, Factory) to handle task status transitions and provides CRUD operations for tasks with user authentication.

## Features

-   **Task Management:**
    -   Create, read, update, and delete tasks (CRUD operations).
    -   Four task statuses: To Do, In Progress, Done, Archived.
    -   State pattern for controlled status transitions.
-   **User Authentication:**
    -   User registration and login.
    -   Protected task endpoints with authentication.
-   **Technology Stack:**
    -   TypeScript: For type safety and maintainability.
    -   Express: High-performance web framework.
    -   Apollo Server: GraphQL integration.
    -   In-memory Database (for now): Easy setup for development.

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rica000/todo-task-challenge
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will typically run at `http://localhost:3000`.

## Running with Docker

1.  **Build the Docker image:**
    ```bash
    docker build -t task-management-system .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 task-management-system
    ```

## API Routes

### Authentication

-   **`POST /auth/login`:** Log in as a user (default admin user: `admin@test.com`).
-   **`POST /users`:** Register a new user.

### Tasks (Protected, requires bearer token)

-   **`GET /tasks`:** Retrieve all tasks for the authenticated user.
-   **`POST /tasks`:** Create a new task.
-   **`GET /tasks/:id`:** Retrieve a specific task by ID.
-   **`PUT /tasks/:id`:** Update a task.
-   **`DELETE /tasks/:id`:** Delete a task.

## Future Enhancements

-   Replace in-memory database with a persistent storage solution (e.g., PostgreSQL, MongoDB).
-   Implement more robust authentication and authorization mechanisms.
-   Add task filtering, sorting, and searching capabilities.
-   Implement user roles and permissions.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
