import makeShip from './ship';

const makeGameboard = (() => {
  const gameboard = () => {
    const board = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    const ships = [];

    const placeship = (x, y, position, length, name) => {
      const ship = makeShip.newShip(length, name);
      ships.push(ship);
      let coordX = x;
      let coordY = y;
      if (!Number.isNaN(board[coordY][coordX])) {
        for (let i = 0; i < length; i += 1) {
          board[coordY][coordX] = ship.getName();
          if (position === 'vertical') {
            coordY += 1;
          } else if (position === 'horizontal') {
            coordX += 1;
          }
        }
      }
      return `ship: (${board[y][x]}) placed at (${x}, ${y})`;
    };

    return { placeship };
  };

  function newGameboard() {
    const gameboard1 = gameboard();

    return gameboard1;
  }

  return {
    newGameboard,
  };
})();

export default makeGameboard;
