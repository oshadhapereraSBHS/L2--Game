//function for moving player
function playerMove() {


  //when up key is not pressed and player is not at starting position, increase y pos by gravity (so player moves down). During this, increase gravity by 0.4 so gravity will get greater and greater. This will cause player y pos to increase in greater increments and accelerate downwards, causing a 'gravity effect'
  if (upKeyPress == false && playerYpos < canvas.height - PLAYER_HEIGHT) {
    playerYpos += gravity;
    gravity += 0.4;
  }

  //when up key is pressed and player is in canvas, move player upwards at a constant speed. Restore gravity value to 0.5 so that when the player jumps for the next time, gravity value won't keep increasing to higher values as a continuation from the previous value. Stopping the player from going out of the canvas players can't go out of the screen as a way of avoiding enemies and getting a better score / cheating.
  if (upKeyPress == true && playerYpos > 0) {
    playerYpos -= playerSpeed;
    gravity = 0.5;
  }

  //player touches the bottom of the canvas, stop moving. A greater than or equal to sign is used since an equal sign would be inefficient in cases where the player is moving fast and the if condition is missed when player is touching the bottom of the screen.
  if (playerYpos >= canvas.height - PLAYER_HEIGHT) {
    playerYpos = canvas.height - PLAYER_HEIGHT
  }

  //for loop used in going through each sprite
  for (i = 0; i < SPRITES; i++) {

    //make a multidimensional array where each element in the previously defined sprites array now has two elements in them.
    sprites[i] = new Array(2);
    //first item in each element of sprites array will contain the width of each sprite in the source image. This allow the swapping of sprites by adding that width each time as the starting x position.
    sprites[i][0] = PLAYER_SOURCE_WIDTH * i;
    //second item in each element of sprites array will be 0 since there is only one row of sprites and the starting y pos does not need to changed.
    sprites[i][1] = 0;

    //When player is jumping switch image back to Sprite 1 and maintain that sprite, so that player doesn't walk while jumping
    if (playerYpos < playerStartYpos) {
      sprites[i][0] = PLAYER_SOURCE_WIDTH;
    }
  }
} //end of function playerMove()


    function playerAnimation() {

      //constant for frame rate - this will be the rate at which the sprite is changed
      const FRAME_RATE = 0.1;

      //access the relevent element (0, 1, 2 or 3 depending on which sprite it is currently on) in the sprites array as player loops through the array. Change source x position to the source width (element 1 of each element) so that the sprite will switch to each successive sprite. Change source y position to
      playerSourceXpos = sprites[Math.floor(spriteNum)][0];
      playerSourceYpos = sprites[Math.floor(spriteNum)][1];

      //increase spriteNum by the frame rate so sprite will be changing at this rate
      spriteNum += FRAME_RATE

      //when spriteNum reaches the end of the array, take it back to the start so the sprites will keep swapping.
      if (spriteNum > 3) {
        spriteNum = 0;
      }

    } //end of function playerAnimation()
