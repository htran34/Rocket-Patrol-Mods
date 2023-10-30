class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_mario', './assets/marioJump.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '46px',
            backgroundColor: '#0',
            color: '#00ff00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        const titleText = this.add.text(130, 50, 'ENDLESS MARIO BROS', menuConfig);
        const startText = this.add.text(225, 300, 'PRESS SPACE TO START');
        // TweenHelper.flashElement(this, playText);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#0000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        // define keys
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }
    update() {
    }
}