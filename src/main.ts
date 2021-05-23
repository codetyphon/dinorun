import * as Phaser from 'phaser';
import * as Scenes from './scenes'

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'dino run',
    type: Phaser.AUTO,
    scale: {
        // width: window.innerWidth,
        // height: window.innerHeight,
        width: 766,
        height: 187 + 50,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    parent: 'game',
    backgroundColor: '#000000',
    scene: [Scenes.Menu, Scenes.GameScene, Scenes.GameOverScene]
    // scene: [Scenes.GameScene, Scenes.GameOverScene]
};

export const game = new Phaser.Game(gameConfig);