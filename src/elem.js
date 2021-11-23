const elem = (() => {
  const playGame = document.getElementById('playGame');
  const playGameBtn = playGame;

  const gridP = document.getElementById('gridDivP');
  const gridPlayer = gridP;

  const gridC = document.getElementById('gridDivC');
  const gridComp = gridC;

  const displayM = document.getElementById('mainDisplay');
  const mainDisplay = displayM;

  const cGrid = document.getElementById('computersGrid');
  const computersGrid = cGrid;

  const pGrid = document.getElementById('playersGrid');
  const playersGrid = pGrid;

  function makeGrid(gridName, container, rows, columns) {
    const grid = document.getElementById(gridName);
    // show grid - grid.style.display = 'grid'
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

  function createGrid(gridName, container, rows, columns) {
    const grid = makeGrid(gridName, container, rows, columns);
    return grid;
  }

  return {
    playGameBtn,
    createGrid,
    gridPlayer,
    gridComp,
    mainDisplay,
    computersGrid,
    playersGrid,
  };
})();

export default elem;
