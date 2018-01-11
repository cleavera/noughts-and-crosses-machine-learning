export interface ILobe<T = any, U = any> {
    claim(input: any): boolean;
    activate(input: T): U;
}
