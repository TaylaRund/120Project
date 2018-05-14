// define Level1 state and methods
var Level1 = function(game) {
	var player;
	var max = 500;
};
Level1.prototype = {
	preload: function() {
		game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json')
		// load an atlas with a sprite
	},
	create: function() {
		// (game, sprite, grav, level)
		player = new Player(game, 'mouse', 'mouse01', game.world.height, 'sky', 500, 1000);
		game.add.existing(player);

    level = 1;
    game.stage.backgroundColor = "#aaddff"; // set background color
    var levelText = "Ground Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle

	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
			game.state.start('SkyLevel');
		}
	}
}
