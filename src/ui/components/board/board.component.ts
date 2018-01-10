import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameState, ISquare } from '../../../game';

@Component({
    selector: 'ui-board',
    styleUrls: ['./board.component.scss'],
    templateUrl: './board.component.html'
})
export class BoardUi {
    @Input('uiBoardState')
    public state: GameState;

    @Output('uiBoardMove')
    public onMove: EventEmitter<ISquare> = new EventEmitter<ISquare>();
}
