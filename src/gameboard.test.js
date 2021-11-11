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

test('Missed attacks', () => {
  const board1 = makeGameboard.newGameboard();
  board1.placeship(4, 4, 'vertical', 2, 'Cargo');
  expect(board1.receiveAttack(1, 0)).toBe('miss');
  expect(board1.getMissedAttack(1, 0)).toStrictEqual([0, 1]);
  expect(board1.receiveAttack(4, 2)).toBe('miss');
  expect(board1.getMissedAttack(4, 2)).toStrictEqual([2, 4]);
  expect(board1.getMissedAttack(1, 1)).toBe('not a missed attack');
});

test('all sunk', () => {
  const board1 = makeGameboard.newGameboard();
  board1.placeship(1, 2, 'vertical', 2, 'Cargo');
  board1.placeship(3, 3, 'horizontal', 1, 'Miniship');
  board1.receiveAttack(1, 2);
  board1.receiveAttack(1, 3);
  board1.receiveAttack(3, 3);

  expect(board1.allSunk()).toBe('all sunk');
});

test('not all sunk', () => {
  const board1 = makeGameboard.newGameboard();
  board1.placeship(1, 2, 'vertical', 2, 'Cargo');
  board1.placeship(3, 3, 'horizontal', 1, 'Miniship');
  board1.receiveAttack(1, 2);
  board1.receiveAttack(3, 3);

  expect(board1.allSunk()).toBe('not all sunk');
});
