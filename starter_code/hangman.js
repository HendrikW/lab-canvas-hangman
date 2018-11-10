// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
  constructor() {
    // the array to choose a word from at random
    this.words = ["Ironhack"];
    // our secret word for this instance of the hangman game
    this.secretWord = this.getWord();

    this.letters = []; // all the clicked letters
    this.guessedLetter = ""; // all the correctly guessed letters ( as a string, not an array )
    this.errorsLeft = 10; // errors you are still allowed
  }

  // returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
  getWord() {
    return _.sample(this.words);
  }

  /* TODO, see the table on https://keycode.info/ */
  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) return true;
    else {
      return false;
    }
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  // this takes the POSITION in the secret word as the parameter !
  // 1. push to the clicked letters
  // 2. add the letter to the guessedLetter string (uppercase!)
  // 3. alert the user if they won the game !

  addCorrectLetter(index) {
    this.letters.push(this.secretWord[index]);
    this.guessedLetter += this.secretWord[index].toUpperCase();
    if (this.guessedLetter.length === this.secretWord.length) {
      alert("You won!");
    }
  }

  addWrongLetter(letter) {
    // 1. push to the clicked letters
    // 2. substract from the number of errors the user is still allowed to make
    // 3. alert the user if they lost the game !
    this.letters.push(letter);
    this.errorsLeft -= 1;
  }

  // check if the user lost the game
  checkGameOver() {
    var gameover = this.guessedLetter;

    if (this.errorsLeft == 0) {
      return true;
    } else {
      return false;
    }
  }

  // check if the user won the game /* TODO : this is a bit complicated because the game designer decided to store the guessedLetter as a string, but you will manage :-) */
  checkWinner() {
    var winner = this.guessedLetter;
    if (this.secretWord === this.guessedLetter) {
      return false;
    } else {
      return true;
    }
  }
}

// bonus iteration
