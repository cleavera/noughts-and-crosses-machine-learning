import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { SquareState } from './square-state';

@TestFixture('SquareState.constructor')
export class SquareStateConstructorSpec {
    @Test('should construct correctly')
    @TestCase(void 0, 0)
    @TestCase(2, 2)
    @TestCase(1, 1)
    @TestCase(0, 0)
    public construct(state: number, results: Array<number>): void {
        Expect(new SquareState(state).state).toEqual(results);
    }
}

@TestFixture('SquareState.constructor.invalidState')
export class SquareStateConstructorInvalidStateSpec {
    @Test('should throw an error for invalid states')
    @TestCase(3)
    @TestCase(-1)
    public construct(state: number): void {
        Expect(() => new SquareState(state).state).toThrow();
    }
}
