var ROWHEIGHT = 83;
var COLUMNWIDTH = 101;
var ROWOFFSET = 30;
var NUMBUGS = 5;

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
	this.init();
};

// Gives an enemy bug its starting position and speed
Enemy.prototype.init = function() {
	this.row = Math.floor(Math.random() * (4 - 1)) + 1;
	this.x = -101;
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
	this.speed = Math.floor(Math.random() * (200 - 50)) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers, and also added an element to increase
	// the bug speed as the player's score increases.
	this.x += dt * this.speed * (1 + (0.1 * player.score));
	
	if (this.x > 505) {
		allEnemies.delete(this);
		allEnemies.add(new Enemy());
	}
	
	// If player collides with a bug the player loses a life
	// and is sent back to the starting position.
	if (this.collisionDetection(player, this)) {
		player.lives--;
		player.startPos();
	}
};

// Checks for collision between bug and player
Enemy.prototype.collisionDetection = function(object, enemy) {
	return (object.row == enemy.row && object.x > enemy.x - 80 &&
			object.x < enemy.x + 80);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class attributes
var Player = function() {
    this.sprite = 'images/char-boy.png';
	this.init();
	this.x = COLUMNWIDTH * this.column;
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
};

Player.prototype.startPos = function(){
	this.row = 5;
	this.column = 2;
};

Player.prototype.init = function(){
	this.lives = 3;
	this.score = 0;
	this.startPos();
};

// Player's keyboard control
Player.prototype.handleInput = function(key) {
	if (key === 'up') {
		if (this.row > 0) {
			this.row -= 1;
			// When the player reaches the water they get
			// reset to the starting position and a point.
			if (this.row === 0) {
				this.startPos();
				this.score++;
			}
		}
	} else if (key === 'down') {
		if (this.row < 5) {
			this.row += 1;
		}
	} else if (key === 'left') {
		if (this.column > 0) {
			this.column -= 1;
		}
	} else if (key === 'right') {
		if (this.column < 4) {
			this.column += 1;
		}
	}
};

// Updates player position by multiplying the row and column
// by the row height and column width, respectively.
Player.prototype.update = function() {
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
	this.x = COLUMNWIDTH * this.column;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Put enemies in a set because of functionality I'm hoping to 
// build later.
var allEnemies = new Set();
for (var i = 0; i < NUMBUGS; i++) {
	allEnemies.add(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
