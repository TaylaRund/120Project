// -----------------------------------------------------------------------------
// Luke Mason, Tayla Rund, Emma Yates
// ARTG/CMPM 120
// Final Project
// -----------------------------------------------------------------------------

// GAME
var game = new Phaser.Game(800, 400, Phaser.AUTO);
// GLOBAL VARIABLES
var level = 0;
// STATES
game.state.add('Start', Start);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Level4', Level4);
game.state.add('Level5', Level5);
game.state.add('SkyLevel', SkyLevel);
game.state.add('End', End);
// START
game.state.start('Level1');
