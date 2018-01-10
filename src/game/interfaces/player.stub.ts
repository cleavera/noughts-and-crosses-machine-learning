import { createFunctionSpy } from 'alsatian';
import { GameState } from '../../game-state/game-state';

import { ISquare } from './move.interface';
import { IPlayer } from './player.interface';

export class PlayerStub implements IPlayer {
    public move: (state: GameState) => Promise<ISquare> = createFunctionSpy();
}
