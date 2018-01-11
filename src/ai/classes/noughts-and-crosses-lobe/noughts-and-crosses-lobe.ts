import { $random } from '../../../core';
import { GameState, ISquare } from '../../../game';

import { ILobe } from '../../interfaces/lobe.interface';

export class NoughtsAndCrossesLobe implements ILobe<GameState, ISquare> {
    public claim(input: any): boolean {
        return input instanceof GameState;
    }

    public activate(input: GameState): ISquare {
        const options: Array<ISquare> = input.vacantSquares;

        return options[$random(options.length - 1)];
    }
}
