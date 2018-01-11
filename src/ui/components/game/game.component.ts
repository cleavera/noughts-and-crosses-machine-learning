import { Component, OnInit } from '@angular/core';
import { Game, ISquare } from '../../../game';
import { Player } from '../../services/player/player';

@Component({
    selector: 'ui-game',
    styleUrls: ['./game.component.scss'],
    templateUrl: './game.component.html'
})
export class GameUi implements OnInit {
    public currentGame: Game;

    public noughts: Player;
    public crosses: Player;

    public ngOnInit(): void {
        this.noughts = new Player();
        this.crosses = new Player();
        this.newGame();
    }

    public newGame(): void {
        this.currentGame = new Game(this.noughts, this.crosses);
    }

    public onMove(square: ISquare): void {
        if ('resolve' in this.currentGame.noughts) {
            this.move(square, this.currentGame.noughts as Player);
        } else if ('resolve' in this.currentGame.crosses) {
            this.move(square, this.currentGame.crosses as Player);
        }
    }

    public move(square: ISquare, player: Player): void {
        player.resolve(square);

        delete player.resolve;
    }
}
