import { Nullable } from '../../../core';
import { ILobe } from '../../interfaces/lobe.interface';

export class Brain {
    private _lobes: Array<ILobe>;

    constructor(lobes: Array<ILobe> = []) {
        this._lobes = lobes;
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

        return requiredLobe.activate(input);
    }
}
