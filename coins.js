//function for making coin objects
function makeCoins() {
    //defining coin properties. coinPos and coinSpeed are randomised for each coin will come from a different place with a different speed to make the game more interesting and dynamic. coinYpos is calculated to make the coins come from the left side of the screen without going out of the screen - hence why the enmy size and road heigh is subtracted from the canvas height
    const COIN_SIZE = 15;
    var coinPos = Math.floor(Math.random() * 4) + 1;
    var coinXpos = canvas.width;
    var coinYpos = ((canvas.height - ROAD_HEIGHT - COIN_SIZE) / 4) * coinPos;
    var coinSpeed = Math.floor(Math.random() * (maxcoinSpeed - mincoinSpeed) + mincoinSpeed);

    //making an object for each coin and using previously defined properties in the coin object
    var coin = {
        coinXpos: coinXpos,
        coinYpos: coinYpos,
        COIN_SIZE: COIN_SIZE,
        coinSpeed: coinSpeed
    };

    //pushing each coin object into coins array
    coins.push(coin);

} //end of function makecoins()


function coinMove() {
    //access each element in coins array
    coins.forEach(function(coin, i, array) {
        //increase coin x pos by coin speed so they will move left on the screen
        coin.coinXpos -= coin.coinSpeed;

        //when coin goes out the canvas, move it back to starting position, and randomise its y position and speed
        if (coin.coinXpos < 0 - COIN_SIZE) {
            coin.coinXpos = canvas.width;
            coin.coinYpos = Math.floor(Math.random() * ((canvas.height - COIN_SIZE - ROAD_HEIGHT) - 0) + 0);
            coin.coinSpeed = Math.floor(Math.random() * (maxcoinSpeed - mincoinSpeed) + mincoinSpeed);
        }

        //when coin is touching player, (so overlapping either horizontally or vertically) move it back to starting position, and randmise its y position and speed
        if (coin.coinXpos < playerXpos + PLAYER_WIDTH && coin.coinXpos + coin.COIN_SIZE >
            playerXpos && coin.coinYpos < playerYpos + PLAYER_HEIGHT && coin.coinYpos + coin
            .COIN_SIZE > playerYpos) {
            coin.coinXpos = canvas.width;
            coin.coinYpos = Math.floor(Math.random() * ((canvas.height - COIN_SIZE - ROAD_HEIGHT) - 0) + 0);
            coin.coinSpeed = Math.floor(Math.random() * (maxcoinSpeed - mincoinSpeed) + mincoinSpeed);
            totalBullets = totalBullets + 5;
        }
    });
} //end of function coinMove()


//function for making coin objects
function makeCoinsIfAllowed() {
    if (makingCoins == true) {
        //a for loop is used to carry out the makeCoins() function so that it will loop through coin objects and only make coin objects if the are less coin objects on the canvas than what is defined by the totalCoins variable (i.e. it will only have 2 coins on canvas at any given time when totalCoins = 2)
        for (i = 0; i < totalCoins; i++) {
            makeCoins();
        }
        makingCoins = false;
    }
} //end of function makeCoinsIfAllowed()

//function for drawing coin images by using the syntax defined in drawImg function - source, sprite X position, sprite Y position, sprite width, sprite height, source x position, source y position, source width, source player
function drawCoins() {
    coins.forEach(function(coin, i) {
        drawImg(coinSrc, 0, 0, 570, 572, coin.coinXpos, coin.coinYpos, coin.COIN_SIZE, coin.COIN_SIZE);
    });
} //end of function drawcoins()
