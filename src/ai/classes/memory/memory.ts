import { IDict } from '../../../core';

export class Memory {
    private _store: IDict<IDict<any>>;

    constructor(memories: string = '{}') {
        this._store = JSON.parse(memories);
    }

    public learn(lobe: string, key: string, value: any): void {
        this._getLobeMemories(lobe)[key] = value;
    }

    public remember<T = any>(lobe: string, key: string): T {
        return this._getLobeMemories(lobe)[key];
    }

    public serialise(): string {
        return JSON.stringify(this._store);
    }

    private _getLobeMemories(lobe: string): IDict<any> {
        if (!this._store[lobe]) {
            this._store[lobe] = {};
        }

        return this._store[lobe];
    }
}
