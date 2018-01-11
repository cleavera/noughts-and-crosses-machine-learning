import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Static } from '../../../core';
import { IPlayer } from '../../../game';
import { IPlayerType } from '../../interfaces/player-type.interface';
import { PLAYERS } from '../../tokens/players.token';

@Component({
    selector: 'ui-player-selector',
    styleUrls: ['./player-selector.component.scss'],
    templateUrl: './player-selector.component.html'
})
export class PlayerSelectorUi {
    public playerTypes: Array<IPlayerType>;

    @Output('uiPlayerSelectorNoughts')
    public selectNoughts: EventEmitter<Static<IPlayer>> = new EventEmitter<Static<IPlayer>>();

    @Output('uiPlayerSelectorCrosses')
    public selectCrosses: EventEmitter<Static<IPlayer>> = new EventEmitter<Static<IPlayer>>();

    constructor(@Inject(PLAYERS) playerTypes: Array<IPlayerType>) {
        this.playerTypes = playerTypes;
    }

    public onSelectNoughts(index: number): void {
        console.log(index, this.playerTypes[index], this.playerTypes);
        this.selectNoughts.emit(this.playerTypes[index].type);
    }

    public onSelectCrosses(index: number): void {
        console.log(index, this.playerTypes[index], this.playerTypes);
        this.selectCrosses.emit(this.playerTypes[index].type);
    }
}
