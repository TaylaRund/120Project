// define Level2 state and methods
var Level2 = function(game) {
	var platforms;
};
Level2.prototype = {
	preload: function() {
		game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json');
		game.load.image('level2', 'assets/img/background2-01.png');
	},
	create: function() {
		var platPosX = [19, 24, 19, 19, 13, 24, 25, 159, 433, 159, 433, 297, 125, 458, 208, 364, 297, 720, 859, 902, 927, 964, 1023, 1131, 1345, 1073, 1183, 1298, 1506, 1587, 1528, 1458, 1566, 1507, 1574, 1458, 1458, 1597, 1458, 1477, 1523, 1734, 1817, 1896, 1960, 2040, 2035, 2032, 2032, 2032, 2032, 2032];
		var playPosY = [882, 814, 746, 663, 583, 500, 430, 884, 894, 786, 783, 707, 701, 698, 629, 623, 554, 932, 856, 764, 653, 556, 496, 457, 460, 367, 290, 269, 921, 853, 783, 712, 634, 552, 460, 460, 287, 232, 188, 109, 60, 908, 835, 762, 762, 896, 704, 600, 496, 431, 324, 216];
		level = 2;
    var levelText = "Ground Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle

		// (game, sprite, grav, level)
		var background = game.add.tileSprite(0, 0, 2048, 1024, 'level2');
    game.world.setBounds(0, 0, 2048, 1024);
		var yPos = game.world.height-80;
		player = new Player(game, 'mouse', 'mouseR00', 0, 'ground', 500, 700, yPos);
		// player.body.setSize(player.width/2, player.height, 0, 0);
		player.scale.setTo(0.35, 0.35);
		game.add.existing(player);

		game.camera.follow(player);

		platforms = game.add.group(); // create the group that will include the ledges and ground
	  platforms.enableBody = true; // enable physics for the platform group
		var platform;
		for (var i = 0; i < platPosX.length; i++) {
			platform = platforms.create(platPosX[i], playPosY[i], 'platform'); // create and position a ledge
			platform.scale.setTo(0.25, 0.25); // scale
			platform.anchor.setTo(0.5, 0);
			platform.body.immovable = true; // don't move
		}
		platform = platforms.create(0, game.world.height-50, 'platform');
		platform.scale.setTo(game.world.width, 5);
		platform.body.immovable = true; // don't move

		dandelions = game.add.group();
		dandelions.enableBody = true; // enable physics for the platform group
		var dandelion;
		for (var i = 0; i < 10; i++) {
			dandelion = dandelions.create(Math.random()*game.world.width, Math.random()*game.world.height, 'dandelion'); // create and position a ledge
			dandelion.scale.setTo(0.25, 0.25);
		}
	},
	update: function() {
		game.physics.arcade.overlap(player, dandelions, collect, null, this);
		var hitPlatform
		if (player.body.velocity.y > 0) {
			var hitPlatform = game.physics.arcade.collide(player, platforms); // add collision between the player and platform group
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
			game.state.start('SkyLevel');
		}

		function collect (player, dandelion) {
			dandelion.kill();
		}
	}
}
