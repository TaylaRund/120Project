// define Level2 state and methods
var Level2 = function(game) {
	var player;
	var platforms;
	var platform;
	var max = 500;
	var dandelion;
	var ground;

	var healthLabel;
};
Level2.prototype = {
	preload: function() {
		game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json');
		game.load.image('level2', 'assets/img/background2-01.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('dandelion', 'assets/img/dandelion.png');
	},
	create: function() {

		var background = game.add.tileSprite(0, 0, 2048, 1024, 'level2');
		game.world.setBounds(0, 0, 2048, 1024);

		var yPos = game.world.height-200;

		//function Player(game, index, sprite, velocityY, region, gravity, x, y, skyLevel) {
		player = new Player(game, 'mouse', 'mouse01', 0, 'ground', 700, game.world.width/2, game.world.height-300, 1); //why does it think the player health is 1 and not 0?
		console.log(player.position.x + ", " + player.position.y);



		player.scale.setTo(0.35, 0.35);
		game.add.existing(player);
		game.camera.follow(player);


		level = 2;
		game.stage.backgroundColor = "#aaddff"; // set background color
		var levelText = "Ground Level " + level;
		var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
		title.anchor.setTo(0.5, 0.5); // set anchor to the middle

		var platPosX = [19, 24, 19, 19, 13, 24, 25, 159, 433, 159, 433, 297, 125, 458, 208, 364, 297, 720, 859, 902, 927, 964, 1023, 1131, 1345, 1073, 1183, 1298, 1506, 1587, 1528, 1458, 1566, 1507, 1574, 1458, 1458, 1597, 1458, 1477, 1523, 1734, 1817, 1896, 1960, 2040, 2035, 2032, 2032, 2032, 2032, 2032];
		var playPosY = [882, 814, 746, 663, 583, 500, 430, 884, 894, 786, 783, 707, 701, 698, 629, 623, 554, 932, 856, 764, 653, 556, 496, 457, 460, 367, 290, 269, 921, 853, 783, 712, 634, 552, 460, 460, 287, 232, 188, 109, 60, 908, 835, 762, 762, 896, 704, 600, 496, 431, 324, 216];
		
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
