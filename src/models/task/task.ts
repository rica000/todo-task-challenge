import { randomUUID } from "crypto";
import {
    ArchivedState,
    DoneState,
    InProgressState,
    NewState,
    TaskState,
} from "./task-state";

export const taskStatuses = {
    new: NewState,
    in_progress: InProgressState,
    done: DoneState,
    archived: ArchivedState,
};
export type TaskStatus = keyof typeof taskStatuses;

export class Task {
    public readonly id: string;
    private status: TaskStatus = "new";
    constructor(
        private title: string,
        private description: string,
        private userId: string
    ) {
        this.id = randomUUID();
        this.title = title;
        this.description = description;
        this.status = "new";
        this.userId = userId;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStatus(): string {
        return this.status;
    }

    private createState(status: TaskStatus): TaskState {
        const StateClass = taskStatuses[this.status];
        if (!StateClass) {
            throw new Error(`Invalid status: ${status}`);
        }
        return new StateClass();
    }

    public setStatus(status: TaskStatus): void {
        const state = this.createState(status);
        this.status = state.setStatus(this, status);
    }

    public getUserId(): string {
        return this.userId;
    }
}
