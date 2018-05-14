// define SkyLevel state and methods
var SkyLevel = function(game) {
  var level = 1;
};
SkyLevel.prototype = {
    preload: function() {
        game.load.path = './assets/img';

        //temporaries
        game.load.image('tempBkg', '/temp/sky_1.png');
        game.load.atlas('atlas', '/temp/atlas.png', '/temp/atlas.json');

    },
    create: function() {
        game.stage.backgroundColor = "#aaddff"; // set background color

        //set up background and world
        var bkg = game.add.image(0, 0, 'tempBkg');
        bkg.scale.y = 1;
        bkg.scale.x = game.width/bkg.width;

        //set world bounds to background size
        game.world.setBounds(0, 0, bkg.width, bkg.height);

        //text
        var levelText = "Sky Level " + level;
        var title = game.add.text(game.world.width/2, game.world.height/2, levelText, {fontSize: '48px', fill: '#fff'}); // game title
        title.anchor.setTo(0.5, 0.5); // set anchor to the middle
        console.log(level);

        //player
        player = new PlayerTEMP(game, 'atlas', 'diamond', 1, 0); //PlayerTEMP prefab with scale 1 and rotation 0 -- uses WASD movement
        game.add.existing(player);
        console.log("WASD movement for SkyLevel TEMP player")

        //make camera follow player
        game.camera.follow(player);

        //place collidables
        var totalEnemies = 50;
        this.createEnemies(totalEnemies);
        var totalFuel = 10;
        this.createFuel(totalFuel);

    },
    update: function() {

        //TEMPORARY COLLISION CHECKS: is it better to check for collisions in level, obstacle, fuel, or player?
        //is it also better to use collide() or overlap()?
        
        //collide() example
        if (game.physics.arcade.collide(player, enemy)){
            player.tint = 0xff2a00; //tint player instead of kill()
            //player.kill();
        } else {
            player.tint = 0xffffff;
        }

        //overlap() example
        if (game.physics.arcade.overlap(player, fuel, this.collectFuel, null, this)){
            //console.log("fuel collision!");
            player.tint = 0x0800ff; //tint player instead of kill()
            //player.kill();
        } else {
            player.tint = 0xffffff;
        }


        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { // move on to next state
            //reset world bounds to game height and width
            game.world.setBounds(0, 0, 800, 400);

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
            } else if (level == 0){
                game.state.start('Start');
            }
        }
    },

    //other functions

    createEnemies: function(totalEnemies){
        var xLoc, yLoc;
        enemy = new Array(totalEnemies);

        for (var i = 0; i<totalEnemies; i++){
            xLoc = game.rnd.integerInRange(0, game.world.width);
            yLoc = game.rnd.integerInRange(0, game.world.height);
            enemy[i] = new Obstacle(game, 'atlas', 'leaf', 1, xLoc, yLoc);
            game.add.existing(enemy[i]);
            enemy[i].enableBody = true;
        }
    },

    createFuel: function(totalFuel){
        var xLoc, yLoc;
        fuel = new Array(totalFuel);

        for (var i = 0; i<totalFuel; i++){
            xLoc = game.rnd.integerInRange(0, game.world.width);
            yLoc = game.rnd.integerInRange(0, game.world.height);
            fuel[i] = new Obstacle(game, 'atlas', 'firstaid', 1, xLoc, yLoc);
            game.add.existing(fuel[i]);
            fuel[i].enableBody = true;
        }
    },

    collectFuel: function(player, Obstacle){
        player.velocity.y -= 100;
        console.log("inside collide Fuel");
        //Obstacle.kill();
    }
}
