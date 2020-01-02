import Player from './player';
import Elements from './elements';

interface TurnOrderedPlayers {
  startingPlayer: Player,
  otherPlayer: Player,
}

const setup = async (): Promise<TurnOrderedPlayers> => {
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

  return {
    startingPlayer,
    otherPlayer
  };
}

export default setup;