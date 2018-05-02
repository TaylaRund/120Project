// Balloon creation using code from Paddle Parkour by Nathan shown in lecture
var Balloon = function(game, speed, color) {
	// call Sprite constructor within this object
	Phaser.Sprite.call(this, game, game.width, game.rnd.integerInRange(2*game.height/3, game.height-64), 'atlas', 'balloon');
	game.physics.enable(this, Phaser.Physics.ARCADE);	// enable physics
	this.anchor.set(0.5);	// set anchor to center
	this.tint = color; // set tint color
	this.body.immovable = true;	// make immovable
	this.body.velocity.x = speed;	// set speed
	this.newBalloon = true;	// custom property to permit new creation
};
// inherit prototype from Phaser.Sprite and set constructor to Balloon
// the Object.create method creates a new object w/ the specified prototype object and properties
Balloon.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Balloon.prototype.constructor = Balloon;

// override the Phaser.Sprite update function
Balloon.prototype.update = function() {
  var interval = Math.random(); // add some randomness to balloon creation
	if(this.newBalloon && this.x < game.width/2 && interval < 0.05) {
		this.newBalloon = false;
		GamePlay.prototype.addBalloon(this.parent, this.tint);
	}
	// kill the balloon if it reaches the left edge of the screen
	if(this.x < -this.width) {
		this.kill();
	}
}
