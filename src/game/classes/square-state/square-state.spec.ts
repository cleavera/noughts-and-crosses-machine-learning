import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { ISquareState } from '../../interfaces/square-state.interface';
import { SquareState } from './square-state';

@TestFixture('SquareState.constructor')
export class SquareStateConstructorSpec {
    @Test('should construct correctly')
    @TestCase(void 0, 0)
    @TestCase(2, 2)
    @TestCase(1, 1)
    @TestCase(0, 0)
    public construct(state: ISquareState, results: ISquareState): void {
        Expect(new SquareState(state).state).toEqual(results);
    }

    @Test('should throw an error for invalid states')
    @TestCase(3)
    @TestCase(-1)
    public invalidState(state: ISquareState): void {
        Expect(() => new SquareState(state as ISquareState)).toThrow();
    }
}

@TestFixture('SquareState.set')
export class SquareStateSetSpec {
    @Test('should set correctly')
    @TestCase(2, 2)
    @TestCase(1, 1)
    @TestCase(0, 0)
    public set(state: ISquareState): void {
        const squareState: SquareState = new SquareState();
        squareState.set(state);

        Expect(squareState.state).toEqual(state);
    }

    @Test('should throw an error for invalid states')
    @TestCase(3)
    @TestCase(-1)
    public invalidState(state: ISquareState): void {
        const squareState: SquareState = new SquareState();

        Expect(() => squareState.set(state)).toThrow();
    }
}

@TestFixture('SquareState.isVacant')
export class SquareStateIsVacantSpec {
    @Test('should return correctly')
    @TestCase(2, false)
    @TestCase(1, false)
    @TestCase(0, true)
    public isVacant(state: ISquareState, result: boolean): void {
        const squareState: SquareState = new SquareState(state);

        Expect(squareState.isVacant).toEqual(result);
    }
}
