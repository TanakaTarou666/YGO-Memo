/* 
        盤面の編集はここのcsvDataで。
        `[画像名],[行番号],[列番号](,:[コメント]), ... `
        (,:[コメント]) はなくてもok 
        [コメント]で「<br>」は改行文字
        */
        const csvData = [
            [
                `白,1,1,:先行ワンキル<br>展開2<br>エクセル1枚<br>展開3<br>ディアベル1枚,白,1,2,:1-2(進む)で<br>今回想定している<br>盤面の説明`,
                `白,1,1,:先行ワンキル<br>展開2<br>エクセル1枚<br>展開3<br>ディアベル1枚,白,1,2,:敵メイン,白,1,3,:敵メイン,白,1,4,:敵メイン,白,1,5,:敵メイン,白,1,6,:敵メイン,白,2,3,:エクストラ,白,2,5,:エクストラ,白,3,2,:自分メイン,白,3,3,:自分メイン,白,3,4,:自分メイン,白,3,5,:自分メイン,白,3,6,:自分メイン,白,3,1,:フィールド魔法,白,3,7,:墓地,白,4,2,:魔法罠,白,4,3,:魔法罠,白,4,4,:魔法罠,白,4,5,:魔法罠,白,4,6,:魔法罠,白,5,1,:手札,白,5,2,:手札,白,5,3,:手札,白,5,4,:手札,白,5,5,:手札,白,5,6,:手札,白,5,7,:手札`,
            ],
            [
                `エクセル,5,3`,
                `エクセル,3,3,ポプルス,3,4,原罪宝,5,3`,
                `エクセル,3,3,オーク,3,4,ポプルス,4,4,原罪宝,5,3`,
                `エクセル,3,3,フランベルジュ,3,4,オーク,4,4,原罪宝,5,3`,
                `エクセル,3,3,フランベルジュ,3,4,原罪宝,4,3,ハイドラント,3,5,ファイアエンジン,5,3`,
                `ナイチンゲール,3,3,フランベルジュ,3,4,ファイアエンジン,5,3`,
                `ロムルス,2,3,エクセル,3,3,ハイドラント,3,4,渓谷,5,4,ファイアエンジン,3,2`,
                `ロムルス,2,3,エクセル,3,3,ハイドラント,3,4,渓谷,3,1,ファイアエンジン,3,2,デストルドー,3,5,:レベル6`,
                `ロムルス,2,3,エクセル,3,3,エンフェ,3,4,ブラックガーデン,5,3,ファイアエンジン,3,2`,
            ],
            [
                `ディアベルスター,5,3,白,3,3,:コスト,白,5,4,:コスト`,
                `ディアベルスター,3,4,白,3,3,:コスト,原罪宝,4,3,:セット`,
                `ディアベルスター,3,4,エクセル,3,3,原罪宝,4,3,:発動`,
                `ディアベルスター,3,4,エクセル,3,3,ポプルス,3,5`,
                `ディアベルスター,3,4,エクセル,3,3,エクセル,4,4,ポプルス,3,5,蛇眼神殿,3,1`,
                `ディアベルスター,3,4,エクセル,3,2,オーク,3,3,ポプルス,3,5,蛇眼神殿,3,1`,
                `ディアベルスター,3,4,エクセル,3,2,フランベルジュ,3,3,ポプルス,3,5`,
                `ディアベルスター,3,4,ナイチンゲール,3,2,フランベルジュ,3,3`,
                `ディアベルスター,3,4,ロムルス,2,3,エクセル,3,3,オーク,3,5,渓谷,5,4`,
                `ディアベルスター,3,4,ロムルス,2,3,エクセル,3,3,オーク,3,5,渓谷,3,1,デストルドー,3,6,:レベル6`,
                `ディアベルスター,3,4,ロムルス,2,3,オーク,3,5,渓谷,3,1,エンフェ,3,3`,
            ],
            [
                `白,1,1,:条件<br>ブラックガーデン+<br>トマホーク＋<br>モンスター×1or2,ロムルス,2,3,ブラックガーデン,5,3,トマホーク,3,2`,
                `ロムルス,2,3,ブラックガーデン,5,3,トマホーク,3,2,トークン,3,3,:レベル6,トークン,3,4,:レベル6,トークン,3,5,:レベル6,トークン,3,6,:レベル6`,
                `コーディネラル,2,3,ブラックガーデン,5,3,ラドン,3,2,トークン,3,6,:レベル6`,
                `コーディネラル,2,3,ブラックガーデン,5,3,ラドン,3,2,トークン,3,3,:レベル3,トークン,3,4,:レベル3,トークン,3,5,:レベル3,トークン,3,6,:レベル6`,
                `コーディネラル,2,3,ブラックガーデン,5,3,オライオン,3,2,トークン,3,4,:レベル3,トークン,3,5,:レベル3,トークン,3,6,:レベル6`,
                `コーディネラル,2,3,ブラックガーデン,5,3,アクセルシンクロン,3,2,:レベル2,レボシン,3,7,トークン,3,4,:レベル3,トークン,3,5,:レベル3,トークン,3,6,:レベル6`,
                `コーディネラル,2,3,ブラックガーデン,5,3,ベエルゼ,3,2,トークン,3,4,:レベル3,トークン,3,5,:レベル3,レボシン,3,6,:レベル1`,
                `コーディネラル,2,3,ブラックガーデン,3,1,ベエルゼ,3,2,トークン,1,4,:レベル2,トークン,3,4,:レベル3,ルイキュー,3,6,:レベル5`,
                `コーディネラル,2,3,ブラックガーデン,3,1,ベエルゼ,1,4,トークン,3,2,:レベル2,トークン,3,4,:レベル3,ルイキュー,3,6,:レベル5`,
                `コーディネラル,2,3,ブラックガーデン,3,1,ベエルゼ,1,4,BFアサルト,3,2,ルイキュー,3,7,:効果でダメージ`,
            ]
        ];
        /*
        展開ルートの分岐の編集はここの branchMapのforward で
        */
        const branchMap = {
            forward: {
                1: [2, 3],
                2: [4],
                3: [4],
            },
            backward: {}
        };