import makeGameboard from './gameboard';

test('place ship on gameboard', () => {
  const x = 2;
  const y = 1;
  const size = 2;
  const position = 'vertical';
  const name = 'Battleship';
  const board1 = makeGameboard.newGameboard();
  expect(board1.placeship(x, y, position, size, name)).toBe(
    'ship: (Battleship) placed at (2, 1)'
  );
});

test('Attack a ship', () => {
  const board1 = makeGameboard.newGameboard();
  board1.placeship(3, 3, 'horizontal', 4, 'Submarine');
  expect(board1.receiveAttack(3, 3)).toBe('hit');
  expect(board1.receiveAttack(1, 3)).toBe('miss');
  expect(board1.receiveAttack(6, 3)).toBe('hit');
});
