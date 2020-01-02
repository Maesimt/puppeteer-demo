import { setup, GridSpots } from '../engine';

describe('Tic-Tac-Toe tests', () => {
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

      const startingPlayerScore = await startingPlayer.getScore();
      const otherPlayerScore = await otherPlayer.getScore();

      await startingPlayer.close();
      await otherPlayer.close();

      expect(startingPlayerScore).toBe(1);
      expect(otherPlayerScore).toBe(0);
    });
  })
});