// src/scenes/CafeScene.js

class CafeScene extends Phaser.Scene {
    constructor() {
        super('CafeScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#444444');

        this.add.text(20, 20, '☀️ 昼: カフェ経営', { fontSize: '24px', fill: '#ffffff' });
        this.add.text(20, 60, 'タップしてステータスを確認', { fontSize: '14px', fill: '#cccccc' });

        // --- 3匹の猫を配置 ---
        
        // 1. キジトラ（左）
        this.cat1 = new Cat(this, 90, 300, 'KIJITORA');
        
        // 2. サバ白（真ん中）
        this.cat2 = new Cat(this, 180, 300, 'SABASHIRO');

        // 3. キジ白（右）
        this.cat3 = new Cat(this, 270, 300, 'KIJISHIRO');


        // --- タップイベント設定 ---
        
        // 配列にしてまとめて処理（コードをすっきりさせる）
        const cats = [this.cat1, this.cat2, this.cat3];

        cats.forEach(cat => {
            cat.on('pointerdown', () => {
                cat.sayHello();
                this.showStats(cat);
            });
        });
        
        // --- ダンジョン出発ボタン ---
        const goDungeonBtn = this.add.text(180, 550, '夜の探索へ出発！', {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: '#d2691e', // オレンジ色
            padding: { x: 20, y: 15 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // ボタンが押されたらシーン切り替え
        goDungeonBtn.on('pointerdown', () => {
            // シーンを 'DungeonScene' に切り替える
            this.scene.start('DungeonScene');
        });
    }

    showStats(cat) {
        if (this.statText) this.statText.destroy();

        // 読みやすいように改行とフォーマットを調整
        const text = `名前: ${cat.name}\n` +
                     `----------------\n` +
                     `[カフェ能力]\n` +
                     ` 接客(Charm): ${cat.stats.cafe.charm}\n` +
                     ` 素早(Speed): ${cat.stats.cafe.speed}\n` +
                     `[ダンジョン能力]\n` +
                     ` 体力(HP):    ${cat.stats.dungeon.hp}\n` +
                     ` 興味(Appeal):${cat.stats.dungeon.appeal}`;
        
        this.statText = this.add.text(20, 450, text, {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 15, y: 15 },
            lineSpacing: 5 // 行間を広げて見やすく
        });
    }
}