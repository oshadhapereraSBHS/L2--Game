  //when page is loading set canvas properties
  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //set cursor to username field so user doesn't have to specifically click on it
    document.getElementById("username").focus();

    //show exit button
    displayExit = true;
    showExit();

    //hide levels page and game canvas
    document.getElementById("canvas1").style.display = "none";
    document.getElementById("levelCanvas").style.display = "none";

    //run mainloop
    setInterval(mainloop, 1000 / 50);
  } //end of function

  //mainloop that continuously runs every 50 seconds
  function mainloop() {
    //show exit button
    showExit();
    //background image
    drawImg(background, BACKGROUND_SOURCE_X_POS, BACKGROUND_SOURCE_Y_POS, BACKGROUND_SOURCE_WIDTH, BACKGROUND_SOURCE_HEIGHT, BACKGROUND_X_POS, BACKGROUND_Y_POS, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    //pause music when pause button is pressed
    music.pause();

    //if player is alive, carry out relevant function
    if (lives > 0) {
      actionsWhenLivesLeft();
      //if play button is pressed, carry out relevant functions
      if (playGame == true) {
        actionsWhenGamePlaying();
      }
    } else {
      //if player is dead, play game over sound effect
      gameOver.play();
      //calculate high score
      calculateHighScore();
      endScreen();
    } //end of function mainloop()

  }
