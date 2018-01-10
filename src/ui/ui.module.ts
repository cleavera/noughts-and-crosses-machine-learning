import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardUi } from './components/board/board.component';
import { GameUi } from './components/game/game.component';
import { ResultUi } from './components/result/result.component';
import { SquareUi } from './components/square/square.component';

@NgModule({
    bootstrap: [
        GameUi
    ],
    declarations: [
        BoardUi,
        GameUi,
        ResultUi,
        SquareUi
    ],
    imports: [
        BrowserModule
    ]
})
export class UiModule {}
