import type { Frontier } from "../core/frontier";

interface QueueItem<T> {
    item: T;
    priority: number;
}

export class PriorityQueueFrontier<T> implements Frontier<T> {
    private items: QueueItem<T>[] = [];

    add(item: T, priority: number = 0): void {
        this.items.push({ item, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    remove(): T | undefined {
        const queueItem = this.items.shift();
        return queueItem ? queueItem.item : undefined;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}