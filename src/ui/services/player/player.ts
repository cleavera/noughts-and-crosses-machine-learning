import { IPlayer, ISquare } from '../../../game';

export class Player implements IPlayer {
    public resolve: (square: ISquare) => void;

    public async move(): Promise<ISquare> {
        return new Promise<ISquare>((resolve: (square: ISquare) => void) => {
            this.resolve = resolve;
        });
    }
}
