//function for making enemy objects
function makeEnemies() {
    //defining enemy properties. enemyPos and enemySpeed are randomised for each enemy will come from a different place with a different speed to make the game more interesting and dynamic. enemyYpos is calculated to make the enemies come from the left side of the screen without going out of the screen - hence why the enmy size and road heigh is subtracted from the canvas height
    const ENEMY_SIZE = 55;
    var enemyPos = Math.floor(Math.random() * 4) + 1;
    var enemyXpos = canvas.width;
    var enemyYpos = ((canvas.height - ROAD_HEIGHT - ENEMY_SIZE) / 4) * enemyPos;
    var enemySpeed = Math.floor(Math.random() * (maxEnemySpeed - minEnemySpeed) + minEnemySpeed);

    //making an object for each enemy and using previously defined properties in the enemy object
    var enemy = {
        enemyXpos: enemyXpos,
        enemyYpos: enemyYpos,
        ENEMY_SIZE: ENEMY_SIZE,
        enemySpeed: enemySpeed
    };

    //pushing each enemy object into enemies array
    enemies.push(enemy);

} //end of function makeEnemies()


function enemyMove() {
    //access each element in enemies array
    enemies.forEach(function(enemy, i, array) {
        //increase enemy x pos by enemy speed so they will move left on the screen
        enemy.enemyXpos -= enemy.enemySpeed;

        //when enemy goes out the canvas, move it back to starting position, and randomise its y position and speed
        if (enemy.enemyXpos < 0 - ENEMY_SIZE) {
            enemy.enemyXpos = canvas.width;
            enemy.enemyYpos = Math.floor(Math.random() * ((canvas.height - ENEMY_SIZE - ROAD_HEIGHT) - 0) + 0);
            enemy.enemySpeed = Math.floor(Math.random() * (maxEnemySpeed - minEnemySpeed) + minEnemySpeed);
        }

        //when enemy is touching player, (so overlapping either horizontally or vertically) move it back to starting position, and randmise its y position and speed
        if (enemy.enemyXpos < playerXpos + PLAYER_WIDTH && enemy.enemyXpos + enemy.ENEMY_SIZE >
            playerXpos && enemy.enemyYpos < playerYpos + PLAYER_HEIGHT && enemy.enemyYpos + enemy
            .ENEMY_SIZE > playerYpos) {
            enemy.enemyXpos = canvas.width;
            enemy.enemyYpos = Math.floor(Math.random() * ((canvas.height - ENEMY_SIZE - ROAD_HEIGHT) - 0) + 0);
            enemy.enemySpeed = Math.floor(Math.random() * (maxEnemySpeed - minEnemySpeed) + minEnemySpeed);
            lives--;
        }
    });
} //end of function enemyMove()


//function for drawing enemy images by using the syntax defined in drawImg function - source, sprite X position, sprite Y position, sprite width, sprite height, source x position, source y position, source width, source player
function drawEnemies() {
    enemies.forEach(function(enemy, i) {
        drawImg(enemySrc, 0, 0, 400, 400, enemy.enemyXpos, enemy.enemyYpos, enemy.ENEMY_SIZE, enemy.ENEMY_SIZE);
    });
} //end of function drawEnemies()


function makeEnemiesIfAllowed() {
    //for loop that makes enemies by running makeEnemies() function only if the number of enemies on the screen is less than the totalEnemies variable. If the number of enemies on screen is bigger than the defined limit, the code will not make any further enemies. So the number of total enemies can be controlled by adjusting the totalEnemies variable.
    if (makingEnemies == true) {
        for (i = 0; i < totalEnemies; i++) {
            makeEnemies();
        }
        makingEnemies = false;
    }
} //end of function makeEnemiesIfAllowed()
