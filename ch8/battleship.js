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
  ships: [{ locations: ['10', '20', '30'], hits: ['', '', ''] },
          { locations: ['32', '33', '34'], hits: ['', '', ''] },
          { locations: ['63', '64', '65'], hits: ['', '', 'hit'] }],
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
}







