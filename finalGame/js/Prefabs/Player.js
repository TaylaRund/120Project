// PLAYER PREFAB
var Player = function(game, atlas, sprite, xVel, yVel, grav, level) {
	// call Sprite constructor within this object
	Phaser.Sprite.call(this, game, game.width, game.rnd.integerInRange(2*game.height/3, game.height-64), atlas, sprite); // call sprite constuctor
	game.physics.enable(this, Phaser.Physics.ARCADE);	// enable physics
	this.anchor.set(0.5);	// set anchor to center
	this.body.immovable = true;	// make immovable
	this.body.velocity.x = xVel;	// set x speed
	this.body.velocity.y = yVel; // set y speed
	this.body.gravity = grav; // set the gravity
	this.body.coollideWorldBounds = true; // keep player in-world
	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'S', 1, 8, '', 2), 15, true); // standing still
	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'M', 9, 16, '', 2), 15, true); // movement sideways
	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'U', 17, 20, '', 2), 15, true); // up
	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'D', 21, 24, '', 2), 15, true); // down
	this.newPlayer = true;	// custom property to permit new creation
};
// inherit prototype from Phaser.Sprite and set constructor to Player
Player.prototype = Object.create(Phaser.Sprite.prototype); // create a new object with prototype/properties
Player.prototype.constructor = Player; // set constuctor
Player.prototype.update = function() { // override update function
	// MOVEMENT
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) { // if the up arrow is down
		this.velocity.y = -350; // incease upward velocity
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.level = 'sky') { // if the down arrow is down and in a sky level
		this.velocity.y = 350; // decrease upward velocity
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // if the right arrow is down
		this.velocity.x = 100; // increase x velocity
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // if the left arrow is down
		this.velocity.x = -100; // decrease x velocity
	}
	// ANIMATE
	// if (this.velocity.x < 0) { // moving left
	// 	if (this.velocity.y > 0) { // moving down
	// 		this.animations.play(sprite + 'D'); // mirror of moving down animation
	// 	} else if (this.velocity.y < 0) { // moving up
	// 		this.animations.play(sprite + 'U'); // mirror of moving up animation
	// 	} else { // moving horizontally
	// 		this.animations.play(sprite + 'M'); // mirror of moving right animation
	// 	}
	// } else if (this.velocity.x > 0) { // moving right
	// 	if (this.velocity.y > 0) { // moving down
	// 		this.animations.play(sprite + 'D'); // down animation
	// 	} else if (this.velocity.y < 0) { // moving up
	// 		this.animations.play(sprite + 'U'); // up animation
	// 	} else { // moving horizontally
	// 		this.animations.play(sprite + 'M'); // right animation
	// 	}
	// } else { // standing still
	// 	this.animations.play(sprite + 'S'); // standing still animation
	// }
}
