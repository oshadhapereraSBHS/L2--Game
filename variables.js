//variables for canvas
var canvas, canvasContext;


//variables for adding images for player, enemy and background
//player
var player = new Image();
player.src = "images/spritesheet.png"

//enemy
var enemySrc = new Image();
enemySrc.src = "images/enemy.png"

//background
var background = new Image();
background.src = "images/bg.png"

var coinSrc = new Image();
coinSrc.src = "images/coin.png"

//variables for adding sounds
//sound effect for bullets
var bulletSound = document.createElement("audio")
bulletSound.src = "music/bulletsound.mp4"

//background music
var music = document.createElement("audio")
music.src = "music/music.mp4"

//game over sound effect
var gameOver = document.createElement("audio")
gameOver.src = "music/gameover.mp4"

//constants for background properties
//constants for background physical properties
const BACKGROUND_X_POS = 0;
const BACKGROUND_Y_POS = 0;
const BACKGROUND_WIDTH = 600;
const BACKGROUND_HEIGHT = 600;
//constants and variables for player properties relating to source image
const BACKGROUND_SOURCE_X_POS = 0;
const BACKGROUND_SOURCE_Y_POS = 0;
const BACKGROUND_SOURCE_WIDTH = 600;
const BACKGROUND_SOURCE_HEIGHT = 600;

//variables and constants for player properties
//constants and variables for player's physical properties
const PLAYER_HEIGHT = 90;
const PLAYER_WIDTH = 60;
var playerXpos = (600 - PLAYER_WIDTH) / 2
var playerYpos = 600 - PLAYER_HEIGHT
var playerSpeed = 5;
//constants and variables for player properties relating to source image for the generation of changing sprites
var playerSourceXpos = 0;
var playerSourceYpos = 0;
const PLAYER_SOURCE_WIDTH = 130;
const PLAYER_SOURCE_HEIGHT = 200;
//variable for player starting y position used in controlling player movement (stopping player from walking when it is jumping)
var playerStartYpos = 510

//variables and constants for enemy properties
//constants and variables for enemy's physical properties
const ENEMY_SIZE = 30;
var enemyXpos = 600;
var enemyYpos = Math.floor(Math.random() * (590 - 0) + 0)
var enemySpeed = 4;
//constants and variables for player properties relating to source image for the generation of changing sprites
const ENEMY_SOURCE_X_POS = 0;
const ENEMY_SOURCE_Y_POS = 0;
const ENEMY_SOURCE_WIDTH = 400;
const ENEMY_SOURCE_HEIGHT = 400;

//variables and constants for enemy properties
//constants and variables for enemy's physical properties
const COIN_SIZE = 20;
var coinXpos = 600;
var coinYpos = Math.floor(Math.random() * (590 - 0) + 0)
var coinSpeed = 4;
//constants and variables for player properties relating to source image for the generation of changing sprites
const COIN_SOURCE_X_POS = 0;
const COIN_SOURCE_Y_POS = 0;
const COIN_SOURCE_WIDTH = 30;
const COIN_SOURCE_HEIGHT = 30;

//variables and constants for bullet properties
var bulletStartXpos = 2 / 3;
var bulletStartYpos = 2;
const BULLET_SIZE = 5;
var bulletXpos = playerXpos + PLAYER_WIDTH * bulletStartXpos;
var bulletYpos = playerYpos + PLAYER_HEIGHT / bulletStartYpos;
var bulletSpeed = 4;

//constants for road image
const ROAD_WIDTH = 600;
const ROAD_HEIGHT = 6;
const ROAD_Y_POS = 600 - ROAD_HEIGHT;
const ROAD_X_POS = 0;

//variables for total for enemy & bullet, and whether enemy & bullet are being made - used to control how much enemies & bullets appear at the screen
var totalEnemies = 5;
var makingEnemies = true;
var totalCoins = 2;
var makingCoins = true;
var totalBullets = 10;
var makingBullets = false;

//arrays for enemy, bullets and player sprites
var enemies = [];
var bullets = [];
var sprites = [];
var coins = [];

//constant for the total number of sprites and variable for the sprite the player is currently in
const SPRITES = 4;
var spriteNum = 0;

//constants for key codes used in registering player input for movement and shooting bullets
const UP_KEY = 38;
const SPACE_KEY = 32;

//variables to reguster whether a key is pressed, based on the previously mentioned key codes
var upKeyPress = false;
var spaceKeyPress = false;

//variable for gravity for when player is moving down
var gravity = 1;

//variables for controlling speed of enemies
var maxEnemySpeed = 9;
var minEnemySpeed = 5;
var maxcoinSpeed = 9;
var mincoinSpeed = 5;

//variable for level, score, lives and username
var level = "";
var score = 0;
var lives = 3;
var username = "";

//variables for counting used and remaining bullets
var bulletCount = 0;
var bulletsRemaining = 5;

//variable for checking whether play or pause is pressed
var playGame = false;
var validUsername=true;
var gameStopped =false;
var validLevel = true;
