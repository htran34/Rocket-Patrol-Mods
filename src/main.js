// Hunter Tran
// Rocket Patrol Unlimited - The Completely Bananas Remix
// 12 hours approximated time spent 
// MODS IMPLEMENTED:
// * Track a high score that persists across scenes and display it in the UI (1)
// * Implement the 'FIRE' UI text from the original game (1)
// * Implement the speed increase that happens after 30 seconds in the original game (1)
// * Allow the player to control the Rocket after it's fired (1)
// * Create 4 new explosion sound effects and randomize which one plays on impact (3)
// * Display the time remaining (in seconds) on the screen (3)
// * Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// * Implement a new timing/scoring mechanism that adds time to the clock for successful hits (5)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;