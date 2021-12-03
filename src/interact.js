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
      value.textContent = 'X';
    } else if (attackP === 'miss' && value.textContent === '') {
      value.style.backgroundColor = '#006994';
      value.textContent = '.';
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
          value.textContent = 'X';
        } else if (object.attacked === 'miss' && value.textContent === '') {
          value.style.backgroundColor = '#006994';
          value.textContent = '.';
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
  // Randomly choose pc ships - 5 options.
  function chooseShipsPc(computer) {
    const random = Math.random();
    if (random <= 0.2) {
      // Can't have the same named ship otherwise isSunk breaks.
      computer.playersGamebaoard.placeship(1, 1, 'vertical', 2, 'trooper');
      computer.playersGamebaoard.placeship(7, 8, 'horizontal', 2, 'trooper 2');
      computer.playersGamebaoard.placeship(
        6,
        5,
        'horizontal',
        4,
        'attack ship'
      );
      computer.playersGamebaoard.placeship(0, 4, 'vertical', 3, 'submarine');
      computer.playersGamebaoard.placeship(0, 9, 'vertical', 1, 'stealth ship');
    } else if (random > 0.2 && random <= 0.4) {
      computer.playersGamebaoard.placeship(9, 8, 'vertical', 2, 'trooper');
      computer.playersGamebaoard.placeship(0, 4, 'horizontal', 2, 'trooper 2');
      computer.playersGamebaoard.placeship(
        5,
        0,
        'horizontal',
        4,
        'attack ship'
      );
      computer.playersGamebaoard.placeship(3, 4, 'vertical', 3, 'submarine');
      computer.playersGamebaoard.placeship(5, 5, 'vertical', 1, 'stealth ship');
    } else if (random > 0.4 && random <= 0.6) {
      computer.playersGamebaoard.placeship(8, 1, 'vertical', 2, 'trooper');
      computer.playersGamebaoard.placeship(6, 8, 'horizontal', 2, 'trooper 2');
      computer.playersGamebaoard.placeship(3, 4, 'vertical', 4, 'attack ship');
      computer.playersGamebaoard.placeship(1, 9, 'horizontal', 3, 'submarine');
      computer.playersGamebaoard.placeship(0, 5, 'vertical', 1, 'stealth ship');
    } else if (random > 0.6 && random <= 0.8) {
      computer.playersGamebaoard.placeship(6, 2, 'vertical', 2, 'trooper');
      computer.playersGamebaoard.placeship(8, 0, 'vertical', 2, 'trooper 2');
      computer.playersGamebaoard.placeship(
        2,
        5,
        'horizontal',
        4,
        'attack ship'
      );
      computer.playersGamebaoard.placeship(0, 3, 'horizontal', 3, 'submarine');
      computer.playersGamebaoard.placeship(4, 8, 'vertical', 1, 'stealth ship');
    } else if (random > 0.8 && random <= 1) {
      computer.playersGamebaoard.placeship(0, 0, 'vertical', 2, 'trooper');
      computer.playersGamebaoard.placeship(8, 8, 'horizontal', 2, 'trooper 2');
      computer.playersGamebaoard.placeship(
        3,
        9,
        'horizontal',
        4,
        'attack ship'
      );
      computer.playersGamebaoard.placeship(5, 5, 'vertical', 3, 'submarine');
      computer.playersGamebaoard.placeship(7, 3, 'vertical', 1, 'stealth ship');
    }
  }

  function pcChooseShips(computer) {
    chooseShipsPc(computer);
  }

  function pChooseShipPosition(colour, child, parent, index, posType, length) {
    const numbers = index.toString().slice().split('');
    const actualNumbers = numbers.map(Number);
    const child1 = child;
    let clicked;
    const colourCheck = child.style.backgroundColor;
    if (posType === 'horizontal') {
      if (
        (length === 2 &&
          actualNumbers[1] <= 8 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 2 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 8 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 1;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (i === index2) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (
        (length === 3 &&
          actualNumbers[1] <= 7 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 3 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 7 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 1;
        const index3 = index + 2;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (
              i === index2 &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (i === index3) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (
        (length === 4 &&
          actualNumbers[1] <= 6 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 4 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 6 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 1;
        const index3 = index + 2;
        const index4 = index + 3;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (
              i === index2 &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (
              i === index3 &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (i === index4) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (length === 1 && colourCheck !== 'rgb(34, 139, 34)') {
        child1.style.backgroundColor = colour;
        clicked = 'yes';
      }
    } else if (posType === 'vertical') {
      if (
        (length === 2 &&
          actualNumbers[0] <= 8 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 2 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 9 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 10;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (i === index2) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (
        (length === 3 &&
          actualNumbers[0] <= 7 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 3 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 9 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 10;
        const index3 = index + 20;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (
              i === index2 &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (i === index3) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (
        (length === 4 &&
          actualNumbers[0] <= 6 &&
          colourCheck !== 'rgb(34, 139, 34)') ||
        (length === 4 &&
          actualNumbers.length === 1 &&
          actualNumbers[0] <= 9 &&
          colourCheck !== 'rgb(34, 139, 34)')
      ) {
        const index2 = index + 10;
        const index3 = index + 20;
        const index4 = index + 30;
        const array = Array.from(parent.children);
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].style.backgroundColor !== 'rgb(34, 139, 34)') {
            if (
              i === index &&
              array[index2].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              child1.style.backgroundColor = colour;
              clicked = 'yes';
            } else if (
              i === index2 &&
              array[index3].style.backgroundColor !== 'rgb(34, 139, 34)' &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (
              i === index3 &&
              array[index4].style.backgroundColor !== 'rgb(34, 139, 34)'
            ) {
              array[i].style.backgroundColor = colour;
            } else if (i === index4) {
              array[i].style.backgroundColor = colour;
            }
          }
        }
      } else if (length === 1 && colourCheck !== 'rgb(34, 139, 34)') {
        child1.style.backgroundColor = colour;
        clicked = 'yes';
      }
    }
    return clicked;
  }

  function chooseShipPos(colour, child, parent, index, posType, length) {
    return pChooseShipPosition(colour, child, parent, index, posType, length);
  }

  function selectGridIndex(colour, posType, length, e) {
    if (e.target.matches('.gridSquare')) {
      const child = e.target;
      const parent = child.parentNode;
      const index = Array.prototype.indexOf.call(parent.children, child);
      chooseShipPos(colour, child, parent, index, posType, length);
    }
  }

  function markIndex(
    colour,
    posType,
    length,
    name,
    e,
    controller,
    player,
    shipController
  ) {
    if (e.target.matches('.gridSquare')) {
      const child = e.target;
      const parent = child.parentNode;
      const index = Array.prototype.indexOf.call(parent.children, child);
      const element = document.getElementById(name);
      const colourCheck = child.style.backgroundColor;
      const check = chooseShipPos(
        colour,
        child,
        parent,
        index,
        posType,
        length
      );
      if (colourCheck !== 'rgb(34, 139, 34)' && check === 'yes') {
        controller.abort();
        shipController.abort();
        element.style.backgroundColor = '#d3d3d3';
        // convert index to coords
        const coords = convertToCoords(index, 10);
        const coordX = coords.x;
        const coordY = coords.y;
        // place ship on gameboard array
        player.playersGamebaoard.placeship(
          coordX,
          coordY,
          posType,
          length,
          name
        );
      }
    }
  }

  function selectShip(
    shipName,
    posType,
    length,
    controller,
    player,
    shipController
  ) {
    document.addEventListener(
      'mouseover',
      (e) => {
        const colour = '#d3d3d3';
        selectGridIndex(colour, posType, length, e);
      },
      { signal: controller.signal }
    );

    document.addEventListener(
      'mouseout',
      (e) => {
        const colour = '#ffffff';
        selectGridIndex(colour, posType, length, e);
      },
      { signal: controller.signal }
    );
    document.addEventListener(
      'mousedown',
      (e) => {
        const colour = '#228B22';
        markIndex(
          colour,
          posType,
          length,
          shipName,
          e,
          controller,
          player,
          shipController
        );
      },
      { signal: controller.signal }
    );
  }
  const abortMouseEvents = (controller) => {
    function abortController() {
      controller.abort();
    }
    function abort() {
      abortController();
    }

    return {
      abort,
    };
  };

  const abortArray = [];

  function shipClicked(e, player, shipController) {
    // abort old controller after each new one.
    const controller = new AbortController();
    const abort1 = abortMouseEvents(controller);
    abortArray.push(abort1);
    const shipName = e.target.id;
    const posType = e.target.value;
    const lengths = e.target.getAttribute('data-key');
    const length = parseInt(lengths, 10);
    selectShip(shipName, posType, length, controller, player, shipController);
  }

  function clickShip(e, player, shipController) {
    shipClicked(e, player, shipController);
  }
  return {
    getCoords,
    getIndex,
    renderAttackP,
    renderAttackComputer,
    deleteGrids,
    pcChooseShips,
    chooseShipPos,
    clickShip,
    abortArray,
  };
})();

export default interact;
