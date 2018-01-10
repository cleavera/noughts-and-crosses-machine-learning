import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SquareState } from '../../../game';

@Component({
    selector: 'ui-square',
    styleUrls: ['./square.component.scss'],
    templateUrl: './square.component.html'
})
export class SquareUi {
    @Input('uiSquareState')
    public state: SquareState;

    @Output('uiSquareMove')
    public onMove: EventEmitter<void> = new EventEmitter<void>();
}
