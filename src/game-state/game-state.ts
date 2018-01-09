export class GameState {
    public state: Array<number>;

    constructor(state: number = 0) {
        this._deserialise(state);
    }

    public serialise(): number {
        return parseInt(this.state.join(''), 3);
    }

    private _deserialise(state: number): void {
        this.state = state.toString(3).split('').map((move: string) => {
            return parseInt(move, 3);
        });
    }
}
