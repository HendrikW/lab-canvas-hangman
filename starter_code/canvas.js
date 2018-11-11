// NOTE: jQuery is available for you to use :-)

class HangmanCanvas {
  constructor(secretWord) {
    this.secretWord = secretWord;
    this.canvas = $("#hangman")[0];
    this.ctx = this.canvas.getContext("2d");
  }

  createBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 5;
  }

  drawLines() {
    let x = 410;
    let y = 600;
    let lineLength = 50;
    for (let i = 0; i < this.secretWord.length; i++) {
      this.ctx.beginPath();

      //DONE
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + lineLength, y);
      this.ctx.stroke();
      x += 70;
    }
  }

  writeCorrectLetter(index) {
    var letter = this.secretWord[index];
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "blue";

    //DONE
    this.ctx.fillText(letter, 410 + index * 75, 600);

    console.log(
      "-- wrote letter " + this.secretWord[index] + " at index " + index + " --"
    );
  }

  writeWrongLetter(letter, errorsLeft) {
    let lineSeparation = 70;
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";

    //DONE
    this.ctx.fillText(letter, 1200 - errorsLeft * lineSeparation, 200);

    console.log("-- wrote letter " + letter + " as a wrong letter --");
  }

  drawTriangle() {
    // console.log(this)
    this.ctx.beginPath();
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
    // TODO
    this.ctx.moveTo(150, 550); //top
    this.ctx.lineTo(150, 60);
    this.ctx.lineTo(350, 60);
    this.ctx.lineTo(350, 100); //top
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

  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(350, 200);
    this.ctx.lineTo(350, 350);
    this.ctx.stroke();
    return this;
  }

  drawArms() {
    this.ctx.beginPath();
    //TODO
    this.ctx.moveTo(350, 280);
    this.ctx.lineTo(450, 250);
    this.ctx.moveTo(350, 280);
    this.ctx.lineTo(250, 250);
    this.ctx.stroke();
    return this;
  }

  drawLegs() {
    this.ctx.beginPath();
    //TODO
    this.ctx.moveTo(350, 350);
    this.ctx.lineTo(250, 450);
    this.ctx.moveTo(350, 350);
    this.ctx.lineTo(450, 450);
    this.ctx.stroke();
    return this;
  }

  drawHangman() {
    this.drawTriangle()
      .drawPole()
      .drawHead()
      .drawBody()
      .drawArms()
      .drawLegs();
  }
}

// remember this is the same as $(document).ready(...)
$(function() {
  var gameStarted = false;
  var hangmanGame;
  var canvas;

  $("#start-game-button").click(function() {
    hangmanGame = new HangmanGame();
    canvas = new HangmanCanvas(hangmanGame.secretWord);
    canvas.createBoard();
    canvas.drawLines();
    //canvas.drawHangman();
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
    console.log("--- key pressed : " + keyPressed + " ---");

    if (hangmanGame.checkIfLetter(codeOfKey)) {
      if (hangmanGame.checkClickedLetters(keyPressed) === false) {
        alert("You have tried this letter before");
      } else {
        if (hangmanGame.secretWord.indexOf(keyPressed) === -1) {
          canvas.writeWrongLetter(keyPressed, hangmanGame.errorsLeft);
          hangmanGame.addWrongLetter(keyPressed);
          if (hangmanGame.errorsLeft === 5) {
            canvas.drawTriangle();
          }

          if (hangmanGame.errorsLeft === 4) {
            canvas.drawPole();
          }

          if (hangmanGame.errorsLeft === 3) {
            canvas.drawHead();
          }

          if (hangmanGame.errorsLeft === 2) {
            canvas.drawBody();
          }

          if (hangmanGame.errorsLeft === 1) {
            canvas.drawArms();
          }
          if (hangmanGame.errorsLeft === 0) {
            canvas.drawLegs();
          }
        } else {
          for (i = 0; i < hangmanGame.secretWord.length; i++) {
            if (hangmanGame.secretWord[i] === keyPressed) {
              canvas.writeCorrectLetter(i);
              hangmanGame.addCorrectLetter(i);
            }
          }
        }
      }
    }
  };
});
