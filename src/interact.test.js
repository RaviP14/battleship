import interact from './interact';

test('get coordinates from dom', () => {
  const getCoord = interact.getCoords(7, 10);
  const getCoord2 = interact.getCoords(89, 10);
  const getCoord3 = interact.getCoords(34, 10);

  expect(getCoord).toMatchObject({ x: 7, y: 0 });
  expect(getCoord2).toMatchObject({ x: 9, y: 8 });
  expect(getCoord3).toMatchObject({ x: 4, y: 3 });
});
