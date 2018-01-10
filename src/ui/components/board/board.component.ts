import { Component, Input } from '@angular/core';
import { GameState } from '../../../game';

@Component({
    selector: 'ui-board',
    styleUrls: ['./board.component.scss'],
    templateUrl: './board.component.html'
})
export class BoardUi {
    @Input('uiBoardState')
    public state: GameState;
}
