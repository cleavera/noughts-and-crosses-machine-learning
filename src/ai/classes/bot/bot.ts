import { IPromiseResolver } from '../../../core';
import { GameState, IPlayer, ISquare } from '../../../game';

import { Brain } from '../brain/brain';
import { NoughtsAndCrossesLobe } from '../noughts-and-crosses-lobe/noughts-and-crosses-lobe';

export class Bot implements IPlayer {
    private _brain: Brain;

    constructor() {
        this._brain = new Brain([
            new NoughtsAndCrossesLobe()
        ]);
    }

    public move(state: GameState): Promise<ISquare> {
        return new Promise<ISquare>((resolve: IPromiseResolver<ISquare>): void => {
            resolve(this._brain.decide(state));
        });
    }
}
