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
    // store all attack coordinates.
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
      buildMovesHash();
      const value1 = [y, x1];
      const value2 = [y1, x];
      const value3 = [y, x0];
      const value4 = [y0, x];
      const random = Math.random();
      const hasValueProperty1 = Object.prototype.hasOwnProperty.call(
        movesHash,
        value1
      );
      const hasValueProperty2 = Object.prototype.hasOwnProperty.call(
        movesHash,
        value2
      );
      const hasValueProperty3 = Object.prototype.hasOwnProperty.call(
        movesHash,
        value3
      );
      const hasValueProperty4 = Object.prototype.hasOwnProperty.call(
        movesHash,
        value4
      );
      const next = {};
      const move = [prevReselt, next];
      if (random <= 0.25 && !hasValueProperty1) {
        next.xVal = x1;
        next.yVal = y;
        next.attacked = target.playersGamebaoard.receiveAttack(x1, y);
        next.moves = num;
      } else if (random > 0.25 && random <= 0.5 && !hasValueProperty2) {
        next.xVal = x;
        next.yVal = y1;
        next.attacked = target.playersGamebaoard.receiveAttack(x, y1);
        next.moves = num;
      } else if (random > 0.5 && random <= 0.75 && !hasValueProperty3) {
        next.xVal = x0;
        next.yVal = y;
        next.attacked = target.playersGamebaoard.receiveAttack(x0, y);
        next.moves = num;
      } else if (random > 0.75 && random <= 1 && !hasValueProperty4) {
        next.xVal = x;
        next.yVal = y0;
        next.attacked = target.playersGamebaoard.receiveAttack(x, y0);
        next.moves = num;
      } else {
        next.attacked = `attack ${num} unsuccessful`; // could get x & y from redered table or run attack again afterwards.
      }
      return move;
    };
    // Launch 2nd/3rd attack after success.
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
        let hits = 'miss';
        if (place2.length === 2 && place2[1].attacked === 'hit') {
          hits = 'hit';
        }
        const place3 = multipleAttacks(done, hits, target, x, y, 2);
        done = place3;
      } else {
        done = 'coordinates taken';
      }

      return done;
    };
    // If coords are taken run attack again until empty coords taken.
    const makeAttack = (target) => {
      let answer = '';
      const result = attack(target);
      answer = result;
      while (result === 'coordinates taken') {
        const result2 = attack(target);
        if (result2 !== 'coordinates taken') {
          answer = result2;
          break;
        }
      }
      return answer;
    };

    return { makeAttack, playersGamebaoard };
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
