import { Task, TaskStatus } from "./task";

export interface TaskState {
    setStatus(task: Task, status: TaskStatus): TaskStatus;
}

class NewState implements TaskState {
    setStatus(task: Task, status: TaskStatus): TaskStatus {
        if (status === "done") {
            throw new Error("Cannot finish a new task");
        }
        return status;
    }
}

class DoneState implements TaskState {
    setStatus(task: Task, status: TaskStatus): TaskStatus {
        if (status !== "archived") {
            throw new Error("Cannot revert from Done");
        }
        return status;
    }
}

class InProgressState implements TaskState {
    setStatus(task: Task, status: TaskStatus): TaskStatus {
        if (status === "new") {
            throw new Error("Cannot start over a task");
        }
        return status;
    }
}

class ArchivedState implements TaskState {
    setStatus(task: Task, status: TaskStatus): TaskStatus {
        console.log(task, status);
        throw new Error("Cannot change status from Archived");
    }
}

export { NewState, DoneState, InProgressState, ArchivedState };
