import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameUi } from './components/game/game.component';

@NgModule({
    bootstrap: [
        GameUi
    ],
    declarations: [
        GameUi
    ],
    imports: [
        BrowserModule
    ]
})
export class UiModule {}
