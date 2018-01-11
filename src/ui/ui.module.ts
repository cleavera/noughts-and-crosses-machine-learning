import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardUi } from './components/board/board.component';
import { GameUi } from './components/game/game.component';
import { PlayerSelectorUi } from './components/player-selector/player-selector.component';
import { ResultUi } from './components/result/result.component';
import { SquareUi } from './components/square/square.component';
import { players } from './constants/player-types.constant';
import { PLAYERS } from './tokens/players.token';

@NgModule({
    bootstrap: [
        GameUi
    ],
    declarations: [
        BoardUi,
        GameUi,
        PlayerSelectorUi,
        ResultUi,
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
