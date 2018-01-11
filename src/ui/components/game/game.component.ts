import { Component, OnInit } from '@angular/core';
import { Static } from '../../../core';
import { Game, GameResult, IPlayer, ISquare } from '../../../game';
import { Player } from '../../services/player/player';

@Component({
    selector: 'ui-game',
    styleUrls: ['./game.component.scss'],
    templateUrl: './game.component.html'
})
export class GameUi implements OnInit {
    public currentGame: Game;

    public noughts: IPlayer;
    public crosses: IPlayer;

    public ngOnInit(): void {
        this.noughts = new Player();
        this.crosses = new Player();
        this.newGame();
    }

    public newGame(): void {
        this.currentGame = new Game(this.noughts, this.crosses);

        this.currentGame.gameOver.subscribe((result: GameResult) => {
            if (result === GameResult.NOUGHTS) {
                this.noughts.onFinish(1);
                this.crosses.onFinish(-1);
            } else if (result === GameResult.CROSSES) {
                this.noughts.onFinish(-1);
                this.crosses.onFinish(1);
            } else {
                this.noughts.onFinish(0);
                this.crosses.onFinish(0);
            }
        });
    }

    public onMove(square: ISquare): void {
        if (this.currentGame.noughts instanceof Player && this.currentGame.noughts.resolve) {
            this.move(square, this.currentGame.noughts);
        } else if (this.currentGame.crosses instanceof Player && this.currentGame.crosses.resolve) {
            this.move(square, this.currentGame.crosses);
        }
    }

    public move(square: ISquare, player: Player): void {
        player.resolve(square);

        delete player.resolve;
    }

    public onPlayerChangeNoughts(Type: Static<IPlayer>): void {
        this.noughts = new Type();
    }

    public onPlayerChangeCrosses(Type: Static<IPlayer>): void {
        this.crosses = new Type();
    }
}
