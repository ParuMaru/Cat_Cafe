class DungeonScene extends Phaser.Scene {
    constructor() {
        super('DungeonScene');
    }

    create() {
        // --- 1. ダンジョンの設定 ---
        this.cameras.main.setBackgroundColor('#111111'); // 夜なので暗く

        // グリッド管理用の設定
        this.tileSize = 32; // 1マスのサイズ
        this.mapWidth = 10; // 横10マス
        this.mapHeight = 12; // 縦12マス
        
        // プレイヤーのグリッド座標（初期位置）
        this.playerGridX = 1;
        this.playerGridY = 1;

        // --- 2. マップの描画（仮の床） ---
        // 画面幅に合わせて中央に寄せる計算
        this.offsetX = (this.sys.game.config.width - (this.mapWidth * this.tileSize)) / 2;
        this.offsetY = 50;

        // 床を並べるループ処理
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const tile = this.add.image(
                    this.offsetX + x * this.tileSize + 16, // +16は中心合わせ
                    this.offsetY + y * this.tileSize + 16, 
                    'floor_tile' // BootSceneで作った画像
                );
                // 暗闇っぽさを出すために少し暗くする
                tile.setTint(0x888888); 
            }
        }

        // --- 3. プレイヤー（猫）の表示 ---
        // カフェで選んだ猫を表示する想定（今回は仮でキジトラ）
        // ピクセル座標への変換処理を関数化しておくと便利
        const startX = this.getPixelX(this.playerGridX);
        const startY = this.getPixelY(this.playerGridY);

        this.player = this.add.sprite(startX, startY, 'cat_mike');
        this.player.setTint(0x88ff88); // プレイヤーだとわかるように少し緑っぽく

        // --- 4. UI（操作ボタン）の作成 ---
        this.createControls();

        // 画面上のテキスト
        this.add.text(20, 20, '🌙 夜: ダンジョン探索', { fontSize: '20px', fill: '#ffffff' });
        this.add.text(20, 500, '矢印キー または ボタンで移動', { fontSize: '14px', fill: '#aaaaaa' });

        // キーボード操作（PCデバッグ用）
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // キーボード入力のチェック（押しっぱなし防止のフラグ管理は今回は省略）
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.movePlayer(-1, 0);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.movePlayer(1, 0);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.movePlayer(0, -1);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.movePlayer(0, 1);
    }

    // --- プレイヤー移動処理 ---
    movePlayer(dx, dy) {
        // 移動先の座標
        const newX = this.playerGridX + dx;
        const newY = this.playerGridY + dy;

        // マップの外に出ないかチェック
        if (newX < 0 || newX >= this.mapWidth || newY < 0 || newY >= this.mapHeight) {
            return; // 移動キャンセル
        }

        // 座標更新
        this.playerGridX = newX;
        this.playerGridY = newY;

        // アニメーションで移動させる（Tween）
        this.tweens.add({
            targets: this.player,
            x: this.getPixelX(newX),
            y: this.getPixelY(newY),
            duration: 150, // 移動にかかる時間
            ease: 'Power1'
        });

        // ※ここで「敵との遭遇」や「アイテム発見」の判定を入れる
        
        // 仮：出口（右下）に着いたら帰宅
        if (newX === this.mapWidth - 1 && newY === this.mapHeight - 1) {
            console.log("探索終了！");
            this.scene.start('CafeScene'); // カフェに戻る
        }
    }

    // グリッド座標 -> 画面のピクセル座標 変換
    getPixelX(gridX) { return this.offsetX + gridX * this.tileSize + 16; }
    getPixelY(gridY) { return this.offsetY + gridY * this.tileSize + 16; }

    // --- スマホ用操作ボタンの作成 ---
    createControls() {
        const btnSize = 50;
        const baseX = 180; // 画面中央
        const baseY = 580; // 画面下部

        // 上下左右のボタンを作成するヘルパー関数
        const createBtn = (x, y, text, dx, dy) => {
            const btn = this.add.text(x, y, text, {
                fontSize: '30px', backgroundColor: '#333', padding: { x: 10, y: 10 }
            }).setOrigin(0.5).setInteractive();
            
            btn.on('pointerdown', () => {
                this.movePlayer(dx, dy);
                btn.setStyle({ backgroundColor: '#666' }); // 押した色
            });
            btn.on('pointerup', () => {
                btn.setStyle({ backgroundColor: '#333' }); // 戻す
            });
        };

        createBtn(baseX, baseY - btnSize, '▲', 0, -1); // 上
        createBtn(baseX, baseY + btnSize, '▼', 0, 1);  // 下
        createBtn(baseX - btnSize, baseY, '◀', -1, 0); // 左
        createBtn(baseX + btnSize, baseY, '▶', 1, 0);  // 右
    }
}