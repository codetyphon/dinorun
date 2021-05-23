const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Menu',
};

export default class MenuScene extends Phaser.Scene {
    start_btn: Phaser.GameObjects.Image;
    keySpace: Phaser.Input.Keyboard.Key;
    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('start', 'assets/images/start.png');
    }

    public create() {
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let { width, height } = this.sys.game.canvas;
        const _self = this;
        this.start_btn = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "start");
        this.start_btn.setScale(0.5);
        this.start_btn.setInteractive();
        this.input.on('gameobjectdown', function (pointer, gameObject) {
            // gameObject.destroy();
            _self.scene.start('Game');
        });
    }

    public update() {
        // TODO
        // if(this.keySpace.isDown){
        //     this.scene.start('Game');
        // }
    }
}