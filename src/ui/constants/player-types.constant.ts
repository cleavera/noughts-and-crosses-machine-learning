import { IPlayerType } from '../interfaces/player-type.interface';
import { Player } from '../services/player/player';

export const players: Array<IPlayerType> = [
    {
        label: 'Co-located human',
        type: Player
    }
];
