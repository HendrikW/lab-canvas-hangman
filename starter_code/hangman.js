// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
  constructor() {
    // the array to choose a word from at random
    this.words = [
      "GLENFIDDICH",
      "BALVENIE",
      "ABERFELDY",
      "ABERLOUR",
      "ARDBEG",
      "ARDMORE",
      "ARRAN",
      "AUCHENTOSHAN",
      "BALBLAIR",
      "BENRIACH",
      "BENROMACH",
      "BOWMORE",
      "BRUICHLADDICH",
      "BUNNAHABHAIN",
      "CRAIGELLACHIE",
      "DALWHINNIE",
      "EDRADOUR",
      "GLENALLACHIE",
      "GLENDRONACH",
      "GLENFARCLAS",
      "GLENGOYNE",
      "JURA",
      "LAGAVULIN",
      "LAPHROAIG",
      "MORTLACH",
      "SPRINGBANK",
      "TALISKER",
      "TOBERMORY",
      "TULLIBARDINE"
    ];
    // our secret word for this instance of the hangman game
    this.secretWord = this.getWord();

    this.letters = []; // all the clicked letters
    this.guessedLetter = ""; // all the correctly guessed letters ( as a string, not an array )
    this.errorsLeft = 6; // errors you are still allowed
  }

  // returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
  getWord() {
    var randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
  checkIfLetter(keyCode) {
    return keyCode > 64 && keyCode < 91;
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  // this takes the POSITION in the secret word as the parameter !
  addCorrectLetter(position) {
    this.letters.push(this.secretWord[position]);
    this.guessedLetter += this.secretWord[position].toUpperCase();
    // console.log(this.guessedLetter);
    if (this.checkWinner()) {
      alert("Sláinte, you're a real whisky expert!");
      $("#new-game-button")
        .parent()
        .show();
    }
  }

  addWrongLetter(letter) {
    this.letters.push(letter);
    this.errorsLeft--;
    // console.log(this.letters);
    if (this.checkGameOver()) {
      alert("Shit happens, try again!");
      $("#new-game-button")
        .parent()
        .show();
    }
  }

  // check if the user lost the game
  checkGameOver() {
    return this.errorsLeft == 0;
  }
  // check if the user won the game
  checkWinner() {
    return this.guessedLetter.length == this.secretWord.length;
  }
}
