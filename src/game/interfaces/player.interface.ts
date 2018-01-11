import { GameState } from '../classes/game-state/game-state';
import { ISquare } from './square.interface';

export interface IPlayer {
    move(state: GameState): Promise<ISquare>;
    onFinish(result: -1 | 0 | 1): void;
}
