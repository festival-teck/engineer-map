# エンジニア職種マップ

フリーランスエージェント・営業の方向けに、エンジニア各職種の役割と開発の流れを解説する静的サイトです。

- 公開予定URL: https://engineer-map.labfond.com/
- 運営: FD（https://labfond.com/）

## 構成

- `index.html` … 本編（開発の流れ・職種の解説）
- `check.html` … 募集要項チェック（判定ツール）
- `assets/site.css` … 両ページ共通のスタイル
- `assets/check.js` … 募集要項チェックの処理（職種判定・案件の位置づけ・質問の生成・質問例の検索）
- `data/tech.js` … 技術の近さデータ（技術を足す・近さを直すときはここを編集）
- `data/ask.js` … 「それでも気になること」の質問例データ（質問を増やすときはここに1件追加）

募集要項チェックはブラウザ内だけで動作し、入力内容を外部に送信しません。
PDF の読み込みに pdf.js（cdnjs）、Word（.docx）の読み込みに mammoth.js（jsDelivr）を、ファイル選択時にだけ読み込みます。

## 公開前のメモ

- 現在は意見をもらう段階のため `<meta name="robots" content="noindex">` を入れています。検索に出すときに削除してください。
- Google アナリティクスは labfond 共通の ID（G-GK0SS0BLJ9）のみ設定しています。サイト専用の ID を作ったら追加してください。
- ページを増やしたら sitemap.xml にも追加してください。
