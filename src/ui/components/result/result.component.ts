import { Component, Input } from '@angular/core';
import { GameResult } from '../../../game';

@Component({
    selector: 'ui-result',
    styleUrls: ['./result.component.scss'],
    templateUrl: './result.component.html'
})
export class ResultUi {
    @Input('uiResult')
    public result: GameResult;

    public get isDraw(): boolean {
        return this.result === GameResult.DRAW;
    }

    public get isNoughts(): boolean {
        return this.result === GameResult.NOUGHTS;
    }

    public get isCrosses(): boolean {
        return this.result === GameResult.CROSSES;
    }
}
