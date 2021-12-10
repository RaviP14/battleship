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

  const divShips = document.getElementById('shipsDiv');
  const shipsDiv = divShips;

  const subShip = document.getElementById('submarine');
  const submarine = subShip;

  const shipAttack = document.getElementById('attackship');
  const attackship = shipAttack;

  const shipTrooper1 = document.getElementById('trooper1');
  const Trooper1 = shipTrooper1;

  const shipTrooper2 = document.getElementById('trooper2');
  const Trooper2 = shipTrooper2;

  const shipStealth = document.getElementById('stealthship');
  const stealthShip = shipStealth;

  const modal1 = document.getElementById('modal');
  const modal = modal1;

  const help = document.getElementById('instructions');
  const instructionsBtn = help;

  const span1 = document.getElementById('close');
  const closeModal = span1;

  const allPlayerShips = document.getElementById('playerShipsDiv');
  const allPlayerShipsDiv = allPlayerShips;

  const buttonsDiv = document.getElementById('buttonsDiv');
  const AllButtonsDiv = buttonsDiv;

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
    attackship,
    Trooper1,
    Trooper2,
    stealthShip,
    shipsDiv,
    modal,
    instructionsBtn,
    closeModal,
    allPlayerShipsDiv,
    AllButtonsDiv,
  };
})();

export default elem;
