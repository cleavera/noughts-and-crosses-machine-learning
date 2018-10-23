export interface Static<T> { // tslint:disable-line interface-name
    new(...args: Array<any>): T;
}
