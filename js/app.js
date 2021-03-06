//game tile values
var tileWidth = 101;
var tileHeight = 83;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
    return this;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//allows update without letting player over the borders of map
Player.prototype.update = function(dt) {
    if (this.collide() === true) {
            console.log("Reset!");
            this.reset();
    } 

    if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 400) {
            this.x = 400;
        } else if (this.y < 100) {
            this.y = 100;
            console.log("You win!");
            this.reset(); //moves player to back to beginning
        } else if (this.y < 0) {
            this.y = 0;
        } else if (this.y > 400) {
            this.y = 400;
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//handles keyboard input for player movement
Player.prototype.handleInput = function(key) {
    switch (key) {
            case 'left': 
                this.x = this.x - tileWidth;
                break;
            case 'up':
                this.y = this.y - tileHeight;
                break;
            case 'right':
                this.x = this.x + tileWidth;
                break;
            case 'down':
                this.y = this.y + tileHeight;
                break;
        }
};

//collision function working now
Player.prototype.collide = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x > allEnemies[i].x - 75 &&
            this.x < allEnemies[i].x + 75 &&
            this.y > allEnemies[i].y - 50 &&
            this.y < allEnemies[i].y + 50) {
            console.log('Reset!!');
            return true;
        }
    }
};
//moves player position to beginning
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(450, 200, 200), new Enemy(200, 300, 150), new Enemy(150, 200, 200), new Enemy(100, 100, 100)];
var player = new Player(200, 400);

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
