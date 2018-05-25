// define SkyLevel state and methods
var fuel;
var SkyLevel = function(game) {
  var level = 1;
  var max = 100*level;
  var star;
  var shootingStar;
  var cloud;
  var breeze;

};
SkyLevel.prototype = {
	preload: function() {

    game.load.image('sky', 'assets/img/skyBackground.png');
    game.load.image('cloud1', 'assets/img/cloud01.png');
    game.load.image('cloud2', 'assets/img/cloud02.png');
    game.load.image('rain', 'assets/img/raindrop01.png');
    game.load.image('star', 'assets/img/star.png');
    game.load.image('breeze', 'assets/img/breeze.png');
  },

	create: function() {

    var background = game.add.tileSprite(0, 0, 800, 8192, 'sky');
    game.world.setBounds(0, 0, 800, 8192);
    var yPos = 8000;

    game.stage.backgroundColor = "#aaddff"; // set background color
    var levelText = "Sky Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
    console.log(level);
    var levelText = "Sky Level " + level;
    var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
    title.anchor.setTo(0.5, 0.5); // set anchor to the middle
    console.log(level);


    //player
    //function Player(game, index, sprite, velocityY, region, gravity, x, y, skyLevel) {

    player = new Player(game, 'mouse', 'mouse01', 0, 'sky', 300, game.world.width/2, game.world.height, level); //why does it think the player health is 1 and not 0?

    player.scale.setTo(0.5, 0.5);
    game.add.existing(player);
    //make camera follow player
    game.camera.follow(player);


    //breeze
    var totalBreeze = 20;
    breeze = new Array(totalBreeze);
    var xLoc, yLoc;
    for (var i = 0; i < totalBreeze; i++) {
      xLoc = game.rnd.integerInRange(64,game.width-64);
      yLoc = (i/20)*game.world.height;
      breeze[i] = new Breeze(game, 'breeze', .5, xLoc, yLoc, player);
      game.add.existing(breeze[i]);
    }

    //clouds
    var totalClouds = 10;
    cloud = new Array(totalClouds);
    var xLoc, yLoc;
    for (var i = 0; i <totalClouds; i++) {
      xLoc = game.rnd.integerInRange(64,game.width-64);
      yLoc = 2*Math.random()*game.world.height/3 + game.world.height/5
      cloud[i] = new Cloud(game, 'cloud1', .5, xLoc, yLoc, player);
      game.add.existing(cloud[i]);

      //cloud = game.add.sprite(Math.random()*game.world.width, yLoc, 'cloud1');
      //cloud.anchor.setTo(0.5, 0.5);
      //console.log(cloud.position.y);
      // cloud.body.velocity.x = 30;
      // narrow emitter with 'rain'

      emitter = game.add.emitter(cloud[i].position.x, cloud[i].position.y, 5000);
      emitter.makeParticles(['rain'], 0, 1);
      emitter.start(false, 750, 3, 5000);
      emitter.setRotation(0, 0);
      emitter.setXSpeed(0, 0);
      emitter.setYSpeed(300, 400);
      let area = new Phaser.Rectangle(cloud[i].position.x, 0, 50, 1);
      emitter.area = area;
      game.physics.arcade.collide(emitter);

      emitter.enableBody = true;
    }

    //star
    var totalStars = 20;
    star = new Array(totalStars);
    var xLoc, yLoc;
    for (var i = 0; i < totalStars; i++) {
      xLoc = game.rnd.integerInRange(64,game.width-64);
      yLoc = game.world.height/10 + Math.random()*game.world.height/10;
      star[i] = new Star(game, 'star', .5, xLoc, yLoc, player, 0, 0, game.world.height);
      game.add.existing(star[i]);
    }

    //shooting stars
    var totalShootingStars = 20;
    shootingStar = new Array(totalShootingStars);
    var xLoc, yLoc;
    for (var i = 0; i < totalShootingStars; i++) {
      xLoc = game.rnd.integerInRange(64,game.width-64);
      yLoc = Math.random()*game.world.height/10;
      shootingStar[i] = new Star(game, 'star', .5, xLoc, yLoc, player, 100, 100, game.world.height/10);
      game.add.existing(shootingStar[i]);
    }

    var healthText = "Health: " + player.health;
    healthLabel = game.add.text(20, 20, healthText, {fontSize: '24px', fill: '#fff'});
    healthLabel.fixedToCamera = true;

	},
	update: function() {

    game.physics.arcade.overlap(player, emitter, collideRain, null, this);
    game.physics.arcade.overlap(player, cloud, collideCloud, null, this);
    game.physics.arcade.overlap(player, breeze, collideBreeze, null, this);
    game.physics.arcade.overlap(player, star, collideStar, null, this);
    game.physics.arcade.overlap(player, shootingStar, collideStar, null, this);

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
  		// if (level == 5) { // move on to next state
  		// 	game.state.start('End');
  		if (level == 4) { // move on to next state
  			game.state.start('End');
  		} else if (level == 3) { // move on to next state
  			game.state.start('Level4');
  		} else if (level == 2) { // move on to next state
  			game.state.start('Level3');
  		} else if (level == 1) { // move on to next state
  			game.state.start('Level2');
      }
    }

    function collideRain(player, emitter){
      console.log("rain collision");
      //tbd
    }

    function collideCloud(player, cloud){
      cloud.kill();
      updateHealth(-1);
    }

    function collideBreeze(player, breeze){
      breeze.kill();
      var cap = -300;
      if (player.body.velocity.y>cap)
        player.body.velocity.y -= 700;
    }

    function collideStar(player, star){
      //console.log("collide star");
      star.kill();
      updateHealth(-1);
    }

    function updateHealth(inc){
      player.health += inc;
      healthLabel.setText("Health: " + player.health);
    }


	},

}
