import { IPromiseResolver, Nullable } from '../../../core';
import { GameState, IPlayer, ISquare } from '../../../game';
import { IResult } from '../../interfaces/result.interface';

import { Brain } from '../brain/brain';
import { NoughtsAndCrossesLobe } from '../noughts-and-crosses-lobe/noughts-and-crosses-lobe';

export class Bot implements IPlayer {
    private _brain: Brain;
    private _game: Array<IPromiseResolver<IResult>>;

    constructor() {
        this._brain = new Brain([
            new NoughtsAndCrossesLobe()
        ]);

        this._game = [];
    }

    public move(state: GameState): Promise<ISquare> {
        return new Promise<ISquare>((resolve: IPromiseResolver<ISquare>, reject: IPromiseResolver<string>): void => {
            const decision: Nullable<ISquare> = this._brain.decide(state, new Promise((score: IPromiseResolver<IResult>): void => {
                this._game.push(score);
            }));

            if (!decision) {
                reject('Resign');
            } else {
                resolve(decision);
            }
        });
    }

    public onFinish(result: IResult): void {
        this._game.forEach((resolve: IPromiseResolver<IResult>, index: number): void => {
            if (index === (this._game.length - 1)) {
                resolve(result);
            } else {
                resolve(0);
            }
        });

        this._game = [];
    }
}
