function Location(num, coordinate) {
  this[num] = coordinate;
  this.hit = false;
}

function Ship(lengthOfShip) {
  this.guess;
  this.hits = 0;
  this.guesses = 0;
  this.isSunk = false;
  this.locations = [];

  let randomLoc = Math.floor(Math.random() * 5);
  
  for (let i = 1; i <= lengthOfShip; i += 1) {
    this.locations.push(new Location(i, randomLoc + i))
  }

}

let ship = new Ship(3);

while (!ship.isSunk) {
  guess = prompt('Ready, aim, fire! (enter a number from 0-6): ');

  if (guess < 0 || guess > 6) {
    alert("Please enter a valid number!");
  } else {
    ship.guesses += 1;
  }

  let guessLocation;
  let guessHit;

  for (i = 1; i < ship.locations.length + 1; i += 1) {
    if (ship.locations[i - 1][i] == +guess) {
      guessLocation = ship.locations[i - 1][i];
      guessHit = ship.locations[i - 1].hit;
    }
    if (guessLocation != undefined) {
      break;
    }
  }

  if (!guessHit && guess == guessLocation) {
    alert('Hit!');
    ship.hits += 1;
    guessHit = true;

    if (ship.hits == 3) {
      ship.isSunk = true;
      alert("You sunk my battleship!");
    }
  } else if (guessHit && guess == guessLocation) {
    alert('You already guessed that coordinate!');
  } else {
    alert('Miss!');
  }
}

let stats = `You took ${ship.guesses} guesses to sink the battleship, which means your accuracy was ${3 / ship.guesses * 100}%.`
alert(stats);