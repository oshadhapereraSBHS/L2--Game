//increase timer by 1 every 0.5 second when player has lives remaining, and play button has been pressed (so the score won't increase when pause is pressed)
setInterval(function calculateScore() {
  if (lives > 0 && playGame == true) {
    score++
  }
}, 500)

function askUsername() {
  //variable for asking username
  var username = prompt('Enter username')
  while (username == "" || username == null) {
    var noUsername = confirm('You cannot play without a username. \nPress OK to enter username, or press cancel to leave game.')
    if (noUsername == true) {
      var username = prompt('Enter username')
    } else {
      validUsername = false;
      alert('Goodbye!');
      stopGame();
      break;
    }
  }
}

function askLevel() {
  if (validUsername) {
    var level = prompt('Hello ' + username + '. Enter level: Easy, Medium or Hard?')
    if (level != null && level != "") {
      level = level.toLowerCase();
    }

    //if condition for converting entered value to lowercase (for chacking whether valid level was entered) as long as the user entered a valid value (not null values)
    while (level == null || level == "") {

      var noLevel = confirm('You cannot play without entering a level. \nPress OK to enter level, or press cancel to leave game.')
      if (noLevel == true) {
        var level = prompt('Hello ' + username + '. Enter level: Easy, Medium or Hard?')
        if (level != null && level != "") {
          level = level.toLowerCase();
        }
      } else {
        validLevel = false;
        alert('Goodbye')
        stopGame();
        break;
      }
    }
  } else {
    stopGame();
  }
}

function setLevel() {
  if (level == "easy") {
    totalEnemies = 3;
    minEnemySpeed = 3;
    maxEnemySpeed = 5;
    totalBullets = 20;
  } else if (level == "medium") {
    totalEnemies = 5;
    minEnemySpeed = 5;
    maxEnemySpeed = 8;
    totalBullets = 15;
  } else if (level == 'hard') {
    totalEnemies = 8;
    minEnemySpeed = 8;
    maxEnemySpeed = 12;
    totalBullets = 10;
  }
}


function help() {
  //show help/intructions when help button is pressed
  document.getElementById("helpText").innerHTML = "<br />" + 'Use up arrow to jump and space bar to shoot.' + "<br />" + "<br />" + ' You have ' + totalBullets + ' bullets available.' + "<br />" + "<br />" +
    ' Hitting a comet would lower your lives by 1. ' + "<br />" + "<br />" + 'You have 3 lives and the aim is to survive for as long as possible. ' + "<br />" + "<br />" + 'You can replay the game to improve your high score.' + "<br />" +
    "<br />" + ' Press play button to start.' + "<br />"
} //end of function help()




//this function draws the status bar - the bar is composed of two rectangles, one red rectangle showing the no. of lives left, and another grey rectangle showing the no. of lives spent
function progress() {
  if (lives == 3) {
    //if lives ==3, draw a red rectangle
    colorRect((canvas.width - 100) / 2, 50, 100, 5, 'red')

  } else if (lives == 2) {
    //if lives ==2, show 2/3 of the red rectangle and 1/3 of the grey rectangle
    colorRect((canvas.width - 100) / 2, 50, 66, 5, 'red')
    colorRect((canvas.width - 100) / 2 + 66, 50, 34, 5, 'lightGrey')

  } else if (lives == 1) {
    //if lives ==1, show 1/3 of the red rectangle and 2/3 of the grey rectangle
    colorRect((canvas.width - 100) / 2, 50, 33, 5, 'red')
    colorRect((canvas.width - 100) / 2 + 33, 50, 67, 5, 'lightGrey')

  } else {
    //if lives are not left, show the grey rectangle
    colorRect((canvas.width - 100) / 2, 50, 100, 5, 'lightGrey')
  }
} //end of function progress()



//function for reloading page after endscreen
function reload() {
  //if condition for checking whether player lost
  if (lives <= 0) {
    var playAgain = confirm("Play again?") //var for storing user preference for playing again, when asking this using a confirm prompt

    if (playAgain == true) {
      lives = 3;
      score = 0;
    } else { //if player doesn't want to play again
      alert("Thank you for playing! We hope you will come back!") //thanks message
      stopGame();

    }
  }
} //end of function reload()




function stopGame() {
  gameStopped = true;
  playGame = false; //mainloop is stopped
  lives = 3 //variables are set to default values
  score = 0;
  playerXpos = (600 - PLAYER_WIDTH) / 2;
  playerYpos = 600 - PLAYER_HEIGHT;
  canvasContext.fillText('Your high score is ' + localStorage.getItem('highScore'), canvas.width * 0.24, canvas.height * 0.65); //display highscore
  document.getElementById("pauseButton").style.display = 'none' //play and pasue buttons are removed
  enemies.forEach(function(enemy, i, array) { //enemies are deleted
    delete enemies[i]
  })

}



function calculateHighScore() {
  //set var highscore to the highscore stored in local storage
  var highScore = localStorage.getItem('highScore')
  //when user achieves a new high score, update the stored high score to reflect the new one
  if (score > highScore) {
    localStorage.setItem('highScore', score)
  }
  //when highscore is null, set it to zero
  if (highScore == null) {
    localStorage.setItem('highScore', 0)
  }
} //end of function calculateHighScore()

function calculateBulletsRemaining() {
  //update no. of remaining bullets when bullets are left. Otherwise, set it to zero so that a negative value won't be displayed on the canvas
  if (bulletCount <= totalBullets) {
    bulletsRemaining = totalBullets - bulletCount;
  } else {
    bulletsRemaining = 0;
  }
} //end of function calculateBulletsRemaining()

//defining colorRect function used to draw quadrilateral shapes
function colorRect(x, y, w, h, c) {
  canvasContext.fillStyle = c;
  canvasContext.fillRect(x, y, w, h);
} //end of function colorRect()

//defining function used to draw images using properties of source and properties of the physical image shown on the canvas
function drawImg(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  canvasContext.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
} //end of function drawImg()

//event for when keys are pressed
function keyPressed(evt) {

  //make upKeyPress = true (later used in moving player) when up key is pressed (when the keycode of the up key is detected)
  if (evt.keyCode == UP_KEY) {
    upKeyPress = true;
  }

  //make spaceKeyPress = true (then used to run make bullet objects) when space key is pressed (when the keycode of the space key is detected). This will only run if playGame == true (so not when game is paused). It will also play the bullet sound effect since pressing space bar indicates the player has shot a bullet.
  if (evt.keyCode == SPACE_KEY && playGame == true) {
    spaceKeyPress = true;
    bulletSound.play();
    makeBullets();
    bulletCount++;
  }
} //end of function keyPressed()

//event for when keys are released
function keyReleased(evt) {

  //change upKeyPress and spaceKeyPress to false (so stop moving player & making bullets) when each key is released
  if (evt.keyCode == UP_KEY) {
    upKeyPress = false;
  }
  if (evt.keyCode == SPACE_KEY) {
    spaceKeyPress = false;
  }
} //end of function keyReleased(evt)


//when play button is pressed, playGame = true
function play(evt) {
  if (gameStopped == false) {
    playGame = true;
  } else {
    location.reload();
  }


} //end of function play(evt)

//when pause button is pressed, playGame = false
function pause(evt) {
  playGame = false;
} //end of function pause()

function gameStatus() {
  //when player is alive, have event listeners for clicking play, pause or help
  document.getElementById('playButton').addEventListener("click", play);
  document.getElementById('pauseButton').addEventListener("click", pause);
  document.getElementById('help').addEventListener("click", help);
  //player sprites
  drawImg(player, playerSourceXpos, playerSourceYpos, PLAYER_SOURCE_WIDTH, PLAYER_SOURCE_HEIGHT, playerXpos, playerYpos, PLAYER_WIDTH, PLAYER_HEIGHT);
  //road image
  colorRect(ROAD_X_POS, ROAD_Y_POS, ROAD_WIDTH, ROAD_HEIGHT, 'grey')
  //display score, remaining bullets, and lives on screen
  gameText();
}

function gameText() {
  canvasContext.font = '16pt Calibri';
  canvasContext.fillStyle = 'white';
  canvasContext.shadowBlur = 2; //sets shadow properties
  canvasContext.shadowColor = 'black'
  canvasContext.fillText('Score: ' + score, canvas.width * 0.02, 40);
  canvasContext.fillText('Lives: ' + lives, canvas.width * 0.45, 40);
  canvasContext.fillText('Bullets: ' + bulletsRemaining, canvas.width * 0.8, 40);
}

function endScreen() {
  canvasContext.font = '32pt Calibri'; //sets font
  canvasContext.fillStyle = 'white'; //sets font colour
  canvasContext.shadowBlur = 2; //sets shadow properties
  canvasContext.shadowColor = 'black'

  canvasContext.fillText('Game Over', canvas.width * 0.35, canvas.height * 0.45); //informs the user that they have lost
  canvasContext.fillText(username + 'Your score is ' + score, (canvas.width - username.length * 32) * 0.3, canvas.height * 0.55); //displays current score
  canvasContext.fillText('Your high score is ' + localStorage.getItem('highScore'), canvas.width * 0.24, canvas.height * 0.65); //display highscore
  setTimeout(reload, 1000); // asks user whether yhey want to play again, after 1 second of displaying endscreen
}
