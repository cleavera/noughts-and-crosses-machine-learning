import { EventEmitter } from '@angular/core';

import { GameResult } from '../../constants/game-result.constant';
import { PlayerNumber } from '../../constants/player-number.constant';
import { IPlayer } from '../../interfaces/player.interface';
import { ISquare } from '../../interfaces/square.interface';
import { GameState } from '../game-state/game-state';

export class Game {
    public state: GameState;
    public noughts: IPlayer;
    public crosses: IPlayer;

    public gameOver: EventEmitter<GameResult> = new EventEmitter<GameResult>();

    constructor(noughts: IPlayer, crosses: IPlayer, state: GameState = new GameState()) {
        this.state = state;
        this.noughts = noughts;
        this.crosses = crosses;

        this._moveNoughts().catch((e: string) => {
            console.log(e); // tslint:disable-line no-console
        });
    }

    private async _moveNoughts(): Promise<void> {
        await this._move(this.noughts, PlayerNumber.NOUGHTS);

        await this._moveCrosses();
    }

    private async _moveCrosses(): Promise<void> {
        await this._move(this.crosses, PlayerNumber.CROSSES);

        await this._moveNoughts();
    }

    private async _move(player: IPlayer, playerNumber: PlayerNumber): Promise<void> {
        const move: ISquare = await player.move(this.state);

        if (!this._isValid(move)) {
            return this._move(player, playerNumber);
        }

        this.state.set(move, playerNumber);

        if (!this.state.vacantSquares.length) {
            this.gameOver.emit(GameResult.DRAW);

            return Promise.reject('Game over');
        }
    }

    private _isValid(move: ISquare): boolean {
        return this.state.get(move).isVacant;
    }
}
