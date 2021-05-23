const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameOver',
};

export default class GameOverScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    keySpace: Phaser.Input.Keyboard.Key;
    start_btn: Phaser.GameObjects.Image;
    music: Phaser.Sound.BaseSound;

    constructor() {
        super(sceneConfig);
    }

    preload() {
        this.load.image('gameover', 'assets/images/gameover.png');
        this.load.audio("gameover", "assets/music/gameover.wav");
    }

    public create() {
        this.music = this.sound.add('gameover');
        this.music.play()
        this.start_btn = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "gameover");
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public update() {
        if (this.keySpace.isDown) {
            this.scene.start('Game')
        }
    }
}