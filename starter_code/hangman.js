// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
  constructor() {

    // the array to choose a word from at random
    this.words = ['Ironhack']
    // our secret word for this instance of the hangman game
    this.secretWord = this.getWord()

    this.letters = []         // all the clicked letters
    this.guessedLetter = ''   // all the correctly guessed letters ( as a string, not an array )
    this.errorsLeft = 10      // errors you are still allowed
  }

  // returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
  getWord() {
     return _.upperCase(_.sample(this.words))
  }
    
  checkIfLetter(keyCode) { /* TODO, see the table on https://keycode.info/ */ 
  return (keyCode >= 65 && keyCode <=90);

  }
  checkClickedLetters(letter) { 
  if (this.letters.includes(letter)){
      return false;
  }
  else {
    this.letters.push(letter)
    return true;
  }
}

  // this takes the POSITION in the secret word as the parameter !
  addCorrectLetter(index) {
    this.letters.push(this.secretWord[index])
    this.guessedLetter += this.secretWord[index].toUpperCase()
  
    //alert('You won the game

    // 1. push to the clicked letters
    // 2. add the letter to the guessedLetter string (uppercase!)
    // 3. alert the user if they won the game !
  }
  addWrongLetter(letter) {
    this.letters.push(letter)
    this.errorsLeft--
    if (this.errorsLeft === 0){
      return alert('You lost the game!')}
    // 1. push to the clicked letters
    // 2. substract from the number of errors the user is still allowed to make
    // 3. alert the user if they lost the game !
  }

  // check if the user lost the game
  checkGameOver() { 
  if (this.errorsLeft===0){
      return true;
  }
  else {
    return false;
  }
 }
  // check if the user won the game
  checkWinner() { /* TODO : this is a bit complicated because the game designer decided to store the guessedLetter as a string, but you will manage :-) */ 
  if (this.secretWord.length === this.guessedLetter.length){
    return true;
  }
  else {
    return false;
  }
  }

}