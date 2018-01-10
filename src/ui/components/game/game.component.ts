import { Component, OnInit } from '@angular/core';
import { Game } from '../../../game';
import { Player } from '../../services/player/player';

@Component({
    selector: 'ui-game',
    styleUrls: ['./game.component.scss'],
    templateUrl: './game.component.html'
})
export class GameUi implements OnInit {
    public currentGame: Game;

    public ngOnInit(): void {
        this.newGame();
    }

    public newGame(): void {
        this.currentGame = new Game(new Player(), new Player());
    }
}
