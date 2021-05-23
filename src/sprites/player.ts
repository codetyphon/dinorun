export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 100, 'dino');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setBounce(0.1, 0.1);
        this.setCollideWorldBounds(true);
        this.setGravityY(300)
    }
    jump() {
        this.setVelocityY(-250)
    }
    update() {
    }
}