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
          const shipName = ship.getName();
          board[coordY][coordX] = [shipName, i];
          if (position === 'vertical') {
            coordY += 1;
          } else if (position === 'horizontal') {
            coordX += 1;
          }
        }
      }
      return `ship: (${board[y][x][0]}) placed at (${x}, ${y})`;
    };
    // Find ship using ship.name in ships array
    const findShip = (shipName) => {
      const ship = ships.find((obj) => {
        return obj.getName() === shipName;
      });
      return ship;
    };
    // Record of missed attack coordinates.
    const missedAttacks = [];

    const missed = (coords) => {
      missedAttacks.push(coords);
    };

    const receiveAttack = (x, y) => {
      if (
        board[y][x][0] !== undefined &&
        !Number.isNaN(board[y][x][0]) &&
        board[y][x][0] !== 'hit'
      ) {
        const ship1 = findShip(board[y][x][0]);
        const position = board[y][x][1];
        ship1.hit(position);
        board[y][x][0] = 'hit';
      } else {
        board[y][x] = ['miss'];
        const miss = [y, x];
        missed(miss);
      }

      return board[y][x][0];
    };

    const missedAttacksHash = {};

    const buildMissedHash = () => {
      for (let i = 0; i < missedAttacks.length; i += 1) {
        missedAttacksHash[missedAttacks[i]] = i;
      }
    };

    const getMissedAttack = (x, y) => {
      buildMissedHash();
      let value = [y, x];
      const hasValueProperty = Object.prototype.hasOwnProperty.call(
        missedAttacksHash,
        value
      );
      if (!hasValueProperty) {
        value = 'not a missed attack';
      }
      return value;
    };

    const allSunk = () => {
      const all = ships.every((ship) => ship.isSunk() === 'sunk');
      let val = 'not all sunk';
      if (all) {
        val = 'all sunk';
      }
      return val;
    };

    return { placeship, receiveAttack, getMissedAttack, allSunk };
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
