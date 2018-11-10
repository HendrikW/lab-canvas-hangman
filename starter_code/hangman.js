// NOTE : lodash is avaiable for you to use :-)

class HangmanGame {
	constructor() {
		// the array to choose a word from at random
		this.words = [ 'Ironhack' ];
		// our secret word for this instance of the hangman game
		this.secretWord = this.getWord();

		this.letters = []; // all the clicked letters
		this.guessedLetter = ''; // all the correctly guessed letters ( as a string, not an array )
		this.errorsLeft = 10; // errors you are still allowed
	}

	// returns upper case version of a random word from our words array ( check out ._sample() from lodash :-) )
	getWord() {
		var random = _.sample(this.words);
		return random;
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
			if (letter === this.letters[i]) {
				return false;
			}
    }
    return true;
	}

	// this takes the POSITION in the secret word as the parameter !
	addCorrectLetter(position) {
		var letter = this.secretWord[position];
		this.letters.push(letter);
    this.guessedLetter += letter.toUpperCase();
    if (this.guessedLetter == this.secretWord) {
      return "You won the game";
    }
	}
	// 1. push to the clicked letters
	// 2. add the letter to the guessedLetter string (uppercase!)
	// 3. alert the user if they won the game !

	addWrongLetter(letter) {
    this.letters.push(letter);
    this.errorsLeft-= 1; 
    if (this.errorsLeft === 0){
      return "You lost the game"
    }
		// 1. push to the clicked letters
		// 2. substract from the number of errors the user is still allowed to make
		// 3. alert the user if they lost the game !
	}

	// check if the user lost the game
	checkGameOver() {
		if (this.errorsLeft > 10 || this.errorsLeft !== 0){
      return false;
    } else {
      return true;
    }

    }
  
	
	// check if the user won the game
	checkWinner() {
    if (this.secretWord.length === this.guessedLetter.length)  {
      return true;
    } else {
      return false;
    }

		/* TODO : this is a bit complicated because the game designer decided to store the guessedLetter as a string, but you will manage :-) */
	}
}
