type Status = "New" | "In Progress" | "Done" | "Archived";

export class Task {
    private status: Status = "New";
    constructor(
        private title: string,
        private description: string = "",
    ) {}

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

    public start(): void {
        if (this.status === "New") {
            this.status = "In Progress";
        } else {
            throw new Error("Task is not new");
        }
    }

    public finish(): void {
        if (this.status === "In Progress") {
            this.status = "Done";
        } else {
            throw new Error("Task is not in progress");
        }
    }

    public archive(): void {
        this.status = "Archived";
    }
}
