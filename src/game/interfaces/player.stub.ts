import { createFunctionSpy } from 'alsatian';
import { GameState } from '../classes/game-state/game-state';

import { ISquare } from './square.interface';
import { IPlayer } from './player.interface';

export class PlayerStub implements IPlayer {
    public move: (state: GameState) => Promise<ISquare> = createFunctionSpy();
}
