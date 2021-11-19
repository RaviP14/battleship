import interact from './interact';

test('get coordinates from dom', () => {
  const getCoord = interact.getCoords(7, 10);
  const getCoord2 = interact.getCoords(89, 10);
  const getCoord3 = interact.getCoords(34, 10);

  expect(getCoord).toMatchObject({ x: 7, y: 0 });
  expect(getCoord2).toMatchObject({ x: 9, y: 8 });
  expect(getCoord3).toMatchObject({ x: 4, y: 3 });
});

test('get index from coords 1 hit', () => {
  // Get values as [y, x] from
  const getIndex = interact.getIndex({ yVal: 7, xVal: 3 }, 10);
  const getIndex2 = interact.getIndex({ yVal: 4, xVal: 9 }, 10);

  expect(getIndex).toMatchObject({ index1: 73 });
  expect(getIndex2).toMatchObject({ index1: 49 });
});

test('get index from coords 2 hits', () => {
  const getIndex3 = interact.getIndex(
    [
      { xVal: 6, yVal: 6, attacked: 'hit' },
      { xVal: 3, yVal: 4, attacked: 'missed' },
    ],
    10
  );

  expect(getIndex3).toMatchObject({ index1: 66, index2: 43 });
});

test('get index from coords 3 hits', () => {
  // Get values as [y, x] from
  const getIndex4 = interact.getIndex(
    [
      [
        { xVal: 6, yVal: 6, attacked: 'hit' },
        { xVal: 3, yVal: 4, attacked: 'missed' },
      ],
      { xVal: 2, yVal: 2, attacked: 'missed' },
    ],
    10
  );
  expect(getIndex4).toMatchObject({ index1: 66, index2: 43, index3: 22 });
});
