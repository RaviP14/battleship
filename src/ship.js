const makeShip = (() => {
  const ship = (length, name) => {
    const getLength = () => length;
    const getName = () => name;

    const position = Array.from(Array(length).keys());

    const hit = (n) => {
      if (n <= length && position[n] !== 'hit') {
        position[n] = 'hit';
      }
      return position[n];
    };

    const isEqual = (array) => {
      return array.every((value) => value === 'hit');
    };

    const isSunk = () => {
      const equal = isEqual(position);
      if (equal) {
        const sunk = 'sunk';
        return sunk;
      }
      const notSunk = 'not sunk';
      return notSunk;
    };

    return { getLength, hit, isSunk, getName };
  };

  function newShip(length, name) {
    const ship1 = ship(length, name);
    return ship1;
  }

  return {
    newShip,
  };
})();

export default makeShip;
