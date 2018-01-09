import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { GameState } from '../game-state/game-state';
import { Game } from './game';

@TestFixture('Game.constructor')
export class GameConstructorSpec {
    @Test('should construct correctly')
    @TestCase(new GameState(12), new GameState(12))
    @TestCase(void 0, new GameState())
    @TestCase(new GameState(), new GameState())
    public construct(state: GameState, resultState: GameState): void {
        Expect(new Game(state).state).toEqual(resultState);
    }
}
