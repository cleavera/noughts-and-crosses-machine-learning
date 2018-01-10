import { GameState } from '../../game-state/game-state';
import { ISquare } from './move.interface';

export interface IPlayer {
    move(state: GameState): Promise<ISquare>;
}
