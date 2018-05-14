// PLAYER PREFAB
// Player prefab constructor function
function Player(game, index, sprite, velocityX, region, max, gravity) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.width/2, game.height, index, sprite); // call sprite constuctor
	// add custom properties
	this.anchor.set(0.5);
	// put some physics on it
	this.max = max;
	game.physics.arcade.enable(this);
	this.body.gravity.y = 130;

	this.body.collideWorldBounds = true;
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	// this.body.gravity = 10; // set the gravity
	this.animations.add('walk', Phaser.Animation.generateFrameNames(index, 'mouse', 1, 6, '', 2), 12, true); // movement
	this.animations.add('still', Phaser.Animation.generateFrameNames(index,'mouse', 2, '', 2), 1, true); // still
// 	this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'U', 17, 20, '', 2), 15, true); // up
// 	this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'D', 21, 24, '', 2), 15, true); // down

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
// override Phaser.Sprite update (to spin the diamond)
Player.prototype.update = function() {
	// MOVEMENT


	//TEMPORARY: HOW TO MAKE MOVEMENT SPECIFIC TO ONLY THE SKYLEVEL?
	if (this.body.position.y > 10) {
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			if (player.body.velocity.y > -100 )
				player.body.velocity.y += -10;
		}

		//should you be able to control downward motion? 

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			if (player.body.velocity.x > -100 )
				player.body.velocity.x += -5;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			if (player.body.velocity.x < 100 )
				player.body.velocity.x += 5;
		}
 


		// game.physics.arcade.overlap(player, fuel, collect, null, this);
	 //    function collect() {
	 //    	if (this.body.velocity.y > -100)

	 //      		this.body.velocity.y += -5;
	 //    }

	 //    if (this.body.velocity.y > -100){
		// 	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		// 		this.body.velocity.y += 5;
		// 	} else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		// 		this.body.velocity.y += -20;
		// 		// this.body.gravity += 100
		// 	} else {
		// 		this.body.velocity.y = 0;
		// 	}
		// }
		// if (Math.abs(this.body.velocity.x) < 100 ) {

		// 	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		// 		this.animations.play('walk');
		// 		this.body.velocity.x += 5;
		// 	} else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

		// 		this.animations.play('walk');
		// 		this.body.velocity.x += -5;
		// 	} else {
		// 		this.animations.play('still');
		// 	}
		// }
	} else {

		//tween to the ground:
		var fall = game.add.tween(this).to({ y: game.height }, 3000, Phaser.Easing.Linear.None, true, 0);
		fall.onComplete.add(nextStage, this);
	

		function nextStage(){
			// if (this.region == 'sky') {
			// 	if (level == 5) { // move on to next state
			// 		game.state.start('End');
			// 	} else if (level == 4) { // move on to next state
			// 		game.state.start('Level5');
			// 	} else if (level == 3) { // move on to next state
			// 		game.state.start('Level4');
			// 	} else if (level == 2) { // move on to next state
			// 		game.state.start('Level3');
			// 	} else if (level == 1) { // move on to next state
			// 		game.state.start('Level2');
			// 	}
			// } else {
			// 	game.state.start('SkyLevel');
			// }

			game.state.start('End');
		}


	}
	//ANIMATE
	// if (this.velocity.x < 0) { // moving left
	// 	// if (this.velocity.y > 0) { // moving down
	// 	// 	this.animations.play(sprite + 'D'); // mirror of moving down animation
	// 	// } else if (this.velocity.y < 0) { // moving up
	// 	// 	this.animations.play(sprite + 'U'); // mirror of moving up animation
	// 	// } else { // moving horizontally
	// 		this.animations.play(walk); // mirror of moving right animation
	// 	// }
	// } else if (this.velocity.x > 0) { // moving right
	// 	// if (this.velocity.y > 0) { // moving down
	// 	// 	this.animations.play(sprite + 'D'); // down animation
	// 	// } else if (this.velocity.y < 0) { // moving up
	// 	// 	this.animations.play(sprite + 'U'); // up animation
	// 	// } else { // moving horizontally
	// 		this.animations.play(walk); // right animation
	// 	// }
	// } else { // standing still
	// 	this.animations.play(walk); // standing still animation
	// }
}
// var Player = function(game, sprite, grav, level) {
// 	// call Sprite constructor within this object
// 	Phaser.Sprite.call(this, game, game.width/2, game.height/2, sprite); // call sprite constuctor
// 	game.physics.enable(this, Phaser.Physics.ARCADE);	// enable physics
// 	this.anchor.set(0.5);	// set anchor to center
// 	this.body.velocity.x = 20;	// set x speed
// 	this.body.velocity.y = 0; // set y speed
// 	this.body.gravity = grav; // set the gravity
// 	this.body.coollideWorldBounds = true; // keep player in-world
// 	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'S', 1, 8, '', 2), 15, true); // standing still
// 	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'M', 9, 16, '', 2), 15, true); // movement sideways
// 	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'U', 17, 20, '', 2), 15, true); // up
// 	// this.animations.add('', Phaser.Animation.generateFrameNames(sprite + 'D', 21, 24, '', 2), 15, true); // down
// 	this.newPlayer = true;	// custom property to permit new creation
// };
// // inherit prototype from Phaser.Sprite and set constructor to Player
// Player.prototype = Object.create(Phaser.Sprite.prototype); // create a new object with prototype/properties
// Player.prototype.constructor = Player; // set constuctor
// Player.prototype.update = function() { // override update function
// 	// MOVEMENT
// 	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) { // if the up arrow is down
// 		this.body.velocity.y = -350; // incease upward velocity
// 		console.log(this.body.velocity.y);
// 	} else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.level == 'sky') { // if the down arrow is down and in a sky level
// 		this.body.velocity.y = 350; // decrease upward velocity
// 	}
// 	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // if the right arrow is down
// 		this.body.velocity.x = 100; // increase x velocity
// 	} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // if the left arrow is down
// 		this.body.velocity.x = -100; // decrease x velocity
// 	}
// 	// ANIMATE
// 	// if (this.velocity.x < 0) { // moving left
// 	// 	if (this.velocity.y > 0) { // moving down
// 	// 		this.animations.play(sprite + 'D'); // mirror of moving down animation
// 	// 	} else if (this.velocity.y < 0) { // moving up
// 	// 		this.animations.play(sprite + 'U'); // mirror of moving up animation
// 	// 	} else { // moving horizontally
// 	// 		this.animations.play(sprite + 'M'); // mirror of moving right animation
// 	// 	}
// 	// } else if (this.velocity.x > 0) { // moving right
// 	// 	if (this.velocity.y > 0) { // moving down
// 	// 		this.animations.play(sprite + 'D'); // down animation
// 	// 	} else if (this.velocity.y < 0) { // moving up
// 	// 		this.animations.play(sprite + 'U'); // up animation
// 	// 	} else { // moving horizontally
// 	// 		this.animations.play(sprite + 'M'); // right animation
// 	// 	}
// 	// } else { // standing still
// 	// 	this.animations.play(sprite + 'S'); // standing still animation
// 	// }
// }
