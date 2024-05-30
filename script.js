const defaultImageName = "defaultImage";
        let currentSegment = 0; // 現在の展開
        let currentImage = 0; // 現在の盤面（行）

        function showImages() {
            const imagesDiv = document.getElementById('images');
            imagesDiv.innerHTML = '';

            const data = csvData[currentSegment][currentImage].split(',');

            let images = new Array(35).fill(null).map(() => ({ name: defaultImageName, comments: [] }));

            for (let i = 0; i < data.length;) {
                const name = data[i];
                const rowIndex = parseInt(data[i + 1], 10) - 1;
                const colIndex = (parseInt(data[i + 2], 10) - 1) + rowIndex * 7;
                if (!images[colIndex].name || images[colIndex].name === defaultImageName) {
                    images[colIndex].name = name;
                }

                // コメントを連続して処理
                i += 3; // name, rowIndex, colIndexの次の要素へ
                while (data[i] && data[i].startsWith(':')) {
                    const comment = data[i].substring(1).replace(/\\n/g, '<br>'); // 改行文字を <br> タグに置換
                    images[colIndex].comments.push(comment);
                    i += 1; // 次のコメントまたは画像データへ
                }
            }

            images.forEach(item => {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                const imgElement = document.createElement('img');
                imgElement.src = item.name === defaultImageName ? 'images/' + defaultImageName + '.jpg' : 'images/' + item.name + '.jpg';
                imgContainer.appendChild(imgElement);

                // コメントを縦に並べて表示
                item.comments.forEach(commentText => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = commentText; // innerHTMLを使用して改行を反映
                    imgContainer.appendChild(commentElement);
                });

                imagesDiv.appendChild(imgContainer);
            });
        }


        function generateBackwardMappings() {
            // `forward` マッピングを元に `backward` マッピングを生成
            for (const source in branchMap.forward) {
                const destinations = branchMap.forward[source];
                destinations.forEach(destination => {
                    if (!branchMap.backward[destination]) {
                        branchMap.backward[destination] = [];
                    }
                    // 重複を避けるために、既に存在しない場合のみ追加
                    if (!branchMap.backward[destination].includes(parseInt(source))) {
                        branchMap.backward[destination].push(parseInt(source));
                    }
                });
            }
        }

        generateBackwardMappings();

        function changeImage(offset) {
            currentImage += offset;
            if (currentImage < 0) currentImage = 0;
            else if (currentImage >= csvData[currentSegment].length) currentImage = csvData[currentSegment].length - 1;
            showImages();
        }

        function changeSegment(offset) {
            currentSegment += offset;
            if (currentSegment < 0) currentSegment = 0;
            else if (currentSegment >= csvData.length) currentSegment = csvData.length - 1;
            currentImage = 0; // 展開が変わったら、盤面をリセット
            showImages();
        }

        function jumpToSegment() {
            const segmentNum = parseInt(document.getElementById('segmentNumber').value, 10);
            if (segmentNum >= 0 && segmentNum < csvData.length) {
                currentSegment = segmentNum;
                currentImage = 0; // 新しい展開にジャンプするときは、盤面をリセット
                showImages();
            }
        }

        function updateExpansionPositionDisplay() {
            const expansionPosition = document.getElementById('expansionPosition');
            expansionPosition.textContent = `${currentSegment + 1}-${currentImage + 1}`;
        }

        function prevImage() {
            changeImage(-1);
            updateExpansionPositionDisplay(); // 表示を更新
        }

        function nextImage() {
            changeImage(1);
            updateExpansionPositionDisplay(); // 表示を更新
        }

        function updateBranchSelectors() {
            // 各セレクタの初期化処理をここに記述
            const forwardSelector = document.getElementById('forwardBranchSelector');
            const backwardSelector = document.getElementById('backwardBranchSelector');
            forwardSelector.innerHTML = '<option value="">進む展開を選択</option>';
            backwardSelector.innerHTML = '<option value="">戻る展開を選択</option>';


            // 「forward」分岐のオプションを追加
            const forwardOptions = branchMap.forward[currentSegment + 1] || [];
            forwardOptions.forEach(segment => {
                const option = document.createElement('option');
                option.text = `展開 ${segment} へ進む`;
                option.value = segment - 1;
                forwardSelector.add(option);
            });

            // 「backward」分岐のオプションを追加
            const backwardOptions = branchMap.backward[currentSegment + 1] || [];
            backwardOptions.forEach(segment => {
                const option = document.createElement('option');
                option.text = `展開 ${segment} へ戻る`;
                option.value = segment - 1;
                backwardSelector.add(option);
            });

            // 分岐がない場合はドロップダウンを非表示にする
            forwardSelector.style.display = forwardOptions.length > 0 ? '' : 'none';
            backwardSelector.style.display = backwardOptions.length > 0 ? '' : 'none';
        }

        function updateBranchSelector() {
            const branchSelector = document.getElementById('branchSelector');
            branchSelector.innerHTML = ''; // 既存のオプションをクリア

            // 「選択してください」オプションを追加
            const defaultOption = document.createElement('option');
            defaultOption.text = '分岐を選択';
            defaultOption.value = '';
            branchSelector.add(defaultOption);

            // 現在の展開からの前方分岐を追加
            const forwardChoices = branchMap.forward[currentSegment + 1] || [];
            forwardChoices.forEach(segment => {
                const option = document.createElement('option');
                option.text = `次へ: 展開 ${segment}`;
                option.value = segment - 1; // 配列のインデックスとして使用
                branchSelector.add(option);
            });

            // 現在の展開からの後方分岐を追加
            const backwardChoices = branchMap.backward[currentSegment + 1] || [];
            backwardChoices.forEach(segment => {
                const option = document.createElement('option');
                option.text = `前へ: 展開 ${segment}`;
                option.value = segment - 1; // 配列のインデックスとして使用
                branchSelector.add(option);
            });
        }

        function updateBranchOptions() {
            const forwardOptions = branchMap.forward[currentSegment + 1] || [];
            const backwardOptions = branchMap.backward[currentSegment + 1] || [];
            updateBranchUI('forwardBranchOptions', forwardOptions, '進む: 展開 ');
            updateBranchUI('backwardBranchOptions', backwardOptions, '戻る: 展開 ');
        }

        function updateBranchUI(containerId, options, prefixText) {
            const container = document.getElementById(containerId);
            container.innerHTML = ''; // Clear existing content

            let defaultOptionText; // デフォルトオプションのテキストを初期化
            if (prefixText.includes('進む: ')) {
                defaultOptionText = '進む展開を選択';
            } else {
                defaultOptionText = '戻る展開を選択';
            }

            if (options.length === 1) {
                const button = document.createElement('button');
                button.textContent = prefixText + options[0];
                button.onclick = function () { jumpToSpecificSegment(options[0] - 1); };
                container.appendChild(button);
            } else if (options.length > 1) {
                const select = document.createElement('select');
                const defaultOption = document.createElement('option');
                defaultOption.textContent = defaultOptionText; // 条件に基づいたテキストを設定
                select.appendChild(defaultOption);
                options.forEach(function (option) {
                    const optionElement = document.createElement('option');
                    optionElement.value = option - 1; // セグメントインデックスを設定
                    optionElement.textContent = prefixText + option;
                    select.appendChild(optionElement);
                });
                select.onchange = function () { jumpToSpecificSegment(this.value); };
                container.appendChild(select);
            }
            updateExpansionPositionDisplay();
        }


        function jumpToSpecificSegment(segmentIndex) {
            const index = parseInt(segmentIndex);
            if (!isNaN(index) && index >= 0 && index < csvData.length) {
                currentSegment = index;
                currentImage = 0;
                showImages();
                updateBranchOptions();
            }
        }

        function prevSegment() {
            changeSegment(-1);
            updateBranchSelector();
            currentImage = 0; // 新しい展開への移動時に盤面番号をリセット
            updateExpansionPositionDisplay(); // 表示を更新
        }

        function nextSegment() {
            changeSegment(1);
            updateBranchSelector();
            // 展開番号をインクリメントするロジックを追加
            currentImage = 0; // 新しい展開への移動時に盤面番号をリセット
            updateExpansionPositionDisplay(); // 表示を更新
        }


        document.addEventListener('DOMContentLoaded', function () {
            updateBranchOptions();
            showImages();
            updateExpansionPositionDisplay();
        });