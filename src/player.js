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

  const computer = () => {
    const playersGamebaoard = makeGameboard.newGameboard();
    const getRandomNumber = (min, max) => {
      const mini = Math.ceil(min);
      const maxi = Math.floor(max);
      return Math.floor(Math.random() * (maxi - mini + 1) + mini);
    };
    const moves = [];
    const movesHash = {};

    const buildMovesHash = () => {
      for (let i = 0; i < moves.length; i += 1) {
        movesHash[moves[i]] = i;
      }
    };

    const attackAgain = (prevReselt, target, x, y, num) => {
      const x1 = x + num;
      const y1 = y + num;
      const x0 = x - num;
      const y0 = y - num;
      const next = {};
      const move = [prevReselt, next];
      if (Math.random() < 0.25) {
        next.xVal = x1;
        next.yVal = y;
        next.attacked = target.playersGamebaoard.receiveAttack(x1, y);
        next.moves = num;
      } else if (Math.random() > 0.25 && Math.random() < 0.5) {
        next.xVal = x;
        next.yVal = y1;
        next.attacked = target.playersGamebaoard.receiveAttack(x, y1);
        next.moves = num;
      } else if (Math.random() > 0.5 && Math.random() < 0.75) {
        next.xVal = x0;
        next.yVal = y;
        next.attacked = target.playersGamebaoard.receiveAttack(x0, y);
        next.moves = num;
      } else {
        next.xVal = x;
        next.yVal = y0;
        next.attacked = target.playersGamebaoard.receiveAttack(x, y0);
        next.moves = num;
      }
      return move;
    };

    const multipleAttacks = (done, move, target, x, y, num) => {
      let result = done;
      if (move === 'hit') {
        result = attackAgain(done, target, x, y, num);
      }
      return result;
    };

    const attack = (target) => {
      const x = getRandomNumber(0, 9);
      const y = getRandomNumber(0, 9);
      buildMovesHash();
      const value = [y, x];
      const hasValueProperty = Object.prototype.hasOwnProperty.call(
        movesHash,
        value
      );
      let done = {
        xVal: x,
        yVal: y,
        attacked: '',
      };
      if (!hasValueProperty) {
        moves.push(value);
        const place1 = target.playersGamebaoard.receiveAttack(x, y);
        done.attacked = place1;
        const place2 = multipleAttacks(done, place1, target, x, y, 1);
        done = place2;
        const place3 = multipleAttacks(done, place2, target, x, y, 2);
        done = place3;
      } else {
        // look into do while loops probably worth returning a done = 'oops invalid' in else.
        // then while call attack in another function using do while loop & return that instead.
      }

      return done;
    };

    return { attack, playersGamebaoard };
  };

  function newComputer() {
    const pc = computer();
    return pc;
  }

  return {
    newPlayer,
    newComputer,
  };
})();

export default makePlayer;
