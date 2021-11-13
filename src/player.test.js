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

test('computer test', () => {
  const player1 = makePlayer.newPlayer('player1');
  const computer = makePlayer.newComputer();

  player1.playersGamebaoard.placeship(5, 4, 'horizontal', 3, 'Enforcer');
  player1.playersGamebaoard.placeship(3, 3, 'horizontal', 2, 'Marina');

  computer.playersGamebaoard.placeship(1, 2, 'vertical', 3, 'Enforcer');

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  expect(player1.attack(computer, 1, 6)).toBe('miss');
  expect(computer.attack(player1)).toMatchObject({
    xVal: 5,
    yVal: 5,
    attacked: 'miss',
  });
  expect(player1.attack(computer, 4, 2)).toBe('miss');

  mockMath.random = () => 0.3;
  global.Math = mockMath;

  expect(computer.attack(player1)).toMatchObject([
    {
      xVal: 3,
      yVal: 3,
      attacked: 'hit',
    },
    {
      xVal: 3,
      yVal: 4,
      attacked: 'miss',
      moves: 1,
    },
  ]);
});
