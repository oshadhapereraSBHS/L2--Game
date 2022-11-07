//function for making bullet objects
function makeBullets() {

  //defining bullet properties. x and y positions are dependent on player position because bullets are coming from the player
  const BULLET_SIZE = 5;
  var bulletXpos = playerXpos + PLAYER_WIDTH * bulletStartXpos;
  var bulletYpos = playerYpos + PLAYER_HEIGHT / bulletStartYpos;
  var bulletSpeed = 4;

  //making an object for each bullet and using previously defined properties in the bullet object
  var bullet = {
    bulletXpos: bulletXpos,
    bulletYpos: bulletYpos,
    BULLET_SIZE: BULLET_SIZE,
    bulletSpeed: bulletSpeed,
    bulletColor: 'green'
  }

  //pushing each bullet object into bullets array
  bullets.push(bullet)
} //end of function makeBullets()



    function bulletMove() {
      //access each bullet element in bullets array
      bullets.forEach(function(bullet, i, array) {
        //increase bullet x pos by bullet speed so they will move horizontally towards the right of the screen
        bullet.bulletXpos += bullet.bulletSpeed

        //if the bullets go out the canvas, delete that bullet element
        if (bulletYpos > canvas.width) {
          delete bullets[i]
        }

        //for each enemy element
        enemies.forEach(function(enemy, i, array) {

          //if enemy is touching bullet, move that enemy out of the canvas and randomise its y pos and speed. Also take bullet out of the canvas so it will be deleted
          if (enemy.enemyXpos < bullet.bulletXpos + bullet.BULLET_SIZE && enemy.enemyXpos +
            enemy.ENEMY_SIZE >
            bullet.bulletXpos && enemy.enemyYpos < bullet.bulletYpos + bullet.BULLET_SIZE &&
            enemy.enemyYpos + enemy
            .ENEMY_SIZE > bullet.bulletYpos) {
            bullet.bulletYpos = canvas.width;
            enemy.enemyXpos = canvas.width;
            enemy.enemyYpos = Math.floor(Math.random() * (canvas.height - 0) + 0);
            enemy.enemySpeed = Math.floor(Math.random() * (maxEnemySpeed - minEnemySpeed) + minEnemySpeed);
          }

        })

        //for each enemy element
        coins.forEach(function(coin, i, array) {

          //if coin is touching bullet, move that coin out of the canvas and randomise its y pos and speed. Also take bullet out of the canvas so it will be deleted
          if (coin.coinXpos < bullet.bulletXpos + bullet.BULLET_SIZE && coin.coinXpos +
            coin.COIN_SIZE >
            bullet.bulletXpos && coin.coinYpos < bullet.bulletYpos + bullet.BULLET_SIZE &&
            coin.coinYpos + coin
            .COIN_SIZE > bullet.bulletYpos) {
            bullet.bulletYpos = canvas.width;
            coin.coinXpos = canvas.width;
            coin.coinYpos = Math.floor(Math.random() * (canvas.height - 0) + 0);
            coin.coinSpeed = Math.floor(Math.random() * (maxCoinSpeed - minCoinSpeed) + minCoinSpeed);
          }

        })

        //remove undefined (e.g. deleted) enemy elements from their array. This will make it easier to count total enemy numbers and total bullet numbers.
        enemies = enemies.filter(item => item !== undefined);
        bullets = bullets.filter(item => item !== undefined);

      })


    } //end of function bulletMove()



        //function for drawing player sprites using the same syntax as above
        function drawBullets() {
          bullets.forEach(function(bullet, i) {
            colorRect(bullet.bulletXpos, bullet.bulletYpos, bullet.BULLET_SIZE, bullet.BULLET_SIZE, 'white')
          })
        } //end of function drawBullets()

        function bulletsLeft(){
          //if there are bullets left
          if (bulletCount <= totalBullets) {
            //move bullets, draw bullets images, and make bullet objects if makingBullets is true
            bulletMove();
            if (makingBullets == true) {
              makeBullets();
              makingBullets = false;
            }
            drawBullets();
          }
        }
