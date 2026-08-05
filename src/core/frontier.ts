export interface Frontier<T> {

    add(item: T): void;

    remove(): T | undefined;

    isEmpty(): boolean;
}