// Player prefab constructor function
function Breeze(game, key, scale, myX, myY, player) {
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
Breeze.prototype = Object.create(Phaser.Sprite.prototype);
Breeze.prototype.constructor = Breeze;

// override Phaser.Sprite update (to spin the diamond)
Breeze.prototype.update = function() {
	game.world.wrap(this, 0, true);

}

//collision functions
Breeze.prototype.collidePlayer = function() {
	//game.world.wrap(this, 0, true);

}
