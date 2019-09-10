import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardUi } from './components/board/board.component';
import { ControlsUi } from './components/controls/controls.component';
import { GameUi } from './components/game/game.component';
import { PlayerSelectorUi } from './components/player-selector/player-selector.component';
import { ResultUi } from './components/result/result.component';
import { ScoreboardUi } from './components/scoreboard/scoreboard.component';
import { SquareUi } from './components/square/square.component';
import { players } from './constants/player-types.constant';
import { PLAYERS } from './tokens/players.token';

@NgModule({
    bootstrap: [
        GameUi
    ],
    declarations: [
        BoardUi,
        ControlsUi,
        GameUi,
        PlayerSelectorUi,
        ResultUi,
        ScoreboardUi,
        SquareUi
    ],
    providers: [
        {
            provide: PLAYERS,
            useValue: players
        }
    ],
    imports: [
        BrowserModule
    ]
})
export class UiModule {}
