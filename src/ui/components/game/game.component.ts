import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    public isAutoPlay: boolean;
    public gameCount: number;
    public winsNoughts: number;
    public winsCrosses: number;
    public draws: number;

    private _subscription: Subscription;

    public ngOnInit(): void {
        this.gameCount = 0;
        this._resetScores();
        this.noughts = new Player();
        this.crosses = new Player();
        this.newGame();
    }

    public newGame(): void {
        this.gameCount++;

        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        this.currentGame = new Game(this.noughts, this.crosses);

        this._subscription = this.currentGame.gameOver.subscribe((result: GameResult) => {
            console.log('Game', result);
            if (result === GameResult.NOUGHTS) {
                this.winsNoughts++;
                this.noughts.onFinish(1);
                this.crosses.onFinish(-1);
            } else if (result === GameResult.CROSSES) {
                this.winsCrosses++;
                this.noughts.onFinish(-1);
                this.crosses.onFinish(1);
            } else if (result === GameResult.DRAW) {
                this.draws++;
                this.noughts.onFinish(0);
                this.crosses.onFinish(0);
            }
        });
    }

    public onNewGame(): void {
        this.newGame();
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
        this._resetScores();
    }

    public onPlayerChangeCrosses(Type: Static<IPlayer>): void {
        this.crosses = new Type();
        this._resetScores();
    }

    private _resetScores(): void {
        this.winsCrosses = 0;
        this.winsNoughts = 0;
        this.draws = 0;
    }
}
