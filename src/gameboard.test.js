import makeGameboard from './gameboard';

test('place ship on gameboard', () => {
  const x = 2;
  const y = 'b';
  const size = 2;
  expect(makeGameboard.placeShip(x, y, size)).toBe(
    `ship placed at (${x}, ${y})`
  );
});
