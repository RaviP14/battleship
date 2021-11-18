import interact from './interact';

test('get coordinates from dom', () => {
  const getCoord = interact.getCoords(7);

  expect(getCoord).toBe({ x: 7, y: 0 });
});
