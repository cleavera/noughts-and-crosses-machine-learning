import { Nullable } from '../../../core';
import { ILobe } from '../../interfaces/lobe.interface';
import { LobeMemory } from '../memory/lobe-memory';
import { Memory } from '../memory/memory';

export class Brain {
    private _lobes: Array<ILobe>;
    private _memory: Memory;

    constructor(lobes: Array<ILobe> = [], memory: Memory = new Memory()) {
        this._lobes = lobes;
        this._memory = memory;
    }

    public learnSkill(lobe: ILobe): void {
        this._lobes.push(lobe);
    }

    public decide(input: any): any {
        const requiredLobe: Nullable<ILobe> = this._lobes.find((lobe: ILobe) => {
            return lobe.claim(input);
        });

        if (!requiredLobe) {
            throw new Error('I do not possess this skill');
        }

        return requiredLobe.activate(input, new LobeMemory(requiredLobe.constructor.name, this._memory));
    }
}
