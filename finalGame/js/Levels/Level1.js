//globals
var player;

// define Level1 state and methods
var Level1 = function(game) {
};
Level1.prototype = {
	preload: function() {
		game.load.path = './assets/img';

		//temporaries
		game.load.image('tempBkg', '/temp/sky_1.png');
		game.load.atlas('atlas', '/temp/atlas.png', '/temp/atlas.json');
	},

	create: function() {
	    level = 1;
	    game.stage.backgroundColor = "#aaddff"; // set background color

	    //set up background and world
	    var bkg = game.add.image(0, 0, 'tempBkg');
	    bkg.scale.y = 1;
	    bkg.scale.x = game.width/bkg.width;

	    //set world bounds to background size
	    game.world.setBounds(0, 0, bkg.width, bkg.height);

	    //text
	    var levelText = "Ground Level " + level;
	    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
	    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
		
	    //player
	    player = new PlayerTEMP(game, 'atlas', 'diamond', 1, 0); //PlayerTEMP prefab with scale 1 and rotation 0 -- uses WASD movement
	    game.add.existing(player);
	    console.log("WASD movement for Lvl1 TEMP player")

	    //make camera follow player
	    game.camera.follow(player);
	},


	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
			game.state.start('SkyLevel');
		}


	}
}
