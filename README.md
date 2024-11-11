# YGO-Memo
 
# 概要
遊戯王の展開ルートを記録し、管理するためのWebアプリケーションです。プレイヤーが自分のコンボや展開ルートをメモし、後で参照できるようにします。

# 使用方法
- index.htmlファイルをブラウザで開いてアプリケーションを起動します。
- 展開ルートで使用する画像をimagesフォルダに保存します。
- dataフォルダに新しいJavaScriptファイルを作成します。ここでは例としてtest.jsとします。
- index.html内のスクリプトタグを編集し、SnakeFTK.jsをtest.jsに変更します。
- data/test.jsファイル内のcsvData変数を使用して、画像の表示位置を管理します(SnakeFTK.js,template.jsを参考に)。
- data/test.jsファイル内のbranchMap変数を使用して、展開ルートの分岐を管理します。
