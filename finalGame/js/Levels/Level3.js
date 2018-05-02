// define Level3 state and methods
var Level3 = function(game) {
};
Level3.prototype = {
	preload: function() {

	},
	create: function() {
    level = 3;
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
