var ROWHEIGHT = 83;
var COLUMNWIDTH = 101;
var ROWOFFSET = 30;
var NUMBUGS = 5;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.init();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += dt * this.speed;
	if (this.x > 505) {
		allEnemies.delete(this);
		console.log(allEnemies);
		var enemy = new Enemy;
		allEnemies.add(enemy);
		// this.init();
	}
};

Enemy.prototype.init = function() {
	this.row = Math.floor(Math.random() * (4 - 1)) + 1;
	this.x = -101;
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
	this.speed = Math.floor(Math.random() * (200 - 50)) + 50;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
	this.row = 5;
	this.column = 2;
	this.x = COLUMNWIDTH * this.column;
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
}

Player.prototype.handleInput = function(key) {
	if (key === 'up') {
		if (this.row > 0) {
			this.row -= 1;
			if (this.row == 0) {
				this.row = 5;
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

Player.prototype.update = function() {
	this.y = ROWHEIGHT * this.row - ROWOFFSET;
	this.x = COLUMNWIDTH * this.column;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Set();
for (i = 0; i < NUMBUGS; i++) {
	allEnemies.add(new Enemy);
};
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
