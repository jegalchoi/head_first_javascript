let view = {
  displayMessage: function(msg) {
    let messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayMiss: function(location) {
    let position = document.getElementById(location);
    position.setAttribute('class', 'miss');
  },
  displayHit: function(location) {
    let position = document.getElementById(location);
    position.setAttribute('class','hit');
  },
}

let model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [{ locations: [0, 0, 0], hits: ['', '', ''] },
          { locations: [0, 0, 0], hits: ['', '', ''] },
          { locations: [0, 0, 0], hits: ['', '', ''] }],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i += 1) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk += 1;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed!');
    return false;
  },
  isSunk: function(ship) {
    for (let i = 0; i < this.shipLength; i += 1) {
     if (ship.hits[i] !== 'hit') {
      return false;
     } 
     return true;
    }
  },
  generateShipLocations: function() {
    let locations;
    for (let i = 0; i < this.numShips; i += 1) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ships[i].locations = locations;
    }
  },
  generateShip: function() {
    let direction = Math.floor(Math.random() * 2);
    let row;
    let col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i += 1) {
      if (direction === 1) {
        newShipLocations.push(`${row}${col + i}`)
      } else {
        newShipLocations.push(`${row + i}${col}`)
      }
    }

    return newShipLocations;
  },
  collision: function(locations) {
    for (let i = 0; i < this.numShips; i += 1) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j += 1) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
}

let controller = {
  guesses: 0,
  processGuess: function (guess) {
    let location = this.parseGuess(guess);

    if (location) {
      this.guesses += 1;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(`You sank all my battleships, in ${this.guesses} guesses.`);
      }
    }
  },
  parseGuess: function (guess) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
      alert('Please enter a letter and a number on the board.');
    } else {
      let firstChar = guess[0];
      let row = letters.indexOf(firstChar);
      let column = guess[1];

      if (isNaN(row) || isNaN(column)) {
        alert('That coordinate is not on the board.');
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert('That coordinate is off the board.');
      } else {
        return row + column;
      }
    }
    return null;

  },

}

function init() {
  let fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;

  let guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleFireButton() {
  let guessInput = document.getElementById('guessInput');
  let guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  let fireButton = document.getElementById('fireButton');
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;
