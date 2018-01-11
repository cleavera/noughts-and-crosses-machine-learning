import { Static } from '../../core';
import { IPlayer } from '../../game';

export interface IPlayerType {
    label: string;
    type: Static<IPlayer>;
}
