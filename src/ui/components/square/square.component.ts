import { Component, Input } from '@angular/core';

import { SquareState } from '../../../game';

@Component({
    selector: 'ui-square',
    styleUrls: ['./square.component.scss'],
    templateUrl: './square.component.html'
})
export class SquareUi {
    @Input()
    public state: SquareState;
}
