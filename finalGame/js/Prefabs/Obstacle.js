
// Player prefab constructor function
function Obstacle(game, key, frame, scale, myX, myY) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, myX, myY, key, frame);

	// add custom properties
	this.anchor.set(0.5);
	this.scale.x = this.scale.y = scale;

	// put some physics on it
	game.physics.enable(this);
	//this.body.collideWorldBounds = true;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (PlayerTEMP)
Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

// override Phaser.Sprite update (to spin the diamond)
Obstacle.prototype.update = function() {

}

