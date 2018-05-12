//SIMPLE player prefab used for testing camera movement

// Player prefab constructor function
function PlayerTEMP(game, key, frame, scale, rotation) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(64,game.width-64), game.rnd.integerInRange(64,game.height-61), key, frame);

	// add custom properties
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;

	// put some physics on it
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.angularVelocity = game.rnd.integerInRange(-180,180);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (PlayerTEMP)
PlayerTEMP.prototype = Object.create(Phaser.Sprite.prototype);
PlayerTEMP.prototype.constructor = PlayerTEMP;

// override Phaser.Sprite update (to spin the diamond)
PlayerTEMP.prototype.update = function() {
	//rotation
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.body.angularVelocity += 5;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.body.angularVelocity -= 5;
	}

	//WASD movement
	var speed = 5;
	if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		this.body.velocity.y -= speed;
	}	
	if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
		this.body.velocity.y += speed;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		this.body.velocity.x -= speed;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		this.body.velocity.x += speed;
	}


}

