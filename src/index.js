import makePlayer from './player';
import interact from './interact';
import elem from './elem';

(() => {
  elem.playGameBtn.addEventListener('click', () => {
    elem.gridComp.style.display = 'block';
    elem.gridPlayer.style.display = 'block';

    elem.createGrid('playersGrid', elem.gridPlayer, 10, 10);
    elem.createGrid('computersGrid', elem.gridComp, 10, 10);

    const player1 = makePlayer.newPlayer();
    const computer = makePlayer.newComputer();

    player1.playersGamebaoard.placeship(2, 3, 'vertical', 2, 'trooper');
    player1.playersGamebaoard.placeship(9, 4, 'vertical', 4, 'attack ship');
    player1.playersGamebaoard.placeship(1, 1, 'horizontal', 3, 'submarine');

    computer.playersGamebaoard.placeship(1, 1, 'vertical', 2, 'trooper');
    computer.playersGamebaoard.placeship(6, 5, 'horizontal', 4, 'attack ship');
    computer.playersGamebaoard.placeship(0, 3, 'vertical', 3, 'submarine');

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
          interact.renderAttackP(attackResult, child);
          // check if all pc ships are sunk
          const sunk = computer.playersGamebaoard.allSunk();
          const display = elem.mainDisplay;
          display.textContent = 'Players attack';
          if (sunk === 'all sunk') {
            display.textContent = 'You Win';
            interact.deleteGrids();
            elem.playGameBtn.style.display = 'none';
            elem.playAgainBtn.style.display = 'block';
          } else if (attackResult === 'hit') {
            display.textContent = 'Player attack again';
          } else if (sunk === 'not all sunk' && attackResult === 'miss') {
            display.textContent = 'PCs attack';
            interact.renderAttackComputer(
              elem.mainDisplay,
              elem.playersGrid,
              player1,
              computer
            );
          }
        }
      }
    });
  });
  elem.playAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });
})();
