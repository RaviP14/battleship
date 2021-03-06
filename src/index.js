import makePlayer from './player';
import interact from './interact';
import elem from './elem';

(() => {
  elem.createGrid('playersGrid', elem.gridPlayer, 10, 10);
  const player1 = makePlayer.newPlayer();
  elem.gridPlayer.style.display = 'block';

  elem.instructionsBtn.addEventListener('click', () => {
    elem.modal.style.display = 'block';
  });

  elem.closeModal.addEventListener('click', () => {
    elem.modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === elem.modal) {
      elem.modal.style.display = 'none';
    }
  });

  const submarineController = new AbortController();
  let l = 0;
  elem.submarine.addEventListener(
    'click',
    (e) => {
      if (interact.abortArray.length > 0) {
        interact.abortArray[l].abort();
        l += 1;
      }
      interact.clickShip(e, player1, submarineController);
    },
    { signal: submarineController.signal }
  );

  const attackshipController = new AbortController();
  elem.attackship.addEventListener(
    'click',
    (e) => {
      // need to remove other ship mouse event listeners...
      if (interact.abortArray.length > 0) {
        interact.abortArray[l].abort();
        l += 1;
      }
      interact.clickShip(e, player1, attackshipController);
    },
    { signal: attackshipController.signal }
  );

  const trooper1shipController = new AbortController();
  elem.Trooper1.addEventListener(
    'click',
    (e) => {
      // need to remove other ship mouse event listeners...
      if (interact.abortArray.length > 0) {
        interact.abortArray[l].abort();
        l += 1;
      }
      interact.clickShip(e, player1, attackshipController);
    },
    { signal: trooper1shipController.signal }
  );

  const trooper2shipController = new AbortController();
  elem.Trooper2.addEventListener(
    'click',
    (e) => {
      // need to remove other ship mouse event listeners...
      if (interact.abortArray.length > 0) {
        interact.abortArray[l].abort();
        l += 1;
      }
      interact.clickShip(e, player1, attackshipController);
    },
    { signal: trooper2shipController.signal }
  );

  const stealthShipController = new AbortController();
  elem.stealthShip.addEventListener(
    'click',
    (e) => {
      // need to remove other ship mouse event listeners...
      if (interact.abortArray.length > 0) {
        interact.abortArray[l].abort();
        l += 1;
      }
      interact.clickShip(e, player1, attackshipController);
    },
    { signal: stealthShipController.signal }
  );

  elem.switchOrientation.addEventListener('click', (e) => {
    if (interact.abortArray.length > 0) {
      interact.abortArray[l].abort();
    }
    const val1 = e.target.value;
    const children = elem.shipsDiv.childNodes;
    const array = Array.from(children);
    for (let i = 0; i < array.length; i += 1) {
      array[i].value = val1;
    }
    if (val1 === 'vertical') {
      elem.switchOrientation.value = 'horizontal';
      elem.switchOrientation.textContent = 'Horizontal';
    } else if (val1 === 'horizontal') {
      elem.switchOrientation.value = 'vertical';
      elem.switchOrientation.textContent = 'Vertical';
    }
  });

  elem.playGameBtn.addEventListener('click', () => {
    elem.allPlayerShipsDiv.style.display = 'none';
    elem.gridComp.style.display = 'block';
    elem.gridPlayer.style.display = 'block';

    elem.createGrid('computersGrid', elem.gridComp, 10, 10);

    const computer = makePlayer.newComputer();
    // Adds Computers ships
    interact.pcChooseShips(computer);

    document.addEventListener('click', (e) => {
      if (e.target.matches('.gridSquare')) {
        const child = e.target;
        const parent = child.parentNode;
        const index = Array.prototype.indexOf.call(parent.children, child);
        if (parent.id === 'computersGrid' && child.textContent === '') {
          const coord = interact.getCoords(index, 10);
          const xCoord = coord.x;
          const yCoord = coord.y;
          const attackResult = player1.attack(computer, xCoord, yCoord);
          setTimeout(() => {
            interact.renderAttackP(attackResult, child);
          });
          // requires different ship names.
          const sunk = computer.playersGamebaoard.allSunk();
          const display = elem.mainDisplay;
          display.textContent = 'Players attack';
          if (sunk === 'all sunk') {
            display.textContent = 'You Win';
            interact.deleteGrids();
            elem.playGameBtn.style.display = 'none';
            elem.instructionsBtn.style.display = 'none';
            elem.AllButtonsDiv.style.justifyContent = 'center';
            elem.playAgainBtn.style.display = 'block';
          } else if (attackResult === 'hit') {
            display.textContent = 'Player attack again';
          } else if (sunk === 'not all sunk' && attackResult === 'miss') {
            display.textContent = 'PCs attack';
            setTimeout(() => {
              interact.renderAttackComputer(
                elem.mainDisplay,
                elem.playersGrid,
                player1,
                computer
              );
            }, 600);
          }
        }
      }
    });
  });
  elem.playAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });
})();
