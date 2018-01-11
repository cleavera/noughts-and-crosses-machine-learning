export interface IPromiseResolver<T> {
    (value: T): void;
}
