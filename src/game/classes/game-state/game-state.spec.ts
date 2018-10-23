import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';
import { PlayerNumber } from '../../constants/player-number.constant';
import { ISquareState } from '../../interfaces/square-state.interface';
import { ISquare } from '../../interfaces/square.interface';
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

    @Test('should throw an error for invalid states')
    @TestCase(1E6)
    @TestCase(19683)
    public invalidStates(state: number): void {
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

@TestFixture('GameState.get')
export class GameStateGetSpec {
    private _gameState: GameState;

    @Setup
    public construct(): void {
        this._gameState = new GameState(11883);
    }

    @Test('should get correctly')
    @TestCase(0, 1)
    @TestCase(1, 2)
    @TestCase(2, 1)
    @TestCase(3, 0)
    @TestCase(4, 2)
    @TestCase(5, 2)
    @TestCase(6, 0)
    @TestCase(7, 1)
    @TestCase(8, 0)
    public get(square: ISquare, state: ISquareState): void {
        Expect(this._gameState.get(square).state).toEqual(state);
    }
}

@TestFixture('GameState.set')
export class GameStateSetSpec {
    private _gameState: GameState;

    @Setup
    public construct(): void {
        this._gameState = new GameState(11883);
    }

    @Test('should set correctly')
    @TestCase(3, 1)
    @TestCase(6, 2)
    public get(square: ISquare, state: PlayerNumber): void {
        this._gameState.set(square, state);

        Expect(this._gameState.get(square).state).toEqual(state);
    }
}

@TestFixture('GameState.vacantSquares')
export class GameStateVacantSquaresSpec {
    private _gameState: GameState;

    @Setup
    public construct(): void {
        this._gameState = new GameState(11883);
    }

    @Test('should return the vacant squares')
    @TestCase([3, 6, 8])
    public get(squares: ISquare): void {
        Expect(this._gameState.vacantSquares).toEqual(squares);
    }
}
