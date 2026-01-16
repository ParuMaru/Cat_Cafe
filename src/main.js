const config = {
    type: Phaser.AUTO,
    width: 360,   // ゲームの解像度（幅）
    height: 640,  // ゲームの解像度（高さ）
    parent: 'game-container', // HTMLのdivタグID
    backgroundColor: '#000000',
    pixelArt: true, // ドット絵をくっきり表示する設定
    scale: {
        mode: Phaser.Scale.FIT, // 画面サイズに合わせて拡大縮小
        autoCenter: Phaser.Scale.CENTER_BOTH // 中央寄せ
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // 見下ろし型なので重力なし
            debug: false
        }
    },
    scene: [
        BootScene, // 最初に読み込み
        CafeScene  // 次にカフェ
    ]
};

const game = new Phaser.Game(config);