class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_mario', './assets/marioJump.wav');
        this.load.image('titleBox', './assets/menuTitle.png');
        this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontSize: '28px',
            align: 'center',
            strokeThickness: 3
        }

        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd);   // sets menu background color 
        this.add.image(320, 100, 'titleBox');               
        const startText = this.add.text(225, 300, 'PRESS SPACE TO START', menuConfig);
        // startText.setStroke('#FFFFFF', 3);

        //TweenHelper.flashElement(this, startText);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#0000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {
                //spaceshipSpeed: 3,
                //spacejetSpeed: 5,
                
            }
            //this.sound.play('sfx_select');
            /* Play Mario menu button sound here! */
            this.scene.start('playScene2');    
          }
    }
}

