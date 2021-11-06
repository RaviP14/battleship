import makeShip from './ship';

test('length of ship', () => {
  const ship1 = makeShip.newShip(2);

  expect(ship1.getLength()).toBe(2);
});

test('is the ship hit', () => {
  const ship2 = makeShip.newShip(3);

  expect(ship2.hit(2)).toBe('hit');
});

test('is the ship sunk', () => {
  const ship3 = makeShip.newShip(3);
  ship3.hit(0);
  ship3.hit(1);
  ship3.hit(2);
  expect(ship3.isSunk()).toBe('sunk');
});
