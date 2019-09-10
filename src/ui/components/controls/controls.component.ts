import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Static } from '../../../core';
import { Game, GameResult, IPlayer } from '../../../game';

@Component({
    selector: 'ui-controls',
    styleUrls: ['./controls.component.scss'],
    templateUrl: './controls.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsUi {
    public isAutoPlay: boolean;

    @Input('uiControlsGame')
    public set game(game: Game) {
        console.log('New game');
        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        this._subscription = game.gameOver.subscribe((gameResult: GameResult | null) => {
            console.log('Controls', gameResult);
            if (gameResult !== null && this.isAutoPlay) {
                window.setTimeout(() => {
                    this.onNewGame();
                }, 1);
            }
        });
    }

    @Output('uiControlsNewGame')
    public newGame: EventEmitter<void> = new EventEmitter<void>();

    @Output('uiControlsPlayerSelectNoughts')
    public playerChangeNoughts: EventEmitter<Static<IPlayer>> = new EventEmitter<Static<IPlayer>>();

    @Output('uiControlsPlayerSelectCrosses')
    public playerChangeCrosses: EventEmitter<Static<IPlayer>> = new EventEmitter<Static<IPlayer>>();

    private _subscription: Subscription;

    public onAutoPlayChange(value: boolean): void {
        this.isAutoPlay = value;
    }

    public onNewGame(): void {
        this.newGame.emit();
    }

    public onPlayerChangeNoughts(playerType: Static<IPlayer>): void {
        this.playerChangeNoughts.emit(playerType);
    }

    public onPlayerChangeCrosses(playerType: Static<IPlayer>): void {
        this.playerChangeCrosses.emit(playerType);
    }
}
