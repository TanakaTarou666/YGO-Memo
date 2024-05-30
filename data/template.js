/* 
        盤面の編集はここのcsvDataで。
        `[画像名],[行番号],[列番号](,:[コメント]), ... `
        (,:[コメント]) はなくてもok 
        [コメント]で「<br>」は改行文字
        */
        const csvData = [
            [
                `白,1,1,:コメン例,白,2,3`,
                `白,2,2`,
            ],
            [
                `白,5,3`,   
            ],
            [
                `白,4,1`,   
            ],
            [
                `白,2,4`,
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