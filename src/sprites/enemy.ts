export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setBounce(0.1, 0.1);
        this.setCollideWorldBounds(true);
        this.setGravityY(300)
        this.setVelocityX(-100)
    }
    reset(width, height) {
        // this.setPosition(width, height)
        this.body.reset(width, height);
        this.setVelocity(-200, 200);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true
    }
    update() {
        if (this.x <= -100) {
            this.setActive(false);//polls
            this.setVisible(false);
            // this.destroy() //不好使
            this.disableBody(true, true);
        }
    }
}