import { IPromiseResolver } from '../../../core';
import { IPlayer, ISquare } from '../../../game';

export class Player implements IPlayer {
    public resolve: IPromiseResolver<ISquare>;

    public async move(): Promise<ISquare> {
        return new Promise<ISquare>((resolve: IPromiseResolver<ISquare>): void => {
            this.resolve = resolve;
        });
    }

    public onFinish(): void {} // tslint:disable-line no-empty
}
