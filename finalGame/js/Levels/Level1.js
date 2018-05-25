// define Level1 state and methods
var Level1 = function(game) {
	var player;
	var platforms;
	var platform;
	var max = 500;
	var dandelion;
	var ground;

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

		var yPos = game.world.height-200;

		//function Player(game, index, sprite, velocityY, region, gravity, x, y, skyLevel) {
		player = new Player(game, 'mouse', 'mouse01', 0, 'ground', 750, game.world.width/2, game.world.height-300, 1); //why does it think the player health is 1 and not 0?
		console.log(player.position.x + ", " + player.position.y);



		player.scale.setTo(0.35, 0.35);
		game.add.existing(player);
		game.camera.follow(player);


		level = 1;
		game.stage.backgroundColor = "#aaddff"; // set background color
		var levelText = "Ground Level " + level;
		var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
		title.anchor.setTo(0.5, 0.5); // set anchor to the middle


		//PLATFORMS
		// platforms = game.add.group(); // create the group that will include the ledges and ground
		// platforms.enableBody = true; // enable physics for the platform group
		// var platform;
		// for (var i = 0; i < 20; i++) {
		// 	platform = platforms.create(Math.random()*game.world.width, Math.random()*game.world.height, 'platform'); // create and position a ledge
		// 	platform.scale.setTo(0.5, 0.5); // scale
		// 	platform.body.immovable = true; // don't move
		// }

		var platPosX = [64, 19, 24, 19, 19, 13, 84, 24, 113, 197, 250, 310, 36, 283, 358, 364, 633, 720, 674, 762, 633, 711, 627, 711, 576, 445, 349, 760, 615, 785, 664, 598, 881, 985, 445, 760, 634, 717, 822, 1378, 1515, 1294, 1495, 1409, 1331, 1481, 1437, 2040, 2041, 2035, 2032, 2032, 2032, 2032];
		var playPosY = [935, 882, 814, 746, 663, 573, 496, 457, 430, 377, 377, 377, 365, 296, 163, 86, 933, 876, 812, 734, 701, 630, 598, 535, 516, 470, 467, 458, 433, 381, 361, 293, 279, 269, 231, 232, 228, 202, 159, 892, 880, 878, 838, 796, 765, 752, 727, 896, 793, 704, 600, 545, 450, 345];

		console.log("player.width = " + player.body.width);
		platforms = game.add.group(); // create the group that will include the ledges and ground
	 	platforms.enableBody = true; // enable physics for the platform group
		for (var i = 0; i < platPosX.length; i++) {
			platform = platforms.create(platPosX[i], playPosY[i], 'platform'); // create and position a ledge
			platform.scale.setTo(0.25, 0.25); // scale
			platform.body.immovable = true; // don't move
			console.log("platform.width = " + platform.width);

		}

		//ground
		ground = platforms.create(0, game.world.height-50, 'platform');
		ground.scale.setTo(game.world.width, 5);
		ground.body.immovable = true; // don't move

		//DANDELIONS
		var totalDandelions = 10;
		dandelion = new Array(totalDandelions);
		var xLoc, yLoc;
		for (var i = 0; i < totalDandelions; i++) {
			xLoc = game.rnd.integerInRange(64,game.width-64);
         	yLoc = game.rnd.integerInRange(64,game.width-64);
         	dandelion[i] = new Dandelion(game, 'dandelion', .5, xLoc, yLoc, player);
         	dandelion[i].scale.setTo(.25, .25);
         	game.add.existing(dandelion[i]);
		}

		var healthText = "Health: " + player.health;
		healthLabel = game.add.text(20, 20, healthText, {fontSize: '24px', fill: '#fff'});
		healthLabel.fixedToCamera = true;

	},
	update: function() {

		//collidables:
		if (player.body.velocity.y > 0) {
			var hitPlatform = game.physics.arcade.collide(player, platforms, debug, null, this); // add collision between the player and platform group
		}
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

		function debug(player, platform){
			//console.log(player.body.position.x);
		}


	},

	render: function(){
		game.debug.spriteBounds(player);
    	// game.debug.spriteInfo(player, 32, 32);
    	game.debug.spriteBounds(ground);

	}

}
