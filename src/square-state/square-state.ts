import { ISquareState } from './interfaces/square-state.interface';

export class SquareState {
    public state: ISquareState;

    constructor(state: ISquareState = 0) {
        this.set(state);
    }

    public get isVacant(): boolean {
        return this.state === 0;
    }

    public set(state: ISquareState): void {
        if (state > 2 || state < 0) {
            throw new Error(`Invalid square state: ${state}`);
        }

        this.state = state;
    }
}
