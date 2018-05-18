// define Level1 state and methods
var Level1 = function(game) {
	var player;
	var platforms;
	var max = 500;
	var dandelion;

	var healthLabel;
};
Level1.prototype = {
	preload: function() {
		game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json');
		game.load.image('level1', 'assets/img/background1-01.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('dandelion', 'assets/img/dandelion.png');
	},
	create: function() {

		var background = game.add.tileSprite(0, 0, 2048, 1024, 'level1');
		game.world.setBounds(0, 0, 2048, 1024);

		var yPos = 1000;
		player = new Player(game, 'mouse', 'mouse01', 0, 'sky', 500, 300, yPos, 0); //why does it think the player health is 1 and not 0?
		//console.log("player.health: " + player.health);
		player.scale.setTo(0.5, 0.5);
		game.add.existing(player);
		game.camera.follow(player);


		level = 1;
		game.stage.backgroundColor = "#aaddff"; // set background color
		var levelText = "Ground Level " + level;
		var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
		title.anchor.setTo(0.5, 0.5); // set anchor to the middle

		platforms = game.add.group(); // create the group that will include the ledges and ground
		platforms.enableBody = true; // enable physics for the platform group
		var platform;
		for (var i = 0; i < 20; i++) {
			platform = platforms.create(Math.random()*game.world.width, Math.random()*game.world.height, 'platform'); // create and position a ledge
			platform.scale.setTo(0.5, 0.5); // scale
			platform.body.immovable = true; // don't move
		}

		var totalDandelions = 10;
		dandelion = new Array(totalDandelions);
		var xLoc, yLoc;
		for (var i = 0; i < totalDandelions; i++) {
			xLoc = game.rnd.integerInRange(64,game.width-64);
         	yLoc = game.rnd.integerInRange(64,game.width-64);
         	dandelion[i] = new Dandelion(game, 'dandelion', .5, xLoc, yLoc, player);
         	game.add.existing(dandelion[i]);
		}

		var healthText = "Health: " + player.health;
		healthLabel = game.add.text(20, 20, healthText, {fontSize: '24px', fill: '#fff'});
		healthLabel.fixedToCamera = true;

	},
	update: function() {

		//collidables:
		var hitPlatform = game.physics.arcade.collide(player, platforms); // add collision between the player and platform group
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
			game.state.start('SkyLevel');
		}

		//collectables:
		//dandelions
		game.physics.arcade.overlap(player, dandelion, collideDandelion, null, this);


		//HOW TO INTEGRATE INTO PREFABS?
		//accessory functions
		function collideDandelion (player, dandelion) {
			dandelion.collidePlayer();
			player.health += 1;
			healthLabel.setText("Health: " + player.health);
			dandelion.kill();
		}


	}

}

