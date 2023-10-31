// initialize high score
p1HighScore = 0;

class Play extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        // load images/tile sprites
        this.load.image('mario', './assets/mario.png');
    }

    create() {
        // add blue-colored sky background
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd);   
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        // add spacejet (x1)
        this.jet01 = new Spacejet(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding, 'spacejet', 0, 50).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.highScoreLeft = this.add.text(500, 50, p1HighScore, scoreConfig);
        this.fired = this.add.text(250, 50, "FIRED", scoreConfig).setVisible(false);
        this.explosions = ['sfx_explosion', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5'];

        // initialize timer display
        this.timeRemaining = this.add.text(250, 50, 0, scoreConfig).setVisible(false);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //game.settings.gameTimer = 10000
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            // update high score 
            p1HighScore = Math.max(p1HighScore, this.p1Score);
            this.highScoreLeft = this.add.text(500, 50, p1HighScore, scoreConfig);
        }, null, this);
    }
    update() {
        // initialize time elapsed & calculate time remianing
        const elapsed = this.clock.getElapsed();
        const remaining = (game.settings.gameTimer - elapsed)/1000;
        this.timeRemaining.text = Math.round(remaining);
        this.timeRemaining.setVisible(true);

        // speed increase for rocket after 30 seconds of gameplay
        if(elapsed >= 30000) {
            this.p1Rocket.increaseSpeed();
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.jet01.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            game.settings.gameTimer += 10000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings.gameTimer += 20000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            game.settings.gameTimer += 30000;
        }
        if(this.checkCollision(this.p1Rocket, this.jet01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.jet01); 
            game.settings.gameTimer += 60000;  
        }       

        // check if rocket is fired
        if(this.p1Rocket.isFiring && this.p1Rocket.y >= borderUISize * 3 + borderPadding) {
            this.fired.setVisible(true);
        }
        else {
            this.fired.setVisible(false);
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play(this.explosions[Math.floor(Math.random() * this.explosions.length)]);
    }      
}

