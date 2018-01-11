import { InjectionToken } from '@angular/core';
import { IPlayerType } from '../interfaces/player-type.interface';

export const PLAYERS: InjectionToken<Array<IPlayerType>> = new InjectionToken<Array<IPlayerType>>('players');
