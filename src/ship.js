const makeShip = (() => {
  const ship = (length) => {
    const getLength = () => length;

    const position = Array.from(Array(length).keys());

    const hit = (n) => {
      if (position[n] !== 'hit') {
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

    return { getLength, hit, isSunk };
  };

  function newShip(length) {
    const ship1 = ship(length);
    return ship1;
  }

  return {
    newShip,
  };
})();

export default makeShip;
