import { SquareState } from '../square-state/square-state';

export class GameState {
    private static readonly GRID_SIZE: number = 9;

    public state: Array<SquareState>;

    constructor(state: number = 0) {
        this._deserialise(state);
    }

    public serialise(): number {
        return parseInt(this.state.reduce((acc: string, state: SquareState) => {
            return acc + state.state.toString(3);
        }, ''), 3);
    }

    private _deserialise(state: number): void {
        this.state = state.toString(3).split('').map((move: string) => {
            return new SquareState(parseInt(move, 3));
        });

        for (let x: number = this.state.length; x < GameState.GRID_SIZE; x++) {
            this.state.unshift(new SquareState());
        }

        if (GameState.GRID_SIZE < this.state.length) {
            throw new Error(`Invalid game state: "${state}", grid area to big: "${this.state.length}" should be ${GameState.GRID_SIZE}`);
        }
    }
}
