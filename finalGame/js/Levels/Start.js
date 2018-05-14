// define Start state and methods
var fly_M;
var Start = function(game) {
};
Start.prototype = {
	preload: function() {
		game.load.audio('music_Fly', './assets/audio/Flying_Song.wav');
	},
	create: function() {
		fly_M = game.add.audio('music_Fly');
    game.stage.backgroundColor = "#aaddff"; // set background color
    var title = game.add.text(game.world.width/2, game.world.height/2, 'Final Game', {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
			damage_S.play('', 0, .5, false);
			game.state.start('Level1');
		}
	}
}
