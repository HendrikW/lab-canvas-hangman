// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
  constructor() {
    // the array to choose a word from at random
    this.words = ["Peterpan"];
    // our secret word for this instance of the hangman game
    this.secretWord = this.getWord();

    this.letters = []; // all the clicked letters
    this.guessedLetter = ""; // all the correctly guessed letters ( as a string, not an array )
    this.errorsLeft = 6; // errors you are still allowed
  }

  // returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
  getWord() {
    return this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
  }

  checkIfLetter(keyCode) {
    if (keyCode > 64 && keyCode < 91) {
      return true;
    } else {
      return false;
    }
  }

  checkClickedLetters(letter) {
    
    for (var i = 0; i < this.letters.length; i++) {
      if (this.letters[i] === letter) {
        return false;
      }
    }
    return true;
  }

  addCorrectLetter(position) {
       // 1. push to the clicked letters
    this.letters.push(this.secretWord[position]);

    // 2. add the letter to the guessedLetter string (uppercase!)
    this.guessedLetter = this.guessedLetter + this.secretWord[position].toUpperCase();

    // 3. alert the user if they won the game !
    if (this.checkWinner()){
      alert ("You won")
  }
}
  
  
  addWrongLetter(letter) {
    // 1. push to the clicked letters
    this.letters.push(letter);

    // 2. substract from the number of errors the user is still allowed to make
    this.errorsLeft = this.errorsLeft - 1;
    
    // 3. alert the user if they lost the game !
    if (this.checkGameOver()){
      alert ("You lost")
    }
  }


  // check if the user lost the game
  checkGameOver() {
   if (this.errorsLeft === 0){
     return true
    }
    else {return false}
  }

  // check if the user won the game
  checkWinner() {
    if (this.guessedLetter.length===this.secretWord.length && this.guessedLetter.split("").sort().join() == this.secretWord.split("").sort().join())
    {
      return true
    }
    else {
      return false
    }
    /* TODO : this is a bit complicated because the game designer decided to store the guessedLetter as a string, but you will manage :-) */
  }
}
