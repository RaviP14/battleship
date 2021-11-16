import makePlayer from './player';
import interact from './interact';

(() => {
  interact.playGameBtn.addEventListener('click', () => {
    const player1 = makePlayer.newPlayer();
    const computer = makePlayer.newComputer();

    player1.playersGamebaoard.placeship(2, 3, 'vertical', 2, 'trooper');
    player1.playersGamebaoard.placeship(9, 4, 'vertical', 4, 'attack ship');
    player1.playersGamebaoard.placeship(1, 1, 'horizontal', 3, 'submarine');

    computer.playersGamebaoard.placeship(1, 1, 'vertical', 2, 'trooper');
    computer.playersGamebaoard.placeship(8, 5, 'horizontal', 4, 'attack ship');
    computer.playersGamebaoard.placeship(0, 3, 'vertical', 3, 'submarine');
  });
})();
