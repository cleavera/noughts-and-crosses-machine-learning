import { PlayerNumber } from '../../constants/player-number.constant';
import { ISquare } from '../../interfaces/square.interface';
import { ISquareState } from '../../interfaces/square-state.interface';
import { SquareState } from '../square-state/square-state';

export class GameState {
    private static readonly GRID_SIZE: number = 9;

    public readonly state: Array<SquareState>;

    constructor(state: number = 0) {
        this.state = this._deserialise(state);
    }

    public get(move: ISquare): SquareState {
        return this.state[move];
    }

    public set(square: ISquare, playerNumber: PlayerNumber): void {
        this.state[square].set(playerNumber);
    }

    public get vacantSquares(): Array<ISquare> {
        return this.state.reduce((acc: Array<ISquare>, state: SquareState, index: number) => {
            if (state.isVacant) {
                acc.push(index as ISquare);
            }

            return acc;
        }, []);
    }

    public serialise(): number {
        return parseInt(this.state.reduce((acc: string, state: SquareState) => {
            return acc + state.state.toString(3);
        }, ''), 3);
    }

    private _deserialise(state: number): Array<SquareState> {
        const gameState: Array<SquareState> = state.toString(3).split('').map((move: string) => {
            return new SquareState(parseInt(move, 3) as ISquareState);
        });

        for (let x: number = gameState.length; x < GameState.GRID_SIZE; x++) {
            gameState.unshift(new SquareState());
        }

        if (GameState.GRID_SIZE < gameState.length) {
            throw new Error(`Invalid game state: "${state}", grid area to big: "${gameState.length}" should be ${GameState.GRID_SIZE}`);
        }

        return gameState;
    }
}
