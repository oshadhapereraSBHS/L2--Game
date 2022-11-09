//increase timer by 1 every 0.5 second when player has lives remaining, and play button has been pressed (so the score won't increase when pause is pressed)
setInterval(function calculateScore() {
    if (lives > 0 && playGame == true) {
        score++;
    }
}, 500); //end of function calculateScore()

function help() {
    //show help/intructions when help button is pressed
    document.getElementById("helpText").innerHTML = "<br />" + 'Use up arrow to jump and space bar to shoot.' + "<br />" + "<br />" + ' You have ' + totalBullets + ' bullets available, and you will get 5 extra bullets for every coin you collect.' + "<br />" + "<br />" +
        ' Hitting a comet would lower your lives by 1. ' + "<br />" + "<br />" + 'You have 3 lives and the aim is to survive for as long as possible. ' + "<br />" + "<br />" + 'You can replay the game to improve your high score.' + "<br />" +
        "<br />" + ' Press play button to start.' + "<br />";
} //end of function help()

//function carrying out things to de done when player is alive
function actionsWhenLivesLeft() {
    //function for calculating game status (e.g. score and bullets left), and adding event listeners for clicking buttons
    gameStatus();
    //drawing status bar
    progress();
    //drawing enemy and coin objects
    drawEnemies();
    drawCoins();
    //making enemy and coin objects
    makeEnemiesIfAllowed();
    makeCoinsIfAllowed();
} //end of function actionsWhenLivesLeft()

function actionsWhenGamePlaying() {
    //play background music
    music.play();
    //event listeners for pressing and releasing keys. This is not added with other event listeners because these control keys should not be available when pause is pressed
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    //run following functions in mainloop : movement of player & enemy & coin, animation of player sprites, and calculating remaining bullets
    playerMove();
    enemyMove();
    coinMove();
    playerAnimation();
    calculateBulletsRemaining();
    bulletsLeft();
} //end of function actionsWhenGamePlaying()

//this function draws the status bar - the bar is composed of two rectangles, one red rectangle showing the no. of lives left, and another grey rectangle showing the no. of lives spent
function progress() {
    if (lives == 3) {
        //if lives ==3, draw a red rectangle
        colorRect((canvas.width - 100) / 2, 50, 100, 5, 'red');

    } else if (lives == 2) {
        //if lives ==2, show 2/3 of the red rectangle and 1/3 of the grey rectangle
        colorRect((canvas.width - 100) / 2, 50, 66, 5, 'red');
        colorRect((canvas.width - 100) / 2 + 66, 50, 34, 5, 'lightGrey');

    } else if (lives == 1) {
        //if lives ==1, show 1/3 of the red rectangle and 2/3 of the grey rectangle
        colorRect((canvas.width - 100) / 2, 50, 33, 5, 'red');
        colorRect((canvas.width - 100) / 2 + 33, 50, 67, 5, 'lightGrey');

    } else {
        //if lives are not left, show the grey rectangle
        colorRect((canvas.width - 100) / 2, 50, 100, 5, 'lightGrey');
    }
} //end of function progress()



//function for reloading page after endscreen
function reload() {
    //if condition for checking whether player lost
    if (lives <= 0) {
        //if player lost, change validLevel to false - so it will ask level again
        validLevel = false;
        //var for storing user preference for playing again, when asking this using a confirm prompt
        var playAgain = confirm("Play again?");
        //if player chooses to play again, carry out game from start (without reloading page)
        if (playAgain == true) {
            playGame = false;
            replay = true;
            lives = 3;

            //asking for level
            document.getElementById("canvas1").style.display = "none";
            document.getElementById("levelCanvas").style.display = "grid";

        } else { //if player doesn't want to play again
            alert("Thank you for playing! We hope you will come back!"); //thanks message
            stopGame(); //function displaying stationary game screen
        }
    }
} //end of function reload()

function setLevelProperties() {
    if (level == 1) {
        //if level is easy
        //set total enemies, enemy speeds (min and max) and total bullets to relevant values
        totalEnemies = 3;
        minEnemySpeed = 3;
        maxEnemySpeed = 5;
        totalBullets = 20;
    } else if (level == 2) {
        //if level is medium
        //set total enemies, enemy speeds (min and max) and total bullets to relevant values
        totalEnemies = 5;
        minEnemySpeed = 5;
        maxEnemySpeed = 8;
        totalBullets = 15;
    } else if (level == 3) {
        //if level is hard
        //set total enemies, enemy speeds (min and max) and total bullets to relevant values
        totalEnemies = 8;
        minEnemySpeed = 8;
        maxEnemySpeed = 12;
        totalBullets = 10;
    }
} //end of function setLevelProperties()

function submitLevel() {
    //set cursor to level button
    document.getElementById("levelButton").focus();
    var level = document.getElementById("level").value;
    playerYpos = playerYpos = canvas.height - PLAYER_HEIGHT;
    enemies.forEach(function(enemy, i, array) { //enemies are at default position
        enemy.enemyXpos = canvas.width + 10;
    });
    coins.forEach(function(coin, i, array) { //coins are at default position
        coin.coinXpos = canvas.width + 10;
    });

    //function for setting level properties
    setLevelProperties();

    //function for showing instructions
    instructions();

    //show play and pause buttons
    displayExit = false;

    //show game canvas
    document.getElementById("levelCanvas").style.display = "none";
    document.getElementById("canvas1").style.display = "block";

    //set score and lives to defualt value
    score = 0;
    lives = 3;

} //end of function setLevel()

function instructions() {
    if (replay == false) {
        //if this is not a replay of the game (i.e. user is playing for first time)
        //show instructions
        alert('You have 3 lives and the aim is to survive for as long as possible. \nUse up arrow to jump and space bar to shoot.');
        alert('Hitting a comet would lower your lives by 1. \nYou have ' + totalBullets + ' bullets availabl, and you will get 5 extra bullets every time you collect a coin.');
        alert('Press Ok, and then click play button to start.');
    }
} //end of function instructions()

function showExit() {
    //if game is at username or level entering stage, hide play/pause buttons
    if (displayExit == true) {
        document.getElementById("playButton").style.display = "none";
        document.getElementById("pauseButton").style.display = "none";
    } else {
        //if game is being played, show play and pause buttons in addition to the exit button
        document.getElementById("playButton").style.display = "inline-block";
        document.getElementById("pauseButton").style.display = "inline-block";
    }
} //end of function showExit()

function submitUsername() {
    //create variable for username and set this to the value entered in the input
    var username = document.getElementById("username").value;
    //save username to local storage
    localStorage.setItem('username', username);
    if (username == null || username == "") {
        //if username not entered, ask again
        alert("Please enter a username");
    } else {
        //when valid username entered, show level field
        document.getElementById('usernameCanvas').style.display = 'none';
        document.getElementById("levelCanvas").style.display = 'grid';
        document.getElementById("levelHeading").innerHTML = "Hello " + username + "! " + "<br />" + "Choose a level.";
    }
} //end of function submitUsername()

function exitGame() {
    //show confirm prompt when exit button pressed
    var confirmExit = confirm("Are you sure you want to exit the game?");
    //if user presses OK, then stop game
    if (confirmExit) {
        stopGame();
    }

} //end of exitGame()


function deleteData() {
    //when delete button pressed, show confirm prompt to make sure it was not pressed by mistake
    var confirmDelete = confirm("This will delete all your previous data including username and high score. Do you want to continue?");
    if (confirmDelete) {
        //if user pressed ok, clear localStorage
        localStorage.removeItem("highscore");
        localStorage.removeItem("username");
    }
} //end of function deleteData()



function stopGame() {
    music.pause();
    displayExit = false;
    gameStopped = true;
    playGame = false; //mainloop is stopped
    lives = 3; //variables are set to default values
    score = 0;
    playerXpos = (600 - PLAYER_WIDTH) / 2;
    playerYpos = 600 - PLAYER_HEIGHT;

    canvasContext.fillText('Your high score is ' + localStorage.getItem('highScore'), canvas.width * 0.24, canvas.height * 0.65); //display highscore
    document.getElementById("pauseButton").style.display = 'none'; //play and pasue buttons are removed
    enemies.forEach(function(enemy, i, array) { //enemies are deleted
        delete enemies[i];
    });
    coins.forEach(function(coin, i, array) { //enemies are deleted
        delete coins[i];
    });
    document.getElementById("usernameCanvas").style.display = "none";
    document.getElementById("levelCanvas").style.display = "none";
    document.getElementById("canvas1").style.display = "block";
    document.getElementById("playButton").style.display = "inline-block";
    document.getElementById("exitButton").style.display = "none";

} //end of function stopGame()



function calculateHighScore() {
    //set var highscore to the highscore stored in local storage
    var highScore = localStorage.getItem('highScore');
    //when user achieves a new high score, update the stored high score to reflect the new one
    if (score > highScore) {
        localStorage.setItem('highScore', score);
    }
    //when highscore is null, set it to zero
    if (highScore == null) {
        localStorage.setItem('highScore', 0);
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
    canvasContext.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
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
} //end of function keyPressed(evt)

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



function play(evt) {
    playButtonPressed = true;
    //when play button is pressed and game was not ended, start playing
    if (gameStopped == false) {
        playGame = true;
    } else {
        //if game was over, then reload page
        location.reload();
    }
} //end of function play(evt)

//when pause button is pressed, playGame = false
function pause(evt) {
    playGame = false;

} //end of function pause(evt)

function gameStatus() {
    //when player is alive, have event listeners for clicking play, pause or help
    document.getElementById('playButton').addEventListener("click", play);
    document.getElementById('pauseButton').addEventListener("click", pause);
    document.getElementById('exitButton').addEventListener("click", exitGame);
    document.getElementById('help').addEventListener("click", help);
    //player sprites
    drawImg(player, playerSourceXpos, playerSourceYpos, PLAYER_SOURCE_WIDTH, PLAYER_SOURCE_HEIGHT, playerXpos, playerYpos, PLAYER_WIDTH, PLAYER_HEIGHT);
    //road image
    colorRect(ROAD_X_POS, ROAD_Y_POS, ROAD_WIDTH, ROAD_HEIGHT, 'grey');
    //display score, remaining bullets, and lives on screen
    gameText();
} //end of function gameStatus()

function gameText() {
    //set font properties and show text on game canvas - such as score, lives, etc
    canvasContext.font = '16pt Calibri'; //font
    canvasContext.fillStyle = 'white'; //font color
    canvasContext.shadowBlur = 2; //sets shadow properties
    canvasContext.shadowColor = 'black';
    canvasContext.fillText('Score: ' + score, canvas.width * 0.02, 40); //text
    canvasContext.fillText('Lives: ' + lives, canvas.width * 0.45, 40);
    canvasContext.fillText('Bullets: ' + bulletsRemaining, canvas.width * 0.8, 40);
} //end of function gameText()

function endScreen() {
    //text for end screen
    canvasContext.font = '32pt Calibri'; //sets font
    canvasContext.fillStyle = 'white'; //sets font colour
    canvasContext.shadowBlur = 2; //sets shadow properties
    canvasContext.shadowColor = 'black';

    canvasContext.fillText('Game Over', canvas.width * 0.35, canvas.height * 0.45); //informs the user that they have lost
    canvasContext.fillText('Your score is ' + score, (canvas.width - username.length * 32) * 0.3, canvas.height * 0.55); //displays current score
    canvasContext.fillText('Your high score is ' + localStorage.getItem('highScore'), canvas.width * 0.24, canvas.height * 0.65); //display highscore
    setTimeout(reload, 1000); // asks user whether yhey want to play again, after 1 second of displaying endscreen
} //end of function endScreen()
