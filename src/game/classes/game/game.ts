import { BehaviorSubject } from 'rxjs';
import { SquareState } from '../../';
import { Nullable } from '../../../core';

import { GameResult } from '../../constants/game-result.constant';
import { PlayerNumber } from '../../constants/player-number.constant';
import { IPlayer } from '../../interfaces/player.interface';
import { ISquare } from '../../interfaces/square.interface';
import { GameState } from '../game-state/game-state';

export class Game {
    public state: GameState;
    public noughts: IPlayer;
    public crosses: IPlayer;
    public result: GameResult;

    public gameOver: BehaviorSubject<Nullable<GameResult>>;

    constructor(noughts: IPlayer, crosses: IPlayer, state: GameState = new GameState()) {
        this.gameOver = new BehaviorSubject<Nullable<GameResult>>(null);
        this.state = state;
        this.noughts = noughts;
        this.crosses = crosses;

        this._moveCrosses().catch((e: Error) => {
            console.error(e); // tslint:disable-line no-console
        });

        this.gameOver.subscribe((result: GameResult) => {
            this.result = result;
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
        let move: ISquare;

        try {
            move = await player.move(this.state);
        } catch (e) {
            if (playerNumber === PlayerNumber.CROSSES) {
                this.gameOver.next(GameResult.NOUGHTS);
            } else {
                this.gameOver.next(GameResult.CROSSES);
            }

            this.gameOver.complete();

            return Promise.reject('Game over');
        }

        if (!this._isValid(move)) {
            return this._move(player, playerNumber);
        }

        this.state.set(move, playerNumber);

        if (this._checkGameOver()) {
            this.gameOver.complete();

            return Promise.reject('Game over');
        }
    }

    private _isValid(move: ISquare): boolean {
        return this.state.get(move).isVacant;
    }

    private _checkGameOver(): boolean {
        if (this._checkVictory(PlayerNumber.NOUGHTS)) {
            this.gameOver.next(GameResult.NOUGHTS);

            return true;
        }

        if (this._checkVictory(PlayerNumber.CROSSES)) {
            this.gameOver.next(GameResult.CROSSES);

            return true;
        }

        if (!this.state.vacantSquares.length) {
            this.gameOver.next(GameResult.DRAW);

            return true;
        }

        return false;
    }

    private _checkVictory(player: PlayerNumber): boolean {
        const results: Array<number> = [];

        // tslint:disable-next-line cyclomatic-complexity
        this.state.state.forEach((squareState: SquareState, index: number): void => {
            const isPlayer: boolean = squareState.state === player;

            if (!isPlayer) {
                return;
            }

            /*
            0 0 0  1 x x  2 x x  x 3 x  x x 4  x x 5  x x x  x x x
            x x x  x 1 x  2 x x  x 3 x  x x 4  x 5 x  6 6 6  x x x
            x x x  x x 1  2 x x  x 3 x  x x 4  5 x x  x x x  7 7 7
             */

            if (index === 0) {
                results[0] = (results[0] || 0) + 1;
                results[1] = (results[1] || 0) + 1;
                results[2] = (results[2] || 0) + 1;
            } else if (index === 1) {
                results[0] = (results[0] || 0) + 1;
                results[3] = (results[3] || 0) + 1;
            } else if (index === 2) {
                results[0] = (results[0] || 0) + 1;
                results[4] = (results[4] || 0) + 1;
                results[5] = (results[5] || 0) + 1;
            } else if (index === 3) {
                results[2] = (results[2] || 0) + 1;
                results[6] = (results[6] || 0) + 1;
            } else if (index === 4) {
                results[1] = (results[1] || 0) + 1;
                results[3] = (results[3] || 0) + 1;
                results[5] = (results[5] || 0) + 1;
                results[6] = (results[6] || 0) + 1;
            } else if (index === 5) {
                results[4] = (results[4] || 0) + 1;
                results[6] = (results[6] || 0) + 1;
            } else if (index === 6) {
                results[2] = (results[2] || 0) + 1;
                results[5] = (results[5] || 0) + 1;
                results[7] = (results[7] || 0) + 1;
            } else if (index === 6) {
                results[2] = (results[2] || 0) + 1;
                results[5] = (results[5] || 0) + 1;
                results[7] = (results[7] || 0) + 1;
            } else if (index === 7) {
                results[3] = (results[3] || 0) + 1;
                results[7] = (results[7] || 0) + 1;
            } else if (index === 8) {
                results[1] = (results[1] || 0) + 1;
                results[4] = (results[4] || 0) + 1;
                results[7] = (results[7] || 0) + 1;
            }
        });

        return results.indexOf(3) > -1;
    }
}
