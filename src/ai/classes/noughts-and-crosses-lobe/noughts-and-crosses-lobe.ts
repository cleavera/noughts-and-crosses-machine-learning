import { $random, Nullable } from '../../../core';
import { GameState, ISquare } from '../../../game';

import { ILobe } from '../../interfaces/lobe.interface';
import { IResult } from '../../interfaces/result.interface';
import { LobeMemory } from '../memory/lobe-memory';

export class NoughtsAndCrossesLobe implements ILobe<GameState, Nullable<ISquare>> {
    public claim(input: any): boolean {
        return input instanceof GameState;
    }

    public activate(input: GameState, memory: LobeMemory, score: Promise<IResult>): Nullable<ISquare> {
        const state: string = input.serialise().toString();

        let availableMoves: Nullable<Array<ISquare>> = memory.remember<Array<ISquare>>(state);

        if (!availableMoves) {
            availableMoves = input.vacantSquares;
            memory.learn(state, availableMoves);
        }

        if (!availableMoves.length) {
            return null;
        }

        const moveIndex: number = $random(availableMoves.length - 1);

        score.then((result: IResult) => {
            if (!availableMoves) {
                throw new Error('Wtf?');
            }

            if (result === -1) {
                availableMoves.splice(moveIndex, 1);
                memory.learn(state, availableMoves);
            } else if (result === 1) {
                availableMoves.push(availableMoves[moveIndex]);
                memory.learn(state, availableMoves);
            }
        });

        return availableMoves[moveIndex];
    }
}
