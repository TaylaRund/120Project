// define SkyLevel state and methods
var fuel;
var gameOver;
var SkyLevel = function(game) {
  var level = 1;
  var max = 100*level;

  //audio
  var bounce;

};
SkyLevel.prototype = {
	preload: function() {
    game.load.atlas('mouse', 'assets/img/mouse.png', 'assets/img/mouse.json')
    game.load.path = './assets';

    //temporaries
    // game.load.image('tempBkg', '/img/temp/sky_1.png');
    // game.load.atlas('atlas', '/img/temp/atlas.png', '/img/temp/atlas.json');

    //sound preload
    game.load.audio('music_Fly', '/audio/Flying_Song.wav');
    game.load.audio('bounce', ['/audio/Bounce.wav']);
    game.load.audio('death', '/audio/Death.wav');
    game.load.audio('damage', '/audio/Take_Damage.wav');
    game.load.audio('click', '/audio/UI_Click.wav');
    game.load.audio('esc', '/audio/UI_exit.wav');
    // //sprites proload
    game.load.image('cloud', '/img/Cloud.png');
    game.load.image('sky', '/img/sky_1.png');
    game.load.image('storm_cloud', '/img/Strom_Cloud.png');
    game.load.image('PART_dandelion', '/img/Dandelion_Particle.png');
    game.load.image('breeze', '/img/breeze.png');

    // //atlas preload
    // game.load.atlas('pip_Dandelion', '/img/Pip-Dandelion.png','/img/Pip-Dandelion.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    // game.load.atlas('health_Bar', '/img/Health_Bar.png','/img/Health_Bar.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    // game.load.atlas('mentos', '/img/Mentos.png','/img/Mentos.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	},
	create: function() {


    //audio
    //bounce = game.add.audio('bounce');

    game.stage.backgroundColor = "#aaddff"; // set background color
    var levelText = "Sky Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
    console.log(level);
    gameOver = false;
    volumeMusic = .5;
    volumeSFX = .1;
    //set up background and world
    // var bkg = game.add.image(0, 0, 'tempBkg');
    // bkg.scale.y = 1;
    // bkg.scale.x = game.width/bkg.width;
    // //set world bounds to background size
    // game.world.setBounds(0, 0, bkg.width, bkg.height);
    sound
    fly_M = game.add.audio('music_Fly');
    death_S = game.add.audio('death');
    bounce_S = game.add.audio('bounce');
    damage_S = game.add.audio('damage');
    pickUp_S = game.add.audio('click');
    fly_M.play('', 0, volumeMusic, true);	// ('marker', start position, volume (0-1), loop)
    //text
    var levelText = "Sky Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
    //player
    // Player(game, index, sprite, velocityX, level, max, gravity)
    player = new Player(game, 'mouse', 'mouse01', 0, 'sky', 500, 500); //PlayerTEMP prefab with scale 1 and rotation 0 -- uses WASD movement
    player.scale.setTo(0.5, 0.5);
    // player.animations.add('Dandelion', Phaser.Animation.generateFrameNames('Pip_', 0, 10, '', 1), 0, false);
    // player.body.setSize(100, 120, 50, 150);
    game.add.existing(player);
    //make camera follow player
    game.camera.follow(player);
    //place collidables
    var totalEnemies = 5;
    this.createEnemies(totalEnemies);
    // var totalFuel = 10;
    // this.createFuel(totalFuel);
    fuel = game.add.sprite(game.world.width/2, game.world.height/2, 'breeze' );
    game.physics.arcade.enable(fuel);
    fuel.scale.setTo(0.5, 0.5);
    // Health-Bar creation --- needs to be locked to camera
    //healthBar = game.add.sprite(10, 10, 'health_Bar');
    //healthBar.scale.setTo(0.5, 0.5);
    //healthBar.animations.add('lowerHealth', Phaser.Animation.generateFrameNames('HB_', 0, 10, '', 1), 1, false);
	},
	update: function() {
    game.physics.arcade.overlap(player, fuel, collect, null, this);

    function collect(player, fuel) {
        console.log("breeeeeeze");
        player.body.velocity.y -= 180;
        fuel.kill();
        bounce.play('', 0, 1, true);


    }

    // console.log(player.body.position.y);
    game.debug.body(player);
    game.debug.body(fuel);
    //TEMPORARY COLLISION CHECKS: is it better to check for collisions in level, obstacle, fuel, or player?
    //is it also better to use collide() or overlap()?
    //collide() example
    if (game.physics.arcade.overlap(player, enemy)){
        //player.tint = 0xff2a00; //tint player instead of kill()
        damage_S.play('', 0, volumeSFX, false);	// ('marker', start position, volume (0-1), loop)
        //player.kill();
        //player.body.velocity.y -= 300;
        enemy.tint = 0x333333;
    } else {
        player.tint = 0xffffff;
    }
    //overlap() example
    if (game.physics.arcade.overlap(player, fuel, this.collectFuel, null, this)){
        //console.log("fuel collision!");
        //player.tint = 0x0800ff; //tint player instead of kill()
        //player.kill();
        //player.body.velocity.y -= 300;
    } else {
        player.tint = 0xffffff;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
  		if (level == 5) { // move on to next state
  			game.state.start('End');
  		} else if (level == 4) { // move on to next state
  			game.state.start('Level5');
  		} else if (level == 3) { // move on to next state
  			game.state.start('Level4');
  		} else if (level == 2) { // move on to next state
  			game.state.start('Level3');
  		} else if (level == 1) { // move on to next state
  			game.state.start('Level2');
      }
    }
	},
  //other functions

  createEnemies: function(totalEnemies){
      var xLoc, yLoc;
      enemy = new Array(totalEnemies);

      for (var i = 0; i<totalEnemies; i++){
          xLoc = game.rnd.integerInRange(64,game.width-64);
          yLoc = game.rnd.integerInRange(64,game.width-64);
          scale = game.rnd.realInRange(1, 3)/10;
          enemy[i] = new Obstacle(game, 'cloud', 1, xLoc, yLoc);
          game.add.existing(enemy[i]);
          enemy[i].scale.setTo(scale, scale);
          enemy[i].enableBody = true;
          enemy[i].body.velocity.x = game.rnd.integerInRange(-70, 70);
      }
  },

  createFuel: function(totalFuel){
      var xLoc, yLoc;
      fuel = new Array(totalFuel);

      for (var i = 0; i<totalFuel; i++){
          xLoc = game.rnd.integerInRange(0, game.world.width);
          yLoc = game.rnd.integerInRange(0, game.world.height);
          fuel[i] = new Obstacle(game, 'breeze', 1, xLoc, yLoc);
          fuel[i].scale.setTo(0.5, 0.5);
      // fuel[i].animations.add('mentoSpin', Phaser.Animation.generateFrameNames('m_', 4, 0, '', 1), 10, true);
      // fuel[i].animations.play('mentoSpin');
          game.add.existing(fuel[i]);
          fuel[i].enableBody = true;
      }
  },

  collectFuel: function(player, Obstacle){
    pickUp_S.play('', 0, volumeSFX, false);	// ('marker', start position, volume (0-1), loop)
      console.log("inside collide Fuel");
      //player.body.velocity.y += 5;
      // Obstacle.kill();
  }

}
