import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-scoreboard',
    styleUrls: ['./scoreboard.component.scss'],
    templateUrl: './scoreboard.component.html'
})
export class ScoreboardUi {
    @Input('uiScoreboardGames')
    public games: number;

    @Input('uiScoreboardNoughts')
    public noughts: number;

    @Input('uiScoreboardCrosses')
    public crosses: number;

    @Input('uiScoreboardDraws')
    public draws: number;
}
