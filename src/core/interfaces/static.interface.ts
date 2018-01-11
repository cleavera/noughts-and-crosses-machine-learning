export interface Static<T> {
    new(...args: Array<any>): T; // tslint:disable-line no-any
}
