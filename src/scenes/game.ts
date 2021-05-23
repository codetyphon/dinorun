import * as Sprites from '../sprites'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export default class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    keyW: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keySpace: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    player: Sprites.Player;
    bg: Phaser.GameObjects.TileSprite;
    scoreText: Phaser.GameObjects.Text;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    ground: Phaser.GameObjects.TileSprite;
    enemys: Phaser.Physics.Arcade.Group;
    m: number;
    music_jump: Phaser.Sound.BaseSound;
    backgroundMusic: Phaser.Sound.BaseSound;

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('ground2', 'assets/images/ground2.png');
        this.load.image('bg', 'assets/images/bg.png');
        this.load.audio("bg", "assets/music/aboveground_bgm.ogg");
        this.load.audio("jump", "assets/music/jump-small.wav");
        this.load.spritesheet('dino', 'assets/sprites/dino.png', { frameWidth: 90, frameHeight: 102 });
        this.load.spritesheet('enemy', 'assets/sprites/enemy.png', { frameWidth: 146, frameHeight: 107 });
    }

    public create() {
        let { width, height } = this.sys.game.canvas;
        // this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        // this.physics.add.existing(this.square);
        this.m = 0
        this.platforms = this.physics.add.staticGroup();
        this.enemys = this.physics.add.group({
            classType: Sprites.Enemy,
            runChildUpdate: true,
        });
        this.bg = this.add.tileSprite(width / 2, height / 2, width, height, 'bg');
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.backgroundMusic = this.sound.add('bg', {
            loop: true
        });
        this.music_jump = this.sound.add('jump');
        this.backgroundMusic.play();
        const config = {
            key: 'run',
            frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 5, first: 0 }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dino', { start: 5, end: 5, first: 0 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'enemyrun',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4, first: 0 }),
            frameRate: 20,
            repeat: -1
        })
        this.player = new Sprites.Player(this)
        // this.player.play('fly')

        this.platforms.create(width / 2, height - 48, 'ground2');
        this.ground = this.add.tileSprite(width / 2, height - 25, width, 50, 'ground');
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemys, this.platforms);
        this.scoreText = this.add.text(20, 20, '', { fontSize: '20px' });
        this.physics.add.overlap(this.player, this.enemys, function (player, enemy) {
            enemy.body.enable = false
            this.scene.start("GameOver");
            console.log('hit')
            this.backgroundMusic.stop()
            
        }, null, this);
        this.time.addEvent({
            delay: 2000,
            callback: this.makeenemy,
            callbackScope: this,
            loop: true
        });
    }
    public makeenemy() {
        let { width, height } = this.sys.game.canvas;
        let enemy = this.enemys.getFirstDead(true)
        if (!enemy) {
            enemy = new Sprites.Enemy(this)
            enemy.play('enemyrun')
            this.enemys.add(enemy)
        } else {
            enemy.reset(width + 100, 0)
            enemy.play('enemyrun')
        }
    }
    public update() {
        // TODO
        this.scoreText.setText(this.player.getData('status'))
        this.bg.tilePositionX += 0.2;
        this.ground.tilePositionX += 2;
        this.m += 2
        if (this.keySpace.isDown) {
            if (this.player.getData('status') != "jumping") {
                this.player.setData('status', 'jumping')
                this.player.play('jump')
                this.player.jump()
                this.music_jump.play()
            }
        }
        if (this.player.body.touching.down) {
            if (this.player.getData('status') != "running") {
                this.player.setData('status', 'running')
                this.player.play('run')
            }
        }
        this.scoreText.setText(this.m + " m")
    }
}