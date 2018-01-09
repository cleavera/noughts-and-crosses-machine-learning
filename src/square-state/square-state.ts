export class SquareState {
    public state: number;

    constructor(state: number = 0) {
        if (state > 2 || state < 0) {
            throw new Error(`Invalid square state: ${state}`);
        }

        this.state = state;
    }
}
