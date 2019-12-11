let location1 = Math.floor(Math.random() * 5);
let location2 = location1 + 1;
let location3 = location1 + 2;

let guess;
let hits = 0;
let guesses = 0;

let isSunk = false;

while (!isSunk) {
  guess = prompt('Ready, aim, fire! (enter a number from 0-6): ');

  if (guess < 0 || guess > 6) {
    alert("Please enter a valid number!");
  } else {
    guesses += 1;
  }

  if (guess == location1 || guess == location2 || guess == location3) {
    hits += 1;
    alert('Hit!');

    if (hits == 3) {
      isSunk = true;
      alert("You sunk my battleship!");
    }
  } else {
    alert('Miss!');
  } 
}

let stats = `You took ${guesses} guesses to sink the battleship, which means your accuracy was ${3 / guesses * 100}%.`
alert(stats);