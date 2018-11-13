// NOTE: jQuery is available for you to use :-)


class HangmanCanvas {
  constructor(secretWord) {
    this.secretWord = secretWord
    this.canvas = $('#hangman')[0]
    this.ctx = this.canvas.getContext('2d');
  }


  createBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.linewidth = 5
    // TODO: set line width for the canvas 2d context
  }

  drawLines() {
    let x = 410;
    let y = 600;
    let lineLength = 50;
    for (let i = 0; i < this.secretWord.length; i++) {
      var newX = x +i*60;
      this.ctx.beginPath();
      this.ctx.moveTo(newX,y);
      this.ctx.lineTo(newX+lineLength,y);
      this.ctx.stroke();
    }
  }

  writeCorrectLetter(index) {
    var letter = this.secretWord[index]
    this.ctx.font = '48px serif';
    this.ctx.fillStyle = 'blue';
    // TODO
    console.log("-- wrote letter " + this.secretWord[index] + " at index " + index + " --")
  }

  writeWrongLetter(letter, errorsLeft) {
    let lineSeparation = 70;
    this.ctx.font = '48px serif';
    this.ctx.fillStyle = 'red';
    // TODO
    console.log("-- wrote letter " + letter + " as a wrong letter --")
  }

  drawTriangle() {
    // console.log(this)
    this.ctx.beginPath();
    this.ctx.moveTo(150, 550); //top
    this.ctx.lineTo(200, 600); //right bottom
    this.ctx.lineTo(100, 600); //left bottom
    this.ctx.lineTo(150, 550); //top
    this.ctx.stroke();
    return this
  }

  drawPole() {
    // console.log('pole')
    this.ctx.beginPath();
    this.ctx.moveTo(150,550);
    this.ctx.lineTo(150,50);
    this.ctx.lineTo(350,50)
    this.ctx.lineTo(350,150-50)
    this.ctx.stroke();
    return this
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
    return this
  }
  // 4. 
  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(350,200);
    this.ctx.lineTo(350,400);
    this.ctx.stroke();
    return this
  }
  // 5. 
  drawArms() {
    this.ctx.beginPath();
    this.ctx.moveTo(250,350);
    this.ctx.lineTo(350,250);
    this.ctx.lineTo(450,350);
    this.ctx.stroke();
    return this
  }
  // 6. 
  drawLegs() {
    this.ctx.beginPath();
    this.ctx.moveTo(250,550);
    this.ctx.lineTo(350,400);
    this.ctx.lineTo(450,550);
    this.ctx.stroke();
    return this
  }

  drawHangman() {    
    this.drawTriangle().drawPole().drawHead().drawBody().drawArms().drawLegs()
  }
}

// remember this is the same as $(document).ready(...)
$(function () {

  var gameStarted = false;
  var hangmanGame;
  var canvas;

  $('#start-game-button').click(function () {
    hangmanGame = new HangmanGame()
    canvas = new HangmanCanvas(hangmanGame.secretWord)
    canvas.createBoard()
    canvas.drawLines()
    canvas.drawHangman()
    console.log("--- drawn the board ---")

    // hides the start image and button
    $('#start-game-button').parent().hide()
    $('.game-logo').parent().hide()

    gameStarted = true;
  })

  document.onkeydown = function (event) {
    if (!gameStarted) return; // don't do anything if game has not started yet.
    var codeOfKey = event.keyCode; // returns a number, i.e.: 69
    var keyPressed = event.key.toUpperCase();
    console.log("--- key pressed : " + keyPressed + " ---")
    // 1. check if pressed key is a letter at all -> if no, don't proceed
    if(!hangmanGame.checkIfLetter(codeOfKey)){
      console.log("this is not a letter")
      return
    }
    // 2. check if the pressed key was tried before already -> if yes, notify the user and don't proceed
    if (!hangmanGame.checkClickedLetters(keyPressed)){
      console.log("key has already been pressed")
      return
    }
    // 3. check if the pressed key is a letter of the secret word
     
     if (hangmanGame.secretWord.includes(keyPressed)) {
        console.log("this letter is included")
        var indicies = []
        for (var i=0; i<hangmanGame.secretWord.length; i++) {
          if (hangmanGame.secretWord[i]=== keyPressed){
            indicies.push(i)
          }
        }
        console.log(indicies)
        for (var i=0; i<indicies.length; i++) {
          hangmanGame.addCorrectLetter(indicies[i])
        }

        if (hangmanGame.secretWord.includes(keyPressed)) {
          hangmanGame.addCorrectLetter(hangmanGame.secretWord.indexOf(keyPressed));
          canvas.writeCorrectLetter(hangmanGame.secretWord.indexOf(keyPressed));
          this.ctx.fillText(letter, 600, indicies[i]*60+x)
      }
      else {
          hangmanGame.addWrongLetter(keyPressed);
          canvas.writeWrongLetter(keyPressed,hangmanGame.errorsLeft);
      }
    }
    

    // -> if yes, write the letter on the correct position on the canvas and add the POSITION as a correct position to the game
    // -> (note which parameters the respective methods receive)
    // -> if no, write the letter on the canvas and add as a wrong letter to the game
    // -> (note which parameters the respective methods receive)
