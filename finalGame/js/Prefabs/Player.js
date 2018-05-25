// PLAYER PREFAB
// Player prefab constructor function
function Player(game, index, sprite, velocityY, region, gravity, x, y, skyLevel) {
	//console.log(this.health);
	// this.game = game;
	// this.index = index;
	// this.sprite = sprite;
	// this.velocityY = velocityY;
	this.region = region;
	// this.gravity = gravity;
	// this.x = x;

	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, index, sprite); // call sprite constuctor

	// add custom properties
	this.anchor.set(0.5);

	// put some physics on it
	game.physics.arcade.enable(this);

	//this.enableBody = true;
	this.body.gravity.y = gravity;
	this.body.bounce.y = 0.2;
	this.body.collideWorldBounds = true;
	this.body.velocity.x = 0;
	this.body.velocity.y = velocityY;
	this.position.x = x;
	this.position.y = y

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

	if (this.region == 'sky'){
		enableDandelionMovement();
		//console.log("sky level");
	}
	if (this.region == 'ground'){
		enableGroundMovement();
	}

	//check for collisions:
	//game.physics.arcade.overlap(this, dandelion, collideDandelion, null, this);


	//dandelions
	//mentos
	//clouds
	//rain
	//meteors



	//accessory functions:
	// function collect() {
	// 	this.body.position.y -= 150;
	// }

	function enableDandelionMovement(){
		if (player.body.position.y > 10) {
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				if (player.body.velocity.y > -100 )
					player.body.velocity.y += -10;
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				if (player.body.velocity.x > -100 )
					player.body.velocity.x += -5;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				if (player.body.velocity.x < 100 )
					player.body.velocity.x += 5;
			}
		}

	}

	function enableGroundMovement(){
		player.body.velocity.x = 0;
		//if (player.body.position.y > 10) { //if player has not collided with the top of the game

			if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				player.body.velocity.y = 150;
			} else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down) {
				player.body.velocity.y = -400;
			} else {
				// this.body.velocity.y = 0;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				player.animations.play('walk');
				player.body.velocity.x = 150;
			} else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

				player.animations.play('walk');
				player.body.velocity.x = -150;
			} else {
				player.animations.play('still');
			}

		//} else { //when the player hits the top...

		//}
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
