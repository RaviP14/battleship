const elem = (() => {
  const playGame = document.getElementById('playGame');
  const playGameBtn = playGame;

  const playAgain = document.getElementById('playAgain');
  const playAgainBtn = playAgain;
  playAgainBtn.style.display = 'none';

  const gridP = document.getElementById('gridDivP');
  const gridPlayer = gridP;
  gridPlayer.style.display = 'none';

  const gridC = document.getElementById('gridDivC');
  const gridComp = gridC;
  gridComp.style.display = 'none';

  const displayM = document.getElementById('mainDisplay');
  const mainDisplay = displayM;

  const cGrid = document.getElementById('computersGrid');
  const computersGrid = cGrid;

  const pGrid = document.getElementById('playersGrid');
  const playersGrid = pGrid;

  const switchP = document.getElementById('switchP');
  const switchOrientation = switchP;

  const subShip = document.getElementById('submarine');
  const submarine = subShip;

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
    playAgainBtn,
    createGrid,
    gridPlayer,
    gridComp,
    mainDisplay,
    computersGrid,
    playersGrid,
    switchOrientation,
    submarine,
  };
})();

export default elem;
