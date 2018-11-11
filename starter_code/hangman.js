// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
  constructor() {
    // the array to choose a word from at random
    this.words = ["Ironhack", "Hangmangame", "Kaffeekanne", "Tassenregal", "Foolishness"];
    // our secret word for this instance of the hangman game
    this.secretWord = this.getWord();
    this.wordArray = this.secretWord.split("");  // Axel: macht aus secretWord ein Array, um später Buchstaben zu vergleichen;
    console.log(this.wordArray);
    this.letters = []; // all the clicked letters
    this.guessedLetter = []; // all the correctly guessed letters ( as a string, not an array )
    this.errorsLeft = 4; // errors you are still allowed
  }

  // returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
  getWord() {
    return _.sample(this.words).toUpperCase();
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) {
      //this.letters.push(keyCode.key);
      //this.letters.push(keyCode);
      return true;
    } else return false;
    /* TODO, see the table on https://keycode.info/ */
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  // this takes the POSITION in the secret word as the parameter !
  addCorrectLetter(i) {
    var correctLetter = this.wordArray[i];
    this.letters.push(correctLetter);
    this.guessedLetter.push(correctLetter.toUpperCase());
  }

  // 1. push to the clicked letters
  // 2. add the letter to the guessedLetter string (uppercase!)
  // 3. alert the user if they won the game !

  addWrongLetter(letter) {
    this.errorsLeft = this.errorsLeft - 1;
    this.letters.push(letter);
  }

  //this.checkGameOver();

  // 1. push to the clicked letters
  // 2. substract from the number of errors the user is still allowed to make
  // 3. alert the user if they lost the game !

  // check if the user lost the game
  checkGameOver() {
    if ((this.errorsLeft = 0)) {
      alert("You Lost");
      return true;
    } else {
      return true;
    }
  }

  // check if the user won the game
  checkWinner() {
    //var secretArray = string.split(",");
    /* TODO : this is a bit complicated because the game designer decided to store the guessedLetter as a string, but you will manage :-) */
  }
}
