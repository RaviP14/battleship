import makePlayer from './player';

test('attack the enemy', () => {
  const player1 = makePlayer.newPlayer();
  const player2 = makePlayer.newPlayer();

  player1.playersGamebaoard.placeship(1, 2, 'vertical', 3, 'Enforcer');
  player2.playersGamebaoard.placeship(5, 4, 'horizontal', 3, 'Enforcer');
  player2.playersGamebaoard.placeship(3, 3, 'horizontal', 2, 'Marina');

  expect(player1.attack(player2, 2, 2)).toBe('miss');
  expect(player2.attack(player1, 4, 2)).toBe('miss');
  expect(player1.attack(player2, 6, 4)).toBe('hit');
  expect(player2.attack(player1, 1, 3)).toBe('hit');
  expect(player1.attack(player2, 3, 3)).toBe('hit');
});
