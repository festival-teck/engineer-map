# エンジニア職種マップ

フリーランスエージェント・営業の方向けに、エンジニア各職種の役割と開発の流れを解説する静的サイトです。

- 公開予定URL: https://engineer-map.labfond.com/
- 運営: FD（https://labfond.com/）

## 構成

- `index.html` … サイト本体（HTML・CSS・JavaScript をすべて1ファイルに収録）
- 募集要項の判定ツールはブラウザ内だけで動作し、入力内容を外部に送信しません
  - PDF の読み込みに pdf.js（cdnjs）、Word（.docx）の読み込みに mammoth.js（jsDelivr）を、ファイル選択時にだけ読み込みます

## 公開前のメモ

- 現在は意見をもらう段階のため `<meta name="robots" content="noindex">` を入れています。正式公開時に削除し、sitemap.xml とアナリティクスを追加してください。
