// define Level3 state and methods
var Level3 = function(game) {
	var player;
	var platforms;
	var platform;
	var max = 500;
	var dandelion;
	var ground;

	var healthLabel;
};
Level3.prototype = {
	preload: function() {
		game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json');
		game.load.image('level3', 'assets/img/background3-01.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('dandelion', 'assets/img/dandelion.png');
	},
	create: function() {

		var background = game.add.tileSprite(0, 0, 2048, 1024, 'level3');
		game.world.setBounds(0, 0, 2048, 1024);

		var yPos = game.world.height-200;

		//function Player(game, index, sprite, velocityY, region, gravity, x, y, skyLevel) {
		player = new Player(game, 'mouse', 'mouse01', 0, 'ground', 700, game.world.width/2, game.world.height-300, 1); //why does it think the player health is 1 and not 0?
		console.log(player.position.x + ", " + player.position.y);



		player.scale.setTo(0.35, 0.35);
		game.add.existing(player);
		game.camera.follow(player);


		level = 3;
		game.stage.backgroundColor = "#aaddff"; // set background color
		var levelText = "Ground Level " + level;
		var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
		title.anchor.setTo(0.5, 0.5); // set anchor to the middle

		var platPosX = [19, 19, 13, 24, 24, 25, 19, 193, 381, 297, 230, 220, 135, 1010, 902, 1095, 973, 1091, 1182, 1253, 1485, 1370, 1387, 1507, 1621, 1742, 1566, 1742, 1852, 1861, 1633, 1566, 1896, 1734, 2020, 2035, 2011, 2032, 2032, 2032];
		var playPosY = [746, 663, 580, 490, 400, 320, 240, 910, 829, 832, 812, 727, 725, 897, 838, 795, 715, 704, 663, 558, 713, 664, 503, 503, 553, 576, 634, 670, 698, 780, 801, 853, 862, 908, 735, 623, 533, 431, 324, 216];
		
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
    	game.debug.spriteBounds(ground);

	}

}
