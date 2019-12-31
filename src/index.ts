import { GridSpots } from './engine/grid';
import Player from './engine/player';
import Elements from './engine/elements';

const run = async () => {

  const Player1 = new Player('Joueur 1');
  await Player1.setup();
  await Player1.click(Elements.usernameField);
  await Player1.type(Player1.name);
  await Player1.click(Elements.playWithFriendButton);
  await Player1.waitForNavigation();
  const publicUrl = await Player1.getTextFromInput(Elements.publicUrlInput);

  const Player2 = new Player('Joueur 2');
  await Player2.setup();
  await Player2.navigatesTo(publicUrl);
  await Player2.click(Elements.usernameField);
  await Player2.type(Player2.name);
  await Player2.click(Elements.invitationPlayButton);

  // Wait for active turn indicator to be visible.
  await Player1.waitForAtLeastOne(Elements.turnTriangle);

  // Determine who is first. who has a triangle on his plate.
  let startingPlayer;
  let otherPlayer;

  const isPlayer1TriangleVisible = await Player1.isVisible(Elements.playerOnesTurnTriangle)

  if (isPlayer1TriangleVisible) {
    startingPlayer = Player1;
    otherPlayer = Player2;
  } else {
    startingPlayer = Player2;
    otherPlayer = Player1;
  }

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
  
};

run();

