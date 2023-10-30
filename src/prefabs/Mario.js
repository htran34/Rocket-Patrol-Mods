// Mario prefab
class Mario extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // add object to existing scene
        scene.add.existing(this);
        this.canJump = true;
        this.isJumping = false;
        this.initialPosY = null;
        this.moveSpeed = 2;
        this.sfxMario = scene.sound.add('sfx_mario'); // add Mario sfx
    }

    increaseSize() {
        /* Change sprite image to bigger Mario here */
        this.moveSpeed = 4;
    }

    update() {  
        // initiate jump when space pressed (once)
        if (Phaser.Input.Keyboard.JustDown(space) && !this.isJumping) {
            this.canJump = false;
            this.isJumping = true;
            this.initialPosY = this.y;
            this.sfxMario.play();  // play sfx
        }

        // jump 
        if(this.isJumping) {
            // if mario has not completed a jump & still inside the scene
            if ((this.y >= (this.initialPosY - 100)) && (this.y >= borderUISize * 3)) {
                this.y -= this.moveSpeed;
            }
            // if mario has completed a jump 
            else if ((this.y <= (this.initialPosY - 100)) || (this.y <= borderUISize * 3)) {
                // fall back down from jump
                if (this.y < this.initialPosY) {
                    this.y += this.moveSpeed
                }
                // Mario has fallen
                else {
                    this.reset();
                }
            }
        }
    }

    // reset Mario to "ground"
    reset() {
        // this.isFiring = false;
        // this.y = game.config.height - borderUISize - borderPadding;
        this.canJump = true;
        this.isJumping = false;
        this.initialPosY = null;
        this.moveSpeed = 2;
    }
}