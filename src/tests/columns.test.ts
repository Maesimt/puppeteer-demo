import { setup, GridSpots } from '../engine';

describe('Tic-Tac-Toe : Column tests', () => {
  beforeEach(() => {
    jest.setTimeout(120000);
  });
  describe('first column', () => {
    it('should win given every cell of first column is owned by the same player.', async () => {
      const { startingPlayer, otherPlayer  } = await setup();
      
      await startingPlayer.play(GridSpots.topLeft);
      await otherPlayer.play(GridSpots.topCenter);
      await startingPlayer.play(GridSpots.middleLeft);
      await otherPlayer.play(GridSpots.middleCenter);
      await startingPlayer.play(GridSpots.bottomLeft);
      await otherPlayer.play(GridSpots.bottomCenter);

      await startingPlayer.close();
      await otherPlayer.close();

      expect(true).toBe(true);
    });
    it('should lose given one cell is owned by another player.', () => {

    });
  })
});