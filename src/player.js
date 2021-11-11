import makeGameboard from './gameboard';

const makePlayer = (() => {
  const player = (name) => {
    const getName = () => name;
    const playersGamebaoard = makeGameboard.newGameboard();
    const attack = (target, x, y) => {
      return target.playersGamebaoard.receiveAttack(x, y);
    };
    return { getName, playersGamebaoard, attack };
  };

  function newPlayer(name) {
    const player0 = player(name);
    return player0;
  }

  return {
    newPlayer,
  };
})();

export default makePlayer;
