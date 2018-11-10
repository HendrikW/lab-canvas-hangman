// NOTE: jQuery is available for you to use :-)

class HangmanCanvas {
  constructor(secretWord, wordArray, guessedLetter) {
    this.secretWord = secretWord;
    this.wordArray = wordArray;
    this.guessedLetter = guessedLetter;
    //this.canvasArray = this.secretWord.split("");
    this.canvas = $("#hangman")[0];
    this.ctx = this.canvas.getContext("2d");
  }

  createBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // TODO: set line width for the canvas 2d context
  }

  drawLines() {
    let x = 310;
    let y = 600;
    let lineLength = 50;
    for (let i = 0; i < this.secretWord.length; i++) {
      this.ctx.beginPath();
      x = x + 60;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + lineLength, y);
      this.ctx.stroke();
    }
  }

  writeCorrectLetter(index) {
    var letter = this.wordArray[index];
    this.ctx.font = "48px Futura";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(letter.toUpperCase(), 380 + index * 60, 600);
    console.log(
      "-- wrote letter " + this.wordArray[index] + " at index " + index + " --"
    );
  }

  writeWrongLetter(letter, errorsLeft) {
    let lineSeparation = 70;
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    // TODO
    console.log("-- wrote letter " + letter + " as a wrong letter --");
  }

  drawTriangle() {
    console.log("triangle");
    this.ctx.beginPath();
    this.ctx.moveTo(150, 550); //top
    this.ctx.lineTo(200, 600); //right bottom
    this.ctx.lineTo(100, 600); //left bottom
    this.ctx.lineTo(150, 550); //top
    this.ctx.fill();
    return this;
  }

  drawPole() {
    console.log("pole");
    this.ctx.beginPath();
    this.ctx.moveTo(150, 550);
    this.ctx.lineTo(150, 50);
    this.ctx.stroke();
    return this;
  }

  drawBar() {
    console.log("bar");
    this.ctx.beginPath();
    this.ctx.moveTo(150, 50); // top left
    this.ctx.lineTo(350, 50); // top righ
    this.ctx.lineTo(350, 100); // rope
    this.ctx.stroke();
    return this;
  }

  drawHead() {
    console.log("head");
    this.ctx.beginPath();
    var x = 350; // x coordinate
    var y = 150; // y coordinate
    var radius = 50; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    this.ctx.arc(x, y, radius, startAngle, endAngle, true);
    this.ctx.fill();
    return this;
  }

  drawBody() {
    console.log("body");
    this.ctx.beginPath();
    this.ctx.moveTo(350, 200); // start body
    this.ctx.lineTo(350, 400); // end body
    this.ctx.stroke();
    return this;
  }
  // 5.
  drawArms() {
    console.log("arms");
    this.ctx.beginPath();
    this.ctx.moveTo(350, 220); // start arms
    this.ctx.lineTo(250, 240); // end left arm
    this.ctx.moveTo(350, 220); // start arms
    this.ctx.lineTo(450, 240); // end righ arm
    this.ctx.stroke();
    return this;
  }
  // 6.
  drawLegs() {
    console.log("legs");
    this.ctx.beginPath();
    this.ctx.moveTo(350, 400); // start legs
    this.ctx.lineTo(250, 500); // left leg
    this.ctx.moveTo(350, 400); // start legs
    this.ctx.lineTo(450, 500); // right leg
    this.ctx.stroke();
    return this;
  }

  drawHangman() {
    this.drawTriangle()
      .drawPole()
      .drawBar()
      .drawHead()
      .drawBody()
      .drawArms()
      .drawLegs();
    console.log("Hangman complete");
  }
}

// remember this is the same as $(document).ready(...)
$(function() {
  var gameStarted = false;
  var hangmanGame;
  var canvas;

  $("#start-game-button").click(function() {
    hangmanGame = new HangmanGame();
    canvas = new HangmanCanvas(
      hangmanGame.secretWord,
      hangmanGame.wordArray,
      hangmanGame.guessedLetter,
    );
    canvas.createBoard();
    canvas.drawLines();
    canvas.drawHangman();
    console.log("--- drawn the board ---");

    // hides the start image and button
    $("#start-game-button")
      .parent()
      .hide();
    $(".game-logo")
      .parent()
      .hide();

    gameStarted = true;
  });

  document.onkeydown = function(event) {
    if (!gameStarted) return; // don't do anything if game has not started yet.
    var codeOfKey = event.keyCode; // returns a number, i.e.: 69
    var keyPressed = event.key.toUpperCase();
    if (hangmanGame.checkIfLetter(codeOfKey) === true) {
      console.log("--- key pressed : " + keyPressed + " ---");
    }
    if (hangmanGame.checkClickedLetters(keyPressed) === false) {
      alert("Den Buchstaben hast du schon gedrückt!!!");
    } else {
      if (hangmanGame.wordArray.includes(keyPressed)) {
        canvas.wordArray.forEach(function(letter, index) {
          if (letter === keyPressed) {
            canvas.writeCorrectLetter(index);
          }
        });
        if (canvas.wordArray.lenght === canvas.guessedLetter.length){
          alert("Du hast gewonnen!!!")
        }
        console.log("--- Correct letter : " + keyPressed + " ---");
        console.log("--- List of correct letters : " + canvas.guessedLetter + " ---");
      }
    }

    // 1. check if pressed key is a letter at all -> if no, don't proceed
    // 2. check if the pressed key was tried before already -> if yes, notify the user and don't proceed

    // 3. check if the pressed key is a letter of the secret word
    // -> if yes, write the letter on the correct position on the canvas and add the POSITION as a correct position to the game
    // -> (note which parameters the respective methods receive)
    // -> if no, write the letter on the canvas and add as a wrong letter to the game
    // -> (note which parameters the respective methods receive)
  };
});
