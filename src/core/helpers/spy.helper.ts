import { FunctionSpy } from 'alsatian';

export function $spy(func: Function): FunctionSpy {
    return func as any;
}
