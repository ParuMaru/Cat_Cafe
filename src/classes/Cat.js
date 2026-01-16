class Cat extends Phaser.GameObjects.Container {
    /**
     * @param {Phaser.Scene} scene - 所属するシーン
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {string} typeKey - CAT_TYPESのキー (例: 'MIKE')
     */
    constructor(scene, x, y, typeKey) {
        super(scene, x, y);

        // データの読み込み
        const typeData = CAT_TYPES[typeKey];
        this.typeId = typeData.id;
        this.name = typeData.name;
        
        // ステータスの設定（現在のステータスとして保持）
        this.stats = {
            cafe: { ...typeData.baseStats.cafe },     // コピーして使用
            dungeon: { ...typeData.baseStats.dungeon }
        };

        // --- 見た目の作成 ---

        // 1. 猫の画像（BootSceneで作った仮画像を色変えして使う）
        // setTintを使うことで、同じ白い四角形でも色を変えられます
        this.sprite = scene.add.sprite(0, 0, 'cat_mike'); 
        
        // もし色指定があれば色味を変える（簡易的な実装）
        if (typeKey !== 'MIKE') {
            this.sprite.setTint(typeData.color);
        }

        // 2. 名前の表示（頭の上に表示）
        this.nameText = scene.add.text(0, -25, this.name, {
            fontSize: '12px',
            fill: '#ffffff',
            backgroundColor: '#00000080' // 半透明の黒背景
        }).setOrigin(0.5);

        // コンテナに画像と文字を追加
        this.add(this.sprite);
        this.add(this.nameText);

        // サイズを設定（タップ判定のため）
        this.setSize(32, 32);
        
        // タップ可能にする
        this.setInteractive();

        // シーンに追加して表示
        scene.add.existing(this);
    }

    // カフェでのアクション（例：挨拶）
    sayHello() {
        console.log(`${this.name} (魅力:${this.stats.cafe.charm}) は、お客さんに挨拶した！`);
        
        // ぴょんと跳ねるアニメーション
        this.scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 100,
            yoyo: true
        });
    }
}