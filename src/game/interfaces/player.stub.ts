import { createFunctionSpy } from 'alsatian';
import { GameState } from '../classes/game-state/game-state';

import { IPlayer } from './player.interface';
import { ISquare } from './square.interface';

export class PlayerStub implements IPlayer {
    public move: (state: GameState) => Promise<ISquare> = createFunctionSpy();
}
