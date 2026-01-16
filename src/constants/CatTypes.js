// src/constants/CatTypes.js

const CAT_TYPES = {
    // キジトラ：野生味あふれるアピール特化
    KIJITORA: {
        id: 'kijitora',
        name: 'キジトラ',
        color: 0x8b4513, // 濃い茶色
        baseStats: {
            cafe: { charm: 9, speed: 10, cooking: 11 },
            dungeon: { hp: 60, appeal: 14, agility: 9 } // アピール強い
        },
        description: '野性味が強く、物怖じしない性格。'
    },

    // サバ白：スピードスター
    SABASHIRO: {
        id: 'sabashiro',
        name: 'サバ白',
        color: 0xcccccc, // グレー（サバ色）
        baseStats: {
            cafe: { charm: 8, speed: 15, cooking: 8 }, // 配膳が速い
            dungeon: { hp: 45, appeal: 8, agility: 15 } // 回避・先制が得意
        },
        description: '動きが素早い。逃げ足には自信あり。'
    },

    // キジ白：愛嬌とバランス（新規追加）
    KIJISHIRO: {
        id: 'kijishiro',
        name: 'キジ白',
        color: 0xd2b48c, // 薄茶色（キジトラより明るめ）
        baseStats: {
            cafe: { charm: 14, speed: 9, cooking: 9 }, // 愛想が良い
            dungeon: { hp: 55, appeal: 10, agility: 10 } // 平均的で使いやすい
        },
        description: '白い靴下を履いたような柄。人懐っこい。'
    }
};