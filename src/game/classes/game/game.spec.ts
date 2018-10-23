import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';
import { $spy } from '../../../core/index';
import { IPlayer } from '../../interfaces/player.interface';
import { PlayerStub } from '../../interfaces/player.stub';
import { ISquare } from '../../interfaces/square.interface';
import { GameState } from '../game-state/game-state';
import { Game } from './game';

@TestFixture('Game.constructor')
export class GameConstructorSpec {
    private _noughts: IPlayer;
    private _crosses: IPlayer;
    private _promises: Map<Function, { resolve: Function, reject: Function }>;

    @Setup
    public stubs(): void {
        this._promises = new Map();

        this._crosses = new PlayerStub();
        this._noughts = new PlayerStub();

        $spy(this._crosses.move).andReturn(new Promise((resolve: (square: ISquare) => void, reject: () => void): void => {
            this._promises.set(this._crosses.move, {
                resolve,
                reject
            });
        }));

        $spy(this._noughts.move).andReturn(new Promise((resolve: (square: ISquare) => void, reject: () => void): void => {
            this._promises.set(this._noughts.move, {
                resolve,
                reject
            });
        }));
    }

    @Test('should construct correctly')
    @TestCase(new GameState(12), new GameState(12))
    @TestCase(void 0, new GameState())
    @TestCase(new GameState(), new GameState())
    public construct(state: GameState, resultState: GameState): void {
        Expect(new Game(this._crosses, this._noughts, state).state).toEqual(resultState);
    }
}

@TestFixture('Game.move')
export class GameMoveSpec {
    private _game: Game;
    private _noughts: IPlayer;
    private _crosses: IPlayer;
    private _promises: Map<Function, { resolve: Function, reject: Function }>;

    @Setup
    public construct(): void {
        this._promises = new Map();

        this._crosses = new PlayerStub();
        this._noughts = new PlayerStub();

        $spy(this._crosses.move).andReturn(new Promise((resolve: (square: ISquare) => void, reject: () => void): void => {
            this._promises.set(this._crosses.move, {
                resolve,
                reject
            });
        }));

        $spy(this._noughts.move).andReturn(new Promise((resolve: (square: ISquare) => void, reject: () => void): void => {
            this._promises.set(this._noughts.move, {
                resolve,
                reject
            });
        }));

        this._game = new Game(this._noughts, this._crosses);
    }

    @Test('should tell crosses to make a move')
    public start(): void {
        Expect(this._noughts.move).not.toHaveBeenCalled();
        Expect(this._crosses.move).toHaveBeenCalledWith(this._game.state);
    }
}
