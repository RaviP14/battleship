import elem from './elem';

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
      const indexs = val1 + x;
      finalVal = { attack1: { index: indexs, attacked: attack } };
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
        attack1: { index: indexs1, attacked: attack1 },
        attack2: { index: indexs2, attacked: attack2 },
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
        attack1: { index: indexs1, attacked: attack1 },
        attack2: { index: indexs2, attacked: attack2 },
        attack3: { index: indexs3, attacked: attack3 },
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
    if (attackP === 'hit' && value.textContent === '') {
      value.style.backgroundColor = '#800000';
    } else if (attackP === 'miss' && value.textContent === '') {
      value.style.backgroundColor = '#006994';
    }
  }

  function renderAttackP(attackP, element) {
    const attack = playersAttack(attackP, element);
    return attack;
  }
  // Render hit or miss on html board
  function creatLoop(parent, object) {
    const children = parent.childNodes;
    const childrenArray = Array.from(children);
    for (let i = 0; i < childrenArray.length; i += 1) {
      if (i === object.index) {
        const value = childrenArray[i];
        if (object.attacked === 'hit' && value.textContent === '') {
          value.style.backgroundColor = '#800000';
        } else if (object.attacked === 'miss' && value.textContent === '') {
          value.style.backgroundColor = '#006994';
        }
      }
    }
  }

  function removeGrids() {
    elem.computersGrid.removeChild(elem.computersGrid.firstChild);
    elem.playersGrid.removeChild(elem.playersGrid.firstChild);
    elem.gridComp.style.display = 'none';
    elem.gridPlayer.style.display = 'none';
  }

  function deleteGrids() {
    removeGrids();
  }
  // Start render to attacks for pc & multiple attacks.
  function computersAttack(display, parent, player, pc) {
    const attacks = pc.makeAttack(player);
    const values = getIndex(attacks, 10);
    const totalLength = Object.keys(values).length;
    if (totalLength === 1) {
      const obj1 = values.attack1;
      creatLoop(parent, obj1);
    } else if (totalLength === 2) {
      const obj1 = values.attack1;
      const obj2 = values.attack2;
      creatLoop(parent, obj1);
      creatLoop(parent, obj2);
    } else if (totalLength === 3) {
      const obj1 = values.attack1;
      const obj2 = values.attack2;
      const obj3 = values.attack3;
      creatLoop(parent, obj1);
      creatLoop(parent, obj2);
      creatLoop(parent, obj3);
    }
    const sunk = player.playersGamebaoard.allSunk();
    const display1 = display;
    if (sunk === 'all sunk') {
      display1.textContent = 'You lost :(';
      deleteGrids();
      elem.playGameBtn.style.display = 'none';
      elem.playAgainBtn.style.display = 'block';
    } else if (sunk === 'not all sunk') {
      display1.textContent = 'Players turn';
    }
  }

  function renderAttackComputer(display, parent, player, pc) {
    computersAttack(display, parent, player, pc);
  }

  return {
    getCoords,
    getIndex,
    renderAttackP,
    renderAttackComputer,
    deleteGrids,
  };
})();

export default interact;
