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
