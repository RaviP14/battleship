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

  function convertToIndex(array, colLength) {
    // Check if the array param is an array or object
    const isArr = Object.prototype.toString.call(array);
    // Check if every array items are objects
    let isObject = '';
    if (isArr === '[object Array]') {
      isObject = array.every(
        (item) => Object.prototype.toString.call(item) === '[object Object]'
      );
    }
    let finalVal = '';
    if (isArr === '[object Object]') {
      const y = array.yVal;
      const x = array.xVal;
      const attack = array.attacked;

      const val1 = y * colLength;
      const index = val1 + x;
      finalVal = { index1: index, attacked: attack };
    } else if (isArr === '[object Array]' && isObject === true) {
      const y1 = array[0].yVal;
      const x1 = array[0].xVal;
      const attack1 = array[0].attacked;

      const y2 = array[1].yVal;
      const x2 = array[1].xVal;
      const attack2 = array[1].attacked;

      const indexs1 = y1 * colLength + x1;
      const indexs2 = y2 * colLength + x2;

      finalVal = {
        attack1: { index1: indexs1, attacked: attack1 },
        attack2: { index2: indexs2, attacked: attack2 },
      };
    } else if (isArr === '[object Array]' && isObject === false) {
      const y1 = array[0][0].yVal;
      const x1 = array[0][0].xVal;
      const attack1 = array[0][0].attacked;

      const y2 = array[0][1].yVal;
      const x2 = array[0][1].xVal;
      const attack2 = array[0][1].attacked;

      const y3 = array[1].yVal;
      const x3 = array[1].xVal;
      const attack3 = array[1].attacked;

      const indexs1 = y1 * colLength + x1;
      const indexs2 = y2 * colLength + x2;
      const indexs3 = y3 * colLength + x3;

      finalVal = {
        attack1: { index1: indexs1, attacked: attack1 },
        attack2: { index2: indexs2, attacked: attack2 },
        attack3: { index3: indexs3, attacked: attack3 },
      };
    }
    return finalVal;
  }

  function getIndex(array, colLength) {
    const val = convertToIndex(array, colLength);
    return val;
  }
  // render player attack function - hit or miss on page.
  function playersAttack(attackP, element) {
    const value = element;
    console.log(value.textContent);
    if (attackP === 'hit' && value.textContent === '') {
      value.textContent = 'X';
    } else if (attackP === 'miss' && value.textContent === '') {
      value.textContent = '.';
    }
  }

  function renderAttackP(attackP, element) {
    const attack = playersAttack(attackP, element);
    return attack;
  }
  // render attack for pc attacks (multiple attacks) - event listener needs to listen to this func.
  return {
    getCoords,
    getIndex,
    renderAttackP,
  };
})();

export default interact;
