import { GridSpots } from './engine/grid';
import Elements from './engine/elements';
import setup from './engine/setup';

const run = async () => {

  const { startingPlayer, otherPlayer } = await setup();

  // Start playing !!!
  await startingPlayer.play(GridSpots.topLeft);
  await otherPlayer.play(GridSpots.topCenter);
  await startingPlayer.play(GridSpots.topRight);
  await otherPlayer.play(GridSpots.middleLeft);
  await startingPlayer.play(GridSpots.middleCenter);
  await otherPlayer.play(GridSpots.middleRight);
  await startingPlayer.play(GridSpots.bottomCenter);
  await otherPlayer.play(GridSpots.bottomLeft);
  await startingPlayer.play(GridSpots.bottomRight);
  
  //Check the score.
  const player1Score = await startingPlayer.getTextFromDiv(Elements.playerOneScore);
  const player2Score = await startingPlayer.getTextFromDiv(Elements.playerTwoScore);

  console.log(`Player 1 - score : ${player1Score}`);
  console.log(`Player 2 - score : ${player2Score}`);
  
  // Start another game.
  await startingPlayer.click(Elements.playAgainButton);
  await otherPlayer.click(Elements.playAgainButton);
};

run();

