const interact = (() => {
  function convertToCoords(index, gridColLength) {
    const rowPosition = Math.floor(index / gridColLength);
    const colPosition = index % gridColLength;
    const coords = {
      y: rowPosition,
      x: colPosition,
    };

    return coords;
  }

  function getCoords(index, gridColLength) {
    const coords = convertToCoords(index, gridColLength);
    return coords;
  }

  return {
    getCoords,
  };
})();

export default interact;
