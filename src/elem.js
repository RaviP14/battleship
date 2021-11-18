const elem = (() => {
  const playGame = document.getElementById('playGame');
  const playGameBtn = playGame;

  const gridP = document.getElementById('gridDivP');
  // gridP.style.display = 'none';
  const gridC = document.getElementById('gridDivC');
  // gridC.style.display = 'none';

  function makeGrid(gridName, container, rows, columns) {
    const grid = document.getElementById(gridName);
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', columns);
    for (let i = 0; i < rows * columns; i += 1) {
      const gridDiv = document.createElement('div');
      gridDiv.className = 'gridSquare';
      gridDiv.style.height = `${400 / rows}px`;
      gridDiv.style.width = `${400 / columns}px`; // change to rem?
      grid.appendChild(gridDiv);
    }
    container.appendChild(grid);
  }

  // const cGrid = document.getElementById('computersGrid');

  makeGrid('playersGrid', gridP, 10, 10);
  makeGrid('computersGrid', gridC, 10, 10);

  return {
    playGameBtn,
  };
})();

export default elem;
