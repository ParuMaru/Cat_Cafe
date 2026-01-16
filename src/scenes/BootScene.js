class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // ロード画面の表示
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.add.text(width / 2, height / 2, 'Loading...', { 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);

        // --- 仮画像の生成処理 (画像ファイルがないため、ここで作ります) ---
        
        // 1. 三毛猫っぽい四角形 (32x32)
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffffff); // 白
        graphics.fillRect(0, 0, 32, 32);
        graphics.fillStyle(0xd2691e); // 茶色パッチ
        graphics.fillRect(0, 0, 16, 16);
        graphics.fillStyle(0x000000); // 黒パッチ
        graphics.fillRect(16, 16, 16, 16);
        graphics.generateTexture('cat_mike', 32, 32); // 'cat_mike'というキーで保存

        // 2. 地面のタイル (32x32)
        graphics.clear();
        graphics.fillStyle(0x5c4033); // 木の床っぽい色
        graphics.fillRect(0, 0, 32, 32);
        graphics.lineStyle(2, 0x3e2b22);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.generateTexture('floor_tile', 32, 32);
    }

    create() {
        // ロードが終わったらカフェ画面へ移動
        this.scene.start('CafeScene');
    }
}