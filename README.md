# Battleship Project

## Overview

Live preview is available <a href="https://ravip14.github.io/battleship/">here</a>.

### Tools

- Visual Studio Code
- Webpack
- Jest
- ESLint + Airbnb JavaScript Style Guide
- Prettier
- Babel

### Features

- Ship Factory Function stores the relevant ship info.
- Gameboard Factory Function stores everything that occurs on the gameboard.
- Player & Computer AI Factory functions handle all players and computers moves.
- All factory functions are **tested with Jest**.
- Features **Computer AI** able to attack once player attacks.
- Computer AI is able to have upto 3 consecutive successful attacks.
- Player can place ships using custom ship placement.
- Custom Placement - players cannot place ships in areas they're too large (hover over will dissapear and you won't be able to place the ship).
- Player can select ship using ship buttons then place on the gameboard with a mouse click.
- Player can change ship orientation with Vertical/Horizontal button.
- Play Game button starts the game loop.
- The display shows either the players turn or computers turn.
- Hits are marked with a red cell and X marker.
- Misses are marked with a blue cell and a dot marker.
- Once all ships on either board are hit - the game ends and the play again button appears.
- **How To Play button** shows how to play the game using a modal.
