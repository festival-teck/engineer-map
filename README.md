# エンジニア職種マップ

フリーランスエージェント・営業の方向けに、エンジニア各職種の役割と開発の流れを解説する静的サイトです。

- 公開予定URL: https://engineer-map.labfond.com/
- 運営: FD（https://labfond.com/）

## 構成

- `index.html` … サイト本体（HTML・CSS・JavaScript をすべて1ファイルに収録）
- 募集要項の判定ツールはブラウザ内だけで動作し、入力内容を外部に送信しません
  - PDF の読み込みに pdf.js（cdnjs）、Word（.docx）の読み込みに mammoth.js（jsDelivr）を、ファイル選択時にだけ読み込みます

## 公開前のメモ

- 現在は意見をもらう段階のため `<meta name="robots" content="noindex">` を入れています。検索に出すときに削除してください。
- Google アナリティクスは labfond 共通の ID（G-GK0SS0BLJ9）のみ設定しています。サイト専用の ID を作ったら追加してください。
- ページを増やしたら sitemap.xml にも追加してください。
