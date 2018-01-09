import { SquareState } from '../square-state/square-state';

export class GameState {
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
    }
}
