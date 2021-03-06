const { globalEvents, world } = require("@tabletop-playground/api");

const sendGlobalMessage = (message) => {
  world.getAllPlayers().map((x) => x.showMessage(message));
};

globalEvents.onDiceRolled.add((player, dice) => {
  const red = [
    new Vector(-128.489, 2.982, 78.164),
    new Vector(-130.177, 1.309, 78.164),
  ];
  const green = [
    new Vector(-64.233, -86.966, 78.164),
    new Vector(-65.994, -88.276, 78.164),
  ];
  const blue = [
    new Vector(-62.793, 84.476, 78.164),
    new Vector(-61.839, 86.486, 78.164),
  ];
  const brown = [
    new Vector(66.415, 84.539, 78.164),
    new Vector(68.392, 85.507, 78.164),
  ];
  const orange = [
    new Vector(124.149, -3.851, 78.164),
    new Vector(126.153, -2.912, 78.164),
  ];
  const white = [
    new Vector(64.885, -77.603, 78.164),
    new Vector(62.994, -78.686, 78.164),
  ];
  
  // should prolly change this to .reduce...
  let total = 0;
  const indexArr = dice.map((x) => x.getCurrentFaceIndex());
  indexArr.map((ind) => (total += ind + 1));
  sendGlobalMessage(
    `${player.getName()} rolled a ${total} ${total === 7 ? " :(" : ""}`
  );

  dice.map((d, i) => {
    // turn back on when game can decide that a turn is done
    // d.toggleLock();

    const p = player.getSlot();
    // sendGlobalMessage(p);
    // d.setPosition(white[i], 1);

    switch (p) {
      case 0:
        return d.setPosition(orange[i], 1);
      case 1:
        return d.setPosition(red[i], 1);
      case 2:
        return d.setPosition(blue[i], 1);
      case 7:
        return d.setPosition(white[i], 1);
      case 8:
        return d.setPosition(green[i], 1);
      // case 5:
      //   return d.setPosition(red[i]);
      case 6:
        return d.setPosition(brown[i], 1);
      default:
        return;
    }
  });
});

// set up logic to keep player scores and determine game-over

// shuffle tile deck - put number deck in order - deal tile deck and number deck then lock them - place robber

// start rolling for order of turns on some event or state - message player that needs to roll and track what each player rolls on 1 roll then lock the dice for them
// determine duplicate rolls and resolve
// message players in order to place their first pieces then wait until pieces are placed to message next player??  Maybe turn button?

// lock other players from interacting with other players pieces?

//
