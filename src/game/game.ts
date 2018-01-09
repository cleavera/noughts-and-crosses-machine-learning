import { GameState } from '../game-state/game-state';

export class Game {
    public state: GameState;

    constructor(state: GameState = new GameState()) {
        this.state = state;
    }
}
