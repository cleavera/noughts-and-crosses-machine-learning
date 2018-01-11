import { $random, Nullable } from '../../../core';
import { GameState, ISquare } from '../../../game';

import { ILobe } from '../../interfaces/lobe.interface';
import { LobeMemory } from '../memory/lobe-memory';

export class NoughtsAndCrossesLobe implements ILobe<GameState, ISquare> {
    public claim(input: any): boolean {
        return input instanceof GameState;
    }

    public activate(input: GameState, memory: LobeMemory): ISquare {
        let availableMoves: Nullable<Array<ISquare>> = memory.remember<Array<ISquare>>(input.serialise().toString());

        if (!availableMoves) {
            availableMoves = input.vacantSquares;
        }

        return availableMoves[$random(availableMoves.length - 1)];
    }
}
