// NOTE: jQuery is available for you to use :-)

class HangmanCanvas {
  constructor(secretWord) {
    this.secretWord = secretWord;
    this.canvas = $("#hangman")[0];
    this.ctx = this.canvas.getContext("2d");
  }

  createBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 2.5;
  }

  drawLines() {
    let x = 410;
    let y = 600;
    let lineLength = 50;
    for (let i = 0; i < this.secretWord.length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#009CBD";
      this.ctx.moveTo(x + 60 * i, y);
      this.ctx.lineTo(x + 60 * i + lineLength, y);
      this.ctx.stroke();
    }
  }

  // writeCorrectLetter(index) {
  //   var letter = this.secretWord[index];
  //   this.ctx.font = "48px serif";
  //   this.ctx.fillStyle = "blue";
  //   console.log(
  //     "-- wrote letter " + this.secretWord[index] + " at index " + index + " --"
  //   );
  // }

  // writeWrongLetter(letter, errorsLeft) {
  //   let lineSeparation = 70;
  //   this.ctx.font = "48px serif";
  //   this.ctx.fillStyle = "red";
  //   console.log("-- wrote letter " + letter + " as a wrong letter --");
  // }

  drawTriangle() {
    // console.log(this)
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#53565A";
    this.ctx.moveTo(150, 550); //top
    this.ctx.lineTo(200, 600); //right bottom
    this.ctx.lineTo(100, 600); //left bottom
    this.ctx.lineTo(150, 550); //top
    this.ctx.stroke();
    return this;
  }

  drawPole() {
    // console.log('pole')
    this.ctx.beginPath();
    this.ctx.moveTo(150, 550);
    this.ctx.lineTo(150, 50);
    this.ctx.lineTo(350, 50);
    this.ctx.lineTo(350, 100);
    this.ctx.stroke();
    return this;
  }

  drawHead() {
    this.ctx.beginPath();
    var x = 350; // x coordinate
    var y = 150; // y coordinate
    var radius = 50; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    this.ctx.arc(x, y, radius, startAngle, endAngle, true);
    this.ctx.stroke();
    return this;
  }
  // 4.
  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(350, 200);
    this.ctx.lineTo(350, 350);
    this.ctx.stroke();
    return this;
  }
  // 5.
  drawArms() {
    this.ctx.beginPath();
    this.ctx.moveTo(350, 250);
    this.ctx.lineTo(300, 200);
    this.ctx.moveTo(350, 250);
    this.ctx.lineTo(400, 200);
    this.ctx.stroke();
    return this;
  }
  // 6.
  drawLegs() {
    this.ctx.beginPath();
    this.ctx.moveTo(350, 350);
    this.ctx.lineTo(300, 400);
    this.ctx.moveTo(350, 350);
    this.ctx.lineTo(400, 400);
    this.ctx.stroke();
    return this;
  }

  //list of wrong letters
  drawLetters(letter) {
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#C07D59";
    this.ctx.fillText(letter, 600, 110);
    return this;
  }

  //list of guessed letters
  drawGuessedLetters(letter, position) {
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#C07D59";
    this.ctx.fillText(letter, 420 + position * 60, 590);
    return this;
  }

  // drawHangman() {
  //   // this.drawTriangle()
  //   // this.drawPole()
  //   this.drawHead()
  //     .drawBody()
  //     .drawArms()
  //     .drawLegs();
  // }
}

// remember this is the same as $(document).ready(...)
$(function() {
  var gameStarted = false;
  var hangmanGame;
  var canvas;
  var wrongLetters = "";
  $("#new-game-button")
    .parent()
    .hide();

  $("#start-game-button, #new-game-button").click(function() {
    wrongLetters = "";
    hangmanGame = new HangmanGame();
    canvas = new HangmanCanvas(hangmanGame.secretWord);
    canvas.createBoard();
    canvas.drawLines();
    // canvas.drawHangman();
    console.log("--- drawn the board ---");

    // hides the start image and button
    $("#start-game-button")
      .parent()
      .hide();
    $("#new-game-button")
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
    console.log("--- key pressed : " + keyPressed + " ---");

    //check, if key is a letter
    if (hangmanGame.checkIfLetter(codeOfKey)) {
      if (hangmanGame.checkClickedLetters(keyPressed) == false) {
        alert("Letter has been clicked before");
        // if pressed key is included in the word, add it to the canvas
      } else if (hangmanGame.secretWord.includes(keyPressed)) {
        //go over all letters in the word to display letters that appear twice
        for (var i = 0; i < hangmanGame.secretWord.length; i++) {
          if (hangmanGame.secretWord[i] === keyPressed) {
            hangmanGame.addCorrectLetter(i);
            canvas.drawGuessedLetters(keyPressed, i);
          }
        }

        // if it's not included in the word, add it to the list of clicked letters (and add it to the canvas)
      } else {
        hangmanGame.addWrongLetter(keyPressed);
        wrongLetters += keyPressed;
        canvas.drawLetters(wrongLetters);
        //draw the hangman one by one (depending on the length of the wrongletters string)
        switch (wrongLetters.length) {
          case 1:
            canvas.drawTriangle();
            break;
          case 2:
            canvas.drawPole();
            break;
          case 3:
            canvas.drawHead();
            break;
          case 4:
            canvas.drawBody();
            break;
          case 5:
            canvas.drawArms();
            break;
          case 6:
            canvas.drawLegs();
            break;
        }
      }
    }
  };
});
