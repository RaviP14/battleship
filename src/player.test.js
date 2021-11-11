import makePlayer from './player';

test('attack the enemy', () => {
  const player1 = makePlayer.newPlayer();
  const player2 = makePlayer.newPlayer();

  player1.gameboard.placeship(1, 2, 'vertical', 3, 'Enforcer');
  player2.gameboard.placeship(5, 4, 'horizontal', 3, 'Enforcer');

  expect(player1.attack(2, 2)).tobe('miss');
  expect(player2.attack(4, 2)).tobe('miss');
  expect(player1.attack(1, 3)).tobe('hit');
  expect(player2.attack(6, 4)).tobe('hit');
});
