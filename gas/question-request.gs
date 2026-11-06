// 募集要項チェック「質問例の追加依頼」の受付（Google Apps Script）
//
// 使い方
// 1. Googleスプレッドシートを新しく作る（名前は自由。例：エンジニア職種マップ 追加依頼）
// 2. メニューの「拡張機能」→「Apps Script」を開き、このファイルの中身をすべて貼り付けて保存
// 3. 通知メールがほしい場合は、下の NOTIFY_EMAIL に自分のメールアドレスを入れる
// 4. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
//      次のユーザーとして実行：自分 / アクセスできるユーザー：全員
// 5. 表示された「ウェブアプリのURL」（…/exec）を、check.html の EM_REQUEST_ENDPOINT に入れる
//
// 届いた依頼は「依頼」シートに1行ずつたまります。同じキーワードは「依頼回数」が増えます。
// 質問例を追加したら「対応状況」を「追加済み」などに書き換えて管理してください。

const SHEET_NAME = "依頼";
const NOTIFY_EMAIL = ""; // 例："you@example.com"（空なら通知しない）
const MAX_LEN = 200;

function doPost(e) {
  const p = (e && e.parameter) || {};
  const q = String(p.q || "").trim().slice(0, MAX_LEN);
  if (!q) return out_({ ok: false });
  const page = String(p.page || "").slice(0, 40);

  const lock = LockService.getScriptLock();
  lock.tryLock(5000);
  try {
    const sh = sheet_();
    const values = sh.getDataRange().getValues();
    const key = norm_(q);
    const now = new Date();
    for (let i = 1; i < values.length; i++) {
      if (norm_(String(values[i][1])) === key) {
        sh.getRange(i + 1, 3).setValue((Number(values[i][2]) || 1) + 1);
        sh.getRange(i + 1, 4).setValue(now);
        return out_({ ok: true, dup: true });
      }
    }
    sh.appendRow([now, safe_(q), 1, now, page, "未対応"]);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, "【エンジニア職種マップ】質問例の追加依頼",
        "キーワード：" + q + "\nページ：" + page + "\n日時：" + now);
    }
  } finally {
    lock.releaseLock();
  }
  return out_({ ok: true });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["最初の依頼日時", "キーワード", "依頼回数", "最新の依頼日時", "ページ", "対応状況"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

// 表記ゆれ（全角・半角、大文字・小文字、空白）をそろえて同じキーワードとして数える
function norm_(s) {
  return s.normalize("NFKC").toLowerCase().replace(/\s/g, "");
}

// 「=」などで始まる文字列が数式として扱われないようにする
function safe_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
