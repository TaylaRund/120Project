// Player prefab constructor function
function Star(game, key, scale, myX, myY, player) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, myX, myY, key);

	// add custom properties
	this.anchor.set(0.5);
	this.scale.x = this.scale.y = scale;

	// put some physics on it
	game.physics.enable(this);
	this.enableBody = true;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (PlayerTEMP)
Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor = Star;

// override Phaser.Sprite update (to spin the diamond)
Star.prototype.update = function() {
	game.world.wrap(this, 0, true);

}

//collision functions
Star.prototype.collidePlayer = function() {
	//game.world.wrap(this, 0, true);

}
