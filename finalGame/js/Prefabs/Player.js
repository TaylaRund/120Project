// PLAYER PREFAB
// Player prefab constructor function
function Player(game, index, sprite, velocityY, region, gravity, yPos, health) {
	console.log(this.health);
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.width/2, yPos, index, sprite); // call sprite constuctor

	// add custom properties
	this.anchor.set(0.5);

	// put some physics on it
	game.physics.arcade.enable(this);
	this.body.gravity.y = gravity;
	this.body.bounce.y = 0.2;
	this.body.collideWorldBounds = true;
	this.body.velocity.x = 0;
	this.body.velocity.y = velocityY;

	//animations
	this.animations.add('walk', Phaser.Animation.generateFrameNames(index, 'mouse', 1, 6, '', 2), 12, true); // movement
	this.animations.add('still', Phaser.Animation.generateFrameNames(index,'mouse', 2, '', 2), 1, true); // still
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (to spin the diamond)
Player.prototype.update = function() {

	// MOVEMENT
	this.body.velocity.x = 0;
	if (this.body.position.y > 10) { //if player has not collided with the top of the game
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.body.velocity.y = -350;
		} else {

		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.animations.play('walk');
			this.body.velocity.x = 150;
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

			this.animations.play('walk'); //needs to be updated
			this.body.velocity.x = -150;
		} else {
			this.animations.play('still');
		}
	} else { //when the player hits the top...

	}

	//check for collisions:
	//game.physics.arcade.overlap(this, dandelion, collideDandelion, null, this);


	//dandelions
	//mentos
	//clouds
	//rain
	//meteors



	//accessory functions:
	function collect() {
		this.body.position.y -= 150;
	}

	// function collideDandelion(null, dandelion){
	// 	console.log("here: " + this.position.x + ", " + this.position.y);
	// 	dandelion.kill();
	// }
}


//collision functions
// Player.prototype.collideDandelion = function(this, dandelion) {
// 	console.log("I AM HERE");

// 	//player.health += 1;
// 	//game.healthLabel.setText("Health: " + player.health);
// 	//dandelion.kill();
// 	//game.world.wrap(this, 0, true);

// }
