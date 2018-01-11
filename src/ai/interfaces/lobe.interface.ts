import { LobeMemory } from '../classes/memory/lobe-memory';

export interface ILobe<T = any, U = any> {
    claim(input: any): boolean;
    activate(input: T, memory: LobeMemory, score: Promise<number>): U;
}
