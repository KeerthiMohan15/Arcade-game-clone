// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.rate = 100 + Math.floor(Math.random() * 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var startPosition = -100; // to remove magic numbers
    this.x = this.x + (dt * this.rate);
    if (this.x > canvas.width) {
        this.x = startPosition;//brings the enemy back to start position on reaching the end of board.
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x=x;
    this.y=y;
    this.initialX = x;
    this.initialY = y;
};

//Player resets and comes back to initial position on reaching the water.
Player.prototype.update = function(dt){
    if (this.y < 0) {
        this.x = this.initialX;
        this.y = this.initialY;
    }
};

//handle the keyboard input for the players
Player.prototype.handleInput = function(key){
        switch (key) {
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 303) {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 303) {
                this.x += 101;
            }
    }
};

Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// //Collision detection and reset
Player.prototype.reset = function(){
        this.x = this.initialX;
        this.y = this.initialY;
};

    //Check for collision between enemy and player
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x + 65
                &&(allEnemies[i].x + 70) >= (player.x)
                &&(allEnemies[i].y) <= player.y + 35
                &&(allEnemies[i].y + 35) >= (player.y)) {
            player.reset();
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50,65), new Enemy(120,145), new Enemy(280,225)];
var player = new Player(200,375);



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