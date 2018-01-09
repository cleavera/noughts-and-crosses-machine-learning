import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { SquareState } from '../square-state/square-state';
import { GameState } from './game-state';

@TestFixture('GameState.constructor')
export class GameStateConstructorSpec {
    @Test('should construct correctly')
    @TestCase(void 0, [0, 0, 0, 0, 0, 0, 0, 0, 0])
    @TestCase(11883, [1, 2, 1, 0, 2, 2, 0, 1, 0])
    @TestCase(1, [0, 0, 0, 0, 0, 0, 0, 0, 1])
    public construct(state: number, results: Array<number>): void {
        Expect(new GameState(state).state.map((squareState: SquareState) => {
            return squareState.state;
        })).toEqual(results);
    }
}

@TestFixture('GameState.constructor.invalidState')
export class GameStateConstructorInvalidStateSpec {
    @Test('should throw an error for invalid states')
    @TestCase(1E6)
    @TestCase(19683)
    public construct(state: number): void {
        Expect(() => new GameState(state)).toThrow();
    }
}


@TestFixture('GameState.serialise')
export class GameStateSerialiseSpec {
    @Test('should serialise correctly')
    @TestCase(11883)
    @TestCase(806)
    @TestCase(1)
    public construct(state: number): void {
        Expect(new GameState(state).serialise()).toEqual(state);
    }
}
