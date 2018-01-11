import { Nullable } from '../../../core';
import { Memory } from './memory';

export class LobeMemory {
    private _lobe: string;
    private _memory: Memory;

    constructor(lobe: string, memory: Memory) {
        this._memory = memory;
        this._lobe = lobe;
    }

    public learn(key: string, value: any): void {
        this._memory.learn(this._lobe, key, value);
    }

    public remember<T = any>(key: string): Nullable<T> {
        return this._memory.remember<T>(this._lobe, key);
    }
}