// 募集要項チェック（すべてブラウザ内で処理し、入力内容は送信しません）
(function(){
// ===== 職種の定義 =====
const R={
 tester:{n:"テスター",sub:"テストエンジニア",f:"qa",c:"--muted",q:["テスト設計書や手順書は支給されますか？","観点の追加や手順書の修正はこちらでしてよいですか？","1日あたりの消化件数の目安はありますか？"]},
 testeng:{n:"テストエンジニア",sub:"QAエンジニア・テスター",f:"qa",c:"--c-qa",q:["仕様書はありますか？どの程度まとまっていますか？","テスト技法やケース数はこちらで決めますか？","設計のみですか、実行まで含みますか？"]},
 qa:{n:"QAエンジニア",sub:"テストリード・テストエンジニア",f:"qa",c:"--c-qa",q:["テストの範囲・スケジュール・人数を決めるのは誰ですか？","仕様を決める会議や仕様書のレビューに参加できますか？","不具合の傾向分析や品質の報告会はありますか？"]},
 qalead:{n:"QAリード / QAマネージャー",sub:"QAエンジニア",f:"qa",c:"--c-qa",q:["リリースを止める判断ができる立場ですか？","QAチームは何名で、その中での役割は何ですか？","品質基準はすでにありますか、ゼロから作りますか？"]},
 set:{n:"テスト自動化エンジニア",sub:"SET / SDET・QAエンジニア",f:"qa",c:"--c-qa",q:["自動化と手動テストの比率はどれくらいですか？","使う言語やツールは決まっていますか？","既存テストコードの保守ですか、新規構築ですか？","プロダクト本体のコードも書きますか？"]},
 uat:{n:"発注側のテスト担当",sub:"PMO・QAエンジニア",f:"qa",c:"--c-qa",q:["発注者側の立場ですか、開発側の立場ですか？","受入基準はすでに決まっていますか？"]},
 debug:{n:"デバッガー",sub:"テスター",f:"qa",c:"--muted",q:["プレイ確認が中心ですか、テスト設計も含みますか？","実機（スマホ・ゲーム機）の種類はどれくらいありますか？"]},
 security:{n:"セキュリティ診断員",sub:"セキュリティエンジニア",f:"other",c:"--warn",q:["ツールによる診断ですか、手動の診断ですか？","報告書の作成まで含みますか？"]},
 qc:{n:"製造業の品質管理の可能性",sub:"",f:"other",c:"--warn",q:["対象はソフトウェアですか、製品・部品ですか？","ISOなどの監査対応が中心ですか？"]},
 fe:{n:"フロントエンドエンジニア",sub:"フルスタック",f:"dev",c:"--c-fe",q:["デザインは支給されますか？","APIは別チームが作りますか、自分で作りますか？"]},
 markup:{n:"マークアップエンジニア / コーダー",sub:"フロントエンド・Webデザイナー",f:"dev",c:"--c-fe",q:["JavaScriptでの動きの実装は含みますか？","WordPressなどのCMSは使いますか？"]},
 be:{n:"バックエンドエンジニア",sub:"サーバーサイド・フルスタック",f:"dev",c:"--c-be",q:["画面の実装も含みますか？","決済や認証など外部サービスとの連携はありますか？","設計から担当しますか、実装からですか？"]},
 fs:{n:"フルスタックエンジニア",sub:"フロント・バック・インフラ",f:"dev",c:"--c-fs",q:["フロントとバック、比重はどちらが大きいですか？","サーバー構築などインフラも含みますか？"]},
 mobile:{n:"モバイルアプリエンジニア",sub:"フルスタック",f:"dev",c:"--c-fe",q:["サーバー側の開発も含みますか？","ストアへの申請まで担当しますか？"]},
 se:{n:"SIerの開発エンジニア",sub:"プログラマー・テストエンジニア",f:"dev",c:"--c-be",q:["担当工程は設計・実装・テストのどこまでですか？","テスト工程はどれくらいの比重ですか？"]},
 ds:{n:"UI/UXデザイナー",sub:"Webデザイナー・デザインエンジニア",f:"design",c:"--c-ds",q:["HTML/CSSのコーディングまで含みますか？","ユーザー調査などのリサーチも担当しますか？"]},
 infra:{n:"インフラエンジニア",sub:"SRE・クラウドエンジニア",f:"infra",c:"--accent",q:["アプリ開発は含みますか？","障害時の夜間・休日対応はありますか？"]},
 pm:{n:"PM / PMO",sub:"Webディレクター",f:"mgmt",c:"--c-pm",q:["技術的な判断までしますか、進捗・課題管理が中心ですか？","チームは何名規模ですか？"]},
 pdm:{n:"プロダクトマネージャー",sub:"PO・ビジネスアナリスト",f:"mgmt",c:"--c-pm",q:["要件定義書を書くのは自分ですか？","開発チームとはどのくらい近い距離で働きますか？"]}
};
const ANS={"テスト設計書や手順書は支給されますか？": [["支給される", "テストの実行が中心のテスター案件"], ["支給されない", "自分でテストを設計するテストエンジニア寄りの案件"]], "観点の追加や手順書の修正はこちらでしてよいですか？": [["してよい", "テスト設計にも関われる。テストエンジニアとしての経験が活かせる"], ["できない", "決められた手順の実行に専念する案件"]], "1日あたりの消化件数の目安はありますか？": [["ある", "件数を重視する実行中心の案件。スピードが求められる"], ["ない", "テストの質や観点を重視する現場の可能性"]], "仕様書はありますか？どの程度まとまっていますか？": [["整っている", "仕様書からテストを設計する標準的な案件"], ["ない・古い", "仕様を確認しながら進める力や探索的テストが必要。QAエンジニア寄り"]], "テスト技法やケース数はこちらで決めますか？": [["こちらで決める", "QAエンジニア寄りの裁量がある案件"], ["決まっている", "テストエンジニアとして設計作業を担当する案件"]], "設計のみですか、実行まで含みますか？": [["設計のみ", "テスト設計の経験が特に重視される"], ["実行まで", "設計から実行まで一通り担当するテストエンジニア案件"]], "テストの範囲・スケジュール・人数を決めるのは誰ですか？": [["こちらで決める", "テスト計画を担うQAエンジニア（テストリード）の案件"], ["別の人が決める", "テストエンジニアとして設計・実行を担当する案件"]], "仕様を決める会議や仕様書のレビューに参加できますか？": [["参加できる", "シフトレフト型のQA案件"], ["参加できない", "テスト工程から関わる案件"]], "不具合の傾向分析や品質の報告会はありますか？": [["ある", "品質分析のスキルが活かせる"], ["ない", "テストの設計・実行が中心"]], "リリースを止める判断ができる立場ですか？": [["できる", "品質ゲートを担うQAリードの案件"], ["できない", "判断材料をまとめて報告する役割"]], "QAチームは何名で、その中での役割は何ですか？": [["複数名をまとめる", "QAリード・QAマネージャーの案件"], ["1人目のQA", "体制づくりから任される立ち上げ案件"]], "品質基準はすでにありますか、ゼロから作りますか？": [["すでにある", "今ある基準に沿って運用する案件"], ["ゼロから作る", "品質基準づくりの経験が求められる上級者向け案件"]], "自動化と手動テストの比率はどれくらいですか？": [["自動化が多い", "コードを書くSET / SDET寄りの案件"], ["手動が多い", "QAエンジニアが自動化も一部担当する案件"]], "使う言語やツールは決まっていますか？": [["決まっている", "そのツールや言語の経験が求められる"], ["決まっていない", "ツール選びから任される可能性がある。経験豊富な人向け"]], "既存テストコードの保守ですか、新規構築ですか？": [["既存の保守", "既存のコードを読んで直す力が必要"], ["新規構築", "テストの仕組みを設計できる人向け"]], "プロダクト本体のコードも書きますか？": [["書く", "開発エンジニアに近いSDETの案件"], ["書かない", "テストコード専門の自動化エンジニアの案件"]], "発注者側の立場ですか、開発側の立場ですか？": [["発注者側", "受入テストや開発会社とのやりとりが中心。PMO寄り"], ["開発側", "開発会社のQAエンジニアとしての案件"]], "受入基準はすでに決まっていますか？": [["決まっている", "基準に沿ってテストを行う"], ["決まっていない", "受入基準づくりから担当する"]], "プレイ確認が中心ですか、テスト設計も含みますか？": [["プレイ確認中心", "デバッガー（テスター）の案件"], ["設計も含む", "ゲームのテストエンジニア・QAの案件"]], "実機（スマホ・ゲーム機）の種類はどれくらいありますか？": [["多い", "端末ごとの違いによる不具合の確認が多い"], ["少ない", "機能の確認が中心"]], "ツールによる診断ですか、手動の診断ですか？": [["ツール診断", "ツールの操作と結果の確認が中心"], ["手動診断", "高度な専門知識が必要な案件"]], "報告書の作成まで含みますか？": [["含む", "報告書を書く力も求められる"], ["含まない", "診断作業に専念する"]], "対象はソフトウェアですか、製品・部品ですか？": [["ソフトウェア", "QAエンジニアの案件として扱える"], ["製品・部品", "製造業の品質管理。IT系の案件ではない可能性が高い"]], "ISOなどの監査対応が中心ですか？": [["中心", "品質マネジメントや監査対応の案件"], ["中心ではない", "検査や品質改善の実務が中心"]], "デザインは支給されますか？": [["支給される", "実装に専念するフロントエンド案件"], ["支給されない", "デザインも求められる。デザインエンジニア寄り"]], "APIは別チームが作りますか、自分で作りますか？": [["別チーム", "フロントエンド専任の案件"], ["自分で作る", "フルスタック寄りの案件"]], "JavaScriptでの動きの実装は含みますか？": [["含む", "フロントエンド寄りの案件"], ["含まない", "HTML/CSS中心のコーダー案件"]], "WordPressなどのCMSは使いますか？": [["使う", "WordPressなどの経験が求められる"], ["使わない", "ページ制作が中心"]], "画面の実装も含みますか？": [["含む", "フルスタック寄りの案件"], ["含まない", "バックエンド専任の案件"]], "決済や認証など外部サービスとの連携はありますか？": [["ある", "決済や認証の開発経験があると有利"], ["ない", "社内のデータ処理が中心"]], "設計から担当しますか、実装からですか？": [["設計から", "経験者向けの上流工程を含む案件"], ["実装から", "設計書に沿ってつくる案件"]], "フロントとバック、比重はどちらが大きいですか？": [["フロントが大きい", "フロントエンドの経験が重視される"], ["バックが大きい", "バックエンドの経験が重視される"]], "サーバー構築などインフラも含みますか？": [["含む", "AWSなどの経験も必要"], ["含まない", "アプリ開発に専念する"]], "サーバー側の開発も含みますか？": [["含む", "バックエンドの経験も必要"], ["含まない", "アプリ側の開発に専念する"]], "ストアへの申請まで担当しますか？": [["担当する", "リリース作業の経験が求められる"], ["担当しない", "開発に専念する"]], "担当工程は設計・実装・テストのどこまでですか？": [["設計から", "SE（設計担当）の案件"], ["実装が中心", "プログラマー寄りの案件"], ["テストが中心", "実質的にテストエンジニアの案件"]], "テスト工程はどれくらいの比重ですか？": [["大きい", "QA・テスト経験者にも合う案件"], ["小さい", "開発経験が重視される案件"]], "HTML/CSSのコーディングまで含みますか？": [["含む", "デザインエンジニア寄りの案件"], ["含まない", "デザイン専任の案件"]], "ユーザー調査などのリサーチも担当しますか？": [["担当する", "UXデザイナー寄りの案件"], ["担当しない", "画面デザインが中心"]], "アプリ開発は含みますか？": [["含む", "開発経験も必要。フルスタック寄り"], ["含まない", "インフラ専任の案件"]], "障害時の夜間・休日対応はありますか？": [["ある", "夜間・休日の呼び出し対応あり。働き方の条件に影響する"], ["ない", "構築や改善が中心"]], "技術的な判断までしますか、進捗・課題管理が中心ですか？": [["技術判断まで", "技術に強いPMの案件"], ["管理が中心", "PMOの案件"]], "チームは何名規模ですか？": [["10名以上", "管理の経験が重視される"], ["少人数", "実務も兼ねる可能性がある"]], "要件定義書を書くのは自分ですか？": [["自分", "企画から仕様づくりまで担う案件"], ["別の人", "優先順位づけや判断が中心の案件"]], "開発チームとはどのくらい近い距離で働きますか？": [["近い", "開発チームと一緒に動く"], ["遠い", "企画・事業側の立場が中心"]], "チームは何名で、どのような体制ですか？（開発・QAそれぞれの人数）": [["大人数", "役割が分かれている。担当範囲を確認すると安心"], ["少人数", "1人で幅広く担当する可能性がある"]], "開発はアジャイルとウォーターフォールのどちらで進めていますか？": [["アジャイル", "短い周期でテストを繰り返す。QAもチームの一員として動くことが多い"], ["ウォーターフォール", "後半のテスト工程にまとまって関わることが多い"]], "対象のプロダクトは何ですか？（Webサービス、スマホアプリ、業務システムなど）": [["Webサービス・アプリ", "リリースの頻度が高い現場が多い"], ["業務システム・金融など", "ドキュメントや手順を重視する現場が多い"]], "テスト自動化は行っていますか？今後の予定はありますか？": [["行っている・予定あり", "自動化の経験があると評価されやすい"], ["行っていない", "手動テスト中心の案件"]], "テスト設計やテスト計画もこちらで担当しますか？": [["担当する", "テストエンジニア・QAエンジニアの案件"], ["担当しない", "テストの実行が中心のテスター案件"]], "仕様を決める段階からQAとして関われますか？": [["関われる", "シフトレフト型のQA案件"], ["関われない", "テスト工程から関わる案件"]]};
Object.assign(ANS,{
 "新しく作る開発ですか、それとも運用中のシステムの改修・保守ですか？":[["新規開発","仕組みを一から考えて作り上げる経験が評価されやすい"],["改修・保守","今ある仕組みを読み解き、影響を確かめながら直す経験が評価されやすい"]],
 "自社サービスの開発ですか、それともお客様のシステムを作る受託開発ですか？":[["自社サービス","仕様から考えて改善を提案する力や、スピードが求められやすい"],["受託開発","資料作成や工程の管理、お客様とのやりとりの力が求められやすい"]],
 "サービスの利用者数や、システム全体の規模はどれくらいですか？":[["大規模","大人数での開発の進め方や、手順・資料に沿って進める経験が評価されやすい"],["小〜中規模","1人で幅広く担当する場面が多く、柔軟さが求められやすい"]],
 "参画する方には、チームの中でどんな役割を期待していますか？（まとめ役・メンバーなど）":[["まとめ役","リーダーの経験が必要。単価は高めになることが多い"],["メンバー","手を動かす実務の経験が重視される"]]
});
const FAM={qa:"QA・テスト",dev:"開発",design:"デザイン",infra:"インフラ",mgmt:"マネジメント・企画",other:"その他"};

// ===== キーワード辞書 [語, {職種:重み}, オプション] =====
// cs: 大文字小文字を区別  b: 英数字の単語境界を要求
const K=[];
const add=(words,w,o={})=>words.split("|").forEach(x=>K.push({k:x,w,cs:!!o.cs,b:o.b!==false&&/^[A-Za-z0-9.#+\/ -]+$/.test(x)}));
// QA系
add("テスター",{tester:5});
add("テスト実施|テスト実行|テスト消化|テスト作業|検証作業|試験実施|エビデンス取得|手順書",{tester:3});
add("動作確認|結果記録",{tester:1});
add("手順書なし|手順書無し|手順書はありません",{testeng:3,qa:1});
add("テストエンジニア|テスト技術者|検証エンジニア",{testeng:5});
add("テストケース作成|テスト設計|テスト項目書|テスト仕様書|テストケース|テスト観点|観点出し|テスト技法|境界値|同値分割|デシジョンテーブル|結合テスト|システムテスト|総合テスト|回帰テスト|リグレッションテスト|JSTQB",{testeng:3,qa:1});
add("第三者検証",{testeng:3});
add("QAエンジニア|品質保証エンジニア|QA Engineer",{qa:5});
add("品質保証|QA",{qa:3},{cs:true});
add("テスト計画|テスト戦略|品質分析|不具合分析|品質改善|プロセス改善|メトリクス|品質指標|シフトレフト|仕様レビュー|設計レビュー|要件レビュー|探索的テスト|上流から|要件定義から",{qa:3});
add("不具合管理|バグ管理|JIRA|Redmine|Backlog",{qa:1,testeng:1});
add("QAリード|QAマネージャー|QAマネジャー|テストリード|テストマネージャー|品質責任者",{qalead:5});
add("リリース判定|品質基準|品質保証体制|QA体制|体制構築|組織立ち上げ|メンバー管理|メンバーの育成|チームマネジメント",{qalead:3,qa:1});
add("テスト自動化|自動テスト|自動化テスト|E2Eテスト|E2E",{set:4});
add("Playwright|Selenium|Cypress|Appium|Puppeteer|WebdriverIO|Autify|MagicPod|mabl|T-DASH",{set:3});
add("SET|SDET",{set:5},{cs:true});
add("CI/CD|CI|テスト基盤|テスタビリティ|GitHub Actions|Jenkins|CircleCI",{set:2,infra:1},{cs:true});
add("ユニットテスト|単体テスト|Jest|JUnit|pytest|Vitest",{set:1,be:1,fe:1});
add("性能テスト|負荷テスト|パフォーマンステスト|JMeter|k6|Gatling|LoadRunner|Locust",{qa:2,infra:2,set:1});
add("脆弱性診断|セキュリティテスト|セキュリティ診断|ペネトレーションテスト|ペネトレーション",{security:5});
add("デバッガー|ゲームデバッグ|デバッグ作業",{debug:5});
add("ゲーム",{debug:1});
add("受入テスト|受け入れテスト|受入れテスト|UAT",{uat:4});
add("品質管理",{qa:1,qc:1});
add("QC|ISO|製品検査|部品|工場|製造業|検査工程|出荷検査",{qc:3},{cs:true});
// 開発系
add("フロントエンド|フロントエンジニア",{fe:5});
add("React|Vue|Vue.js|Next.js|Nuxt|Angular|Svelte|SPA|画面実装|UI実装",{fe:3});
add("TypeScript",{fe:2,be:1,set:1});
add("JavaScript",{fe:2});
add("マークアップ|コーダー|LP制作|WordPress",{markup:4});
add("HTML|CSS|Sass|SCSS",{markup:2,fe:1});
add("コーディング",{markup:1,se:1});
add("バックエンド|サーバーサイド",{be:5});
add("API開発|API設計|DB設計|データベース設計|SQL|MySQL|PostgreSQL|Oracle|Java|PHP|Ruby|Rails|Ruby on Rails|Laravel|Spring|Spring Boot|Django|Golang|C#|.NET|Scala|Rust",{be:3});
add("Go",{be:3},{cs:true});
add("Python",{be:2,set:1});
add("Node.js",{be:2,fe:1});
add("フルスタック",{fs:5});
add("Webエンジニア|Webアプリ開発|Webアプリケーション開発",{fs:2});
add("iOS|Android|Swift|Flutter|React Native|モバイルアプリ|スマホアプリ|ネイティブアプリ",{mobile:3});
add("Kotlin",{mobile:2,be:1});
add("SE|PG",{se:3},{cs:true});
add("システムエンジニア|プログラマー|SIer|基本設計|詳細設計",{se:3});
add("デザイナー|UIデザイナー|UXデザイナー|Webデザイナー",{ds:5});
add("Figma|UI/UX|UIデザイン|UXデザイン|ワイヤーフレーム|Photoshop|Illustrator|Adobe XD",{ds:3});
add("インフラエンジニア|SRE|クラウドエンジニア",{infra:5},{cs:true});
add("社会インフラ|インフラ企業",{});
add("インフラ",{infra:1});
add("QA戦略|品質戦略|品質保証戦略|品質を作り込む",{qa:3});
add("AWS|GCP|Azure|サーバー構築|Docker|Kubernetes|Terraform|Linux|ネットワーク構築",{infra:3},{cs:true});
add("PMO|プロジェクトマネージャー|プロジェクトマネジャー|Webディレクター|ディレクター",{pm:5});
add("PM",{pm:4},{cs:true});
add("進行管理|進捗管理|課題管理|ディレクション|ベンダーコントロール",{pm:2});
add("PdM|プロダクトマネージャー|プロダクトオーナー",{pdm:5});
add("PO",{pdm:4},{cs:true});
add("企画|要件定義",{pdm:1,se:1,qa:1});
K.sort((a,b)=>b.k.length-a.k.length);

// ===== 見出し（セクション）の判定 =====
const SEC=[
 {id:"title",w:1.5,lb:"案件名",re:/案件名|件名|タイトル|募集職種|募集ポジション|職種|ポジション/},
 {id:"duty",w:1.5,lb:"業務内容",re:/業務内容|仕事内容|作業内容|担当業務|業務概要|案件概要|案件内容|概要|ミッション|お任せ|役割/},
 {id:"want",w:.5,lb:"歓迎",re:/歓迎|尚可|WANT|Want|あれば|優遇|プラス/},
 {id:"must",w:1,lb:"必須",re:/必須|MUST|Must|応募資格|必要なスキル|求めるスキル|必要スキル|応募条件|求める経験/},
 {id:"env",w:.6,lb:"開発環境",re:/開発環境|使用技術|技術スタック|使用ツール|環境|言語|ツール/},
 {id:"misc",w:1,lb:"",re:/稼働|勤務|単価|報酬|リモート|業界|場所|期間|面談|条件|その他|メリット|情報|会社|企業/},
 {id:"other",w:1,lb:"",re:/./}
];
const HEAD=/^\s*(?:【([^】]{1,20})】|■\s*([^\s:：■]{1,20})|[●◆◇□▼▽◎◼︎]\s*([^\s:：]{1,20})|\[([^\]]{1,20})\]|＜([^＞]{1,20})＞|<([^>]{1,20})>|#+\s*(.{1,20})|([^\s:：・\-]{2,14})\s*[:：]\s*$)/;

// 修飾語
const MOD=/(だけではなく|だけでなく|のみならず|経験は不要|経験不要|経験は不問|経験不問|未経験可|未経験OK|未経験でも|未経験歓迎|なくても可|なくても|不問|は対象外|対象外|含みません|含まない|ではありません|ではなく|行いません|しません|ありません|不要|以外|除く|なし|無し|尚可|歓迎|優遇|あれば|望ましい|プラス)/g;
const modType=s=>/だけ|のみならず/.test(s)?"part":/経験|未経験|なくても|不問/.test(s)?"exp":/尚可|歓迎|優遇|あれば|望ましい|プラス/.test(s)?"want":"neg";
const CONNECT=/^[\s、,，・\/／|｜や及およびとorまたは()（）「」『』]*$/;
const FUT=/将来的|ゆくゆく|いずれは|今後は|今後、/;
const isW=c=>c!==undefined&&/[A-Za-z]/.test(c);

function analyze(raw){
  const text=raw.normalize("NFKC").replace(/\r\n?/g,"\n");
  const low=text.toLowerCase();
  const occ=new Uint8Array(text.length);
  const M=[];
  // 1) キーワード検出（長い語を優先、重複は除外）
  for(const e of K){
    const hay=e.cs?text:low, nd=e.cs?e.k:e.k.toLowerCase();
    let i=hay.indexOf(nd);
    while(i!==-1){
      const j=i+nd.length;
      let ok=true;
      if(e.b&&(isW(text[i-1])||isW(text[j])))ok=false;
      if(ok&&/^\s*\d+\s*(名|人)/.test(text.slice(j,j+8)))ok=false;
      if(ok)for(let p=i;p<j;p++)if(occ[p]){ok=false;break;}
      if(ok){for(let p=i;p<j;p++)occ[p]=1;if(Object.keys(e.w).length)M.push({s:i,e:j,k:e.k,w:e.w,t:text.slice(i,j)});}
      i=hay.indexOf(nd,i+1);
    }
  }
  M.sort((a,b)=>a.s-b.s);
  // 2) 行ごとのセクション
  const lines=text.split("\n");let pos=0,cur=SEC[SEC.length-1],firstDone=false;const lineSec=[];
  let anyHead=false;
  for(const ln of lines){
    const h=ln.match(HEAD);let lbl=null;
    if(h){lbl=h.slice(1).find(Boolean);}
    if(!lbl){const tl=ln.trim();if(tl.length>=2&&tl.length<=12&&!/[、。:：,，\/／A-Za-z0-9]/.test(tl)&&!K.some(e=>e.k.length>1&&tl.includes(e.k))){const hit=SEC.slice(0,-1).find(s=>s.re.test(tl));if(hit)lbl=tl;}}
    if(lbl){anyHead=true;cur=SEC.find(s=>s.re.test(lbl));}
    let sec=cur;
    if(!firstDone&&ln.trim()){firstDone=true;if((!lbl||cur.id==="misc"||cur.id==="other")&&ln.trim().length<=80&&lines.filter(x=>x.trim()).length>1){sec=SEC[0];if(lbl)cur=SEC[SEC.length-1];}}
    lineSec.push({s:pos,e:pos+ln.length,sec});pos+=ln.length+1;
  }
  const secAt=p=>{for(const l of lineSec)if(p>=l.s&&p<=l.e)return l.sec;return SEC[SEC.length-1];};
  // 3) 修飾語（否定・歓迎・経験不問・将来）
  const mods=[];let mm;MOD.lastIndex=0;
  while((mm=MOD.exec(text))){let inside=false;for(let p=mm.index;p<mm.index+mm[0].length;p++)if(occ[p]){inside=true;break;}
    if(!inside)mods.push({s:mm.index,e:mm.index+mm[0].length,t:mm[0],type:modType(mm[0])});}
  M.forEach((m,i)=>{
    const se=(()=>{const a=text.indexOf("。",m.e),b=text.indexOf("\n",m.e);const c=[a,b].filter(x=>x>=0);return c.length?Math.min(...c):text.length;})();
    const md=mods.find(x=>x.s>=m.e&&x.s<se);
    m.mod=null;
    if(md){
      let c=m.e,j=i+1;
      while(j<M.length&&M[j].s<md.s){const gap=text.slice(c,M[j].s);if(CONNECT.test(gap)){c=M[j].e;j++;}else break;}
      const gap2=text.slice(c,md.s);
      if(!/[、,，]/.test(gap2)&&gap2.length<=25)m.mod=md.type;
    }
    if(!m.mod){
      const ls=Math.max(text.lastIndexOf("。",m.s),text.lastIndexOf("\n",m.s),text.lastIndexOf("、",m.s));
      if(FUT.test(text.slice(ls+1,m.s)))m.mod="future";
    }
    m.sec=secAt(m.s);
    const mul=m.mod==="neg"?0:(m.mod?0.5:1);
    m.f=mul*m.sec.w;
  });
  // 4) 職種スコア
  const S={},EV={};
  M.forEach(m=>{for(const r in m.w){const v=m.w[r]*m.f;if(v<=0)continue;S[r]=(S[r]||0)+v;(EV[r]=EV[r]||[]).push(m);}});
  const ranked=Object.keys(S).map(r=>({r,s:S[r]})).sort((a,b)=>b.s-a.s);
  return {text,M,ranked,EV,anyHead};
}

// ===== 書かれていない情報のチェック =====
const STEPS=[["要件定義",/要件定義|要求定義|上流/],["設計",/基本設計|詳細設計|設計(?!書の)|アーキテクチャ/],["実装",/実装|製造|コーディング|プログラミング|開発(業務|作業|を担当|全般)|API開発|機能開発/],["テスト",/テスト|検証|試験|QA/],["運用・保守",/運用|保守|監視|障害対応/]];
function gaps(a){
  const t=a.text,out=[],qs=[];
  const top=a.ranked[0]?.r, topF=top?R[top].f:null;
  if(!/アジャイル|スクラム|ウォーターフォール|スプリント|イテレーション|V字/.test(t)){out.push({m:"開発の進め方（アジャイル・ウォーターフォールなど）が書かれていません。"});qs.push(["開発はアジャイルとウォーターフォールのどちらで進めていますか？","開発手法"]);}
  if(!/Web|アプリ|ゲーム|業務システム|基幹|SaaS|EC|サイト|組込|組み込み|金融|医療|サービス|プロダクト/i.test(t)){out.push({m:"どんなプロダクトを対象にするのかが書かれていません。"});qs.push(["対象のプロダクトは何ですか？（Webサービス、スマホアプリ、業務システムなど）","対象"]);}
  if(topF==="qa"){
    const hasAuto=a.M.some(m=>m.w.set&&m.f>0), hasDesign=/テスト設計|テストケース作成|テスト計画|観点/.test(t);
    if(!hasAuto){out.push({m:"テスト自動化についての記載がありません。手動テスト中心の案件かもしれません。"});qs.push(["テスト自動化は行っていますか？今後の予定はありますか？","自動化"]);}
    else if(!/手動/.test(t)){qs.push(["自動化と手動テストの比率はどれくらいですか？","自動化の割合"]);}
    if(!hasDesign){out.push({m:"テスト設計・計画を担当するかどうかが書かれていません。テストの実行のみの可能性があります。"});qs.push(["テスト設計やテスト計画もこちらで担当しますか？","担当範囲"]);}
    if(!/要件定義|仕様レビュー|上流|シフトレフト|仕様策定/.test(t)){qs.push(["仕様を決める段階からQAとして関われますか？","参画工程"]);}
  }
  if(topF==="dev"&&!/設計/.test(t)){qs.push(["設計から担当しますか、実装からですか？","参画工程"]);}
  if(a.EV.qc&&!/ソフトウェア|システム|アプリ|Web|サービス|プロダクト/i.test(t)){out.unshift({m:"「品質管理」「QC」などがあり、ソフトウェアの話か読み取れません。製造業の品質管理の案件の可能性があります。",warn:true});}
  const negs=a.M.filter(m=>m.mod==="neg");
  if(negs.length)out.push({m:"対象外と書かれている作業："+[...new Set(negs.map(m=>m.t))].join("、")+"（判定から除外しました）",info:true});
  return {out,qs};
}

// ===== 案件の位置づけ =====
// 手がかりの言葉。直後に「なし」「不要」などが続くものは手がかりにしない
const POS={
 biz:/自社サービス|自社プロダクト|自社開発|自社アプリ|内製|事業会社|BtoC|プロダクト開発|プロダクトチーム/g,
 si:/受託|SIer|SI案件|SI企業|元請|一次請|二次請|三次請|プライム案件|エンドクライアント|エンドユーザー企業/g,
 scale:/利用者|ユーザー数|会員数|DAU|MAU|万人|万ユーザー|大規模|中規模|小規模|全国|基幹システム|数百万|数千万/g,
 team:/\d+\s*(名|人)(?!目|以上の経験)/g,
 lead:/リード(?!タイム)|リーダー|牽引|推進役|1人目|一人目|取りまとめ|まとめ役|責任者/g,
 member:/メンバーとして|メンバーポジション|サポート業務|補佐|指示のもと|指示に従|作業者|手順書に沿/g,
 fresh:/新規開発|新規サービス|新規プロダクト|新規事業|スクラッチ開発|ゼロから|0から|0→1/g,
 maint:/運用保守|保守運用|運用・保守|保守開発|改修|機能追加|追加開発|エンハンス|リプレイス|移行|運用中/g
};
const NEGNEXT=/^\s*(は|も)?\s*(なし|無し|不要|ありません|ではありません|ではない|不可|しません)/;
const SKIP={
 team:(t,i)=>/募集|採用|面談|面接|人数[:：]?\s*$/.test(t.slice(Math.max(0,i-8),i))
};
function hits(t,key){
  const re=POS[key],res=[];re.lastIndex=0;let m;
  while((m=re.exec(t))){const e=m.index+m[0].length;
    if(NEGNEXT.test(t.slice(e,e+10)))continue;
    if(SKIP[key]&&SKIP[key](t,m.index))continue;
    res.push(m);}
  return res;
}
function snips(t,key,max=3){
  const out=[],lines=new Set();
  for(const m of hits(t,key)){
    if(out.length>=max)break;
    const ls=t.lastIndexOf("\n",m.index)+1, le=(x=>x<0?t.length:x)(t.indexOf("\n",m.index));
    if(lines.has(ls))continue;lines.add(ls);
    const a=Math.max(ls,m.index-16), b=Math.min(le,m.index+m[0].length+16);
    let s=t.slice(a,b).trim(); if(a>ls)s="…"+s; if(b<le)s=s+"…";
    out.push(s);
  }
  return out;
}
const has=(t,key)=>hits(t,key).length>0;
function position(t){
  const biz=has(t,"biz"), si=has(t,"si"), rows=[], qs=[];
  // 企業のタイプ
  let v,cls="on",note="";
  if(biz&&!si){v="事業会社（自社サービス）の可能性が高い";note="仕様から考えて改善を提案する力や、スピードが求められやすい傾向があります。";}
  else if(si&&!biz){v="SIer・受託開発の可能性が高い";note="資料作成や工程の管理、お客様とのやりとりの力が求められやすい傾向があります。";}
  else if(si&&biz){v="どちらの手がかりもある";note="自社サービスか受託開発か、企業に確認すると確実です。";qs.push("自社サービスの開発ですか、それともお客様のシステムを作る受託開発ですか？");}
  else{v="書かれていない";cls="unk";qs.push("自社サービスの開発ですか、それともお客様のシステムを作る受託開発ですか？");}
  rows.push({k:"企業のタイプ",v,cls,note,ev:[...snips(t,"biz",2),...snips(t,"si",2)]});
  // 開発のフェーズ
  const fr=has(t,"fresh"), mt=has(t,"maint");
  if(fr&&!mt)rows.push({k:"開発のフェーズ",v:"新規開発の可能性が高い",cls:"on",note:"仕組みを一から考えて作り上げる力が求められやすいです。",ev:snips(t,"fresh",2)});
  else if(mt&&!fr)rows.push({k:"開発のフェーズ",v:"今あるシステムの改修・保守・作り直しの可能性が高い",cls:"on",note:"今ある仕組みを読み解いて、影響を確かめながら進める力が求められやすいです。",ev:snips(t,"maint",2)});
  else if(fr&&mt)rows.push({k:"開発のフェーズ",v:"どちらの手がかりもある",cls:"on",note:"新規開発と改修のどちらが中心か、企業に確認すると確実です。",ev:[...snips(t,"fresh",1),...snips(t,"maint",1)]});
  else{rows.push({k:"開発のフェーズ",v:"書かれていない",cls:"unk",ev:[]});qs.push("新しく作る開発ですか、それとも運用中のシステムの改修・保守ですか？");}
  // 規模
  const sc=snips(t,"scale");
  if(sc.length)rows.push({k:"開発の規模",v:"手がかりあり",cls:"on",ev:sc});
  else{rows.push({k:"開発の規模",v:"書かれていない",cls:"unk",ev:[]});qs.push("サービスの利用者数や、システム全体の規模はどれくらいですか？");}
  // チーム
  const tm=snips(t,"team");
  if(tm.length)rows.push({k:"チームの人数",v:"記載あり",cls:"on",ev:tm});
  else{rows.push({k:"チームの人数",v:"書かれていない",cls:"unk",ev:[]});qs.push("チームは何名で、どのような体制ですか？（開発・QAそれぞれの人数）");}
  // 立ち位置
  const ld=has(t,"lead"), mb=has(t,"member");
  let pv,pc="on",pn="",lead=false;
  if(ld&&!mb){pv="まとめ役・推進役の可能性";pn="リーダーやチームを引っ張った経験が求められそうです。";lead=true;}
  else if(mb&&!ld){pv="メンバーとして手を動かす役割の可能性";pn="指示に沿って実務を進める経験が重視されそうです。";}
  else if(ld&&mb){pv="どちらの手がかりもある";pn="期待される役割を企業に確認すると確実です。";qs.push("参画する方には、チームの中でどんな役割を期待していますか？（まとめ役・メンバーなど）");}
  else{pv="書かれていない";pc="unk";qs.push("参画する方には、チームの中でどんな役割を期待していますか？（まとめ役・メンバーなど）");}
  rows.push({k:"参画者の立ち位置",v:pv,cls:pc,note:pn,ev:[...snips(t,"lead",2),...snips(t,"member",2)]});
  return {rows,qs,biz:biz&&!si,si:si&&!biz,lead,fresh:fr&&!mt,maint:mt&&!fr};
}

// ===== 技術の近さ =====
const TD=window.TECH||{techs:{},links:[]};
const TA=[];Object.entries(TD.techs).forEach(([id,t])=>t.a.forEach(x=>TA.push({id,x,cs:!!t.cs,b:/^[A-Za-z0-9.#+\/ -]+$/.test(x)})));
TA.sort((p,q)=>q.x.length-p.x.length);
function findTech(text){
  const low=text.toLowerCase(),occ=new Uint8Array(text.length),found={};
  for(const e of TA){
    const hay=e.cs?text:low,nd=e.cs?e.x:e.x.toLowerCase();let i=hay.indexOf(nd);
    while(i!==-1){const j=i+nd.length;let ok=!(e.b&&(isW(text[i-1])||isW(text[j])));
      if(ok)for(let p=i;p<j;p++)if(occ[p]){ok=false;break;}
      if(ok){for(let p=i;p<j;p++)occ[p]=1;if(!(e.id in found)||found[e.id]>i)found[e.id]=i;}
      i=hay.indexOf(nd,i+1);}
  }
  return Object.keys(found).sort((p,q)=>found[p]-found[q]);
}
const LV={pair:"セットで使う",near:"かなり近い",similar:"考え方は近い",diff:"別物に注意"};
const LVO=["pair","near","similar","diff"];
function partners(id){
  const r=[];TD.links.forEach(([x,y,lv,n])=>{if(x===id)r.push({id:y,lv,n});else if(y===id)r.push({id:x,lv,n});});
  return r.sort((p,q)=>LVO.indexOf(p.lv)-LVO.indexOf(q.lv));
}
let TECHCTX={tech:"◯◯",near:"△△"};
function pickCtx(ids){
  for(const lv of ["near","similar"])for(const id of ids){const p=partners(id).find(x=>x.lv===lv&&!ids.includes(x.id));if(p)return {tech:TD.techs[id].n,near:TD.techs[p.id].n};}
  return ids.length?{tech:TD.techs[ids[0]].n,near:"△△"}:{tech:"◯◯",near:"△△"};
}

// ===== エンジニアに聞く質問 =====
const ENG={
 tester:["テストの実行と不具合の報告は、どんなシステムで、どれくらいの期間担当しましたか？","不具合を見つけたとき、どんな形で報告していましたか？（再現手順・画面の記録など）"],
 testeng:["テスト設計（テストケースを作る作業）から担当した経験はありますか？どんな技法を使いましたか？","1つの機能に対して、どれくらいの数のテストケースを作っていましたか？"],
 qa:["テスト計画（範囲・スケジュール・人数を決める作業）を担当した経験はありますか？","仕様書のレビューや、仕様を決める会議に参加した経験はありますか？","不具合の傾向を分析して、開発チームに改善を提案した経験はありますか？"],
 qalead:["QAチームをまとめた経験はありますか？何名規模でしたか？","品質基準づくりやリリース判定に関わった経験はありますか？"],
 set:["テスト自動化で使ったツールと言語、ご自身でどこまで作ったかを教えてください。","自動テストを定期的に動かす仕組み（CI）を作った経験はありますか？"],
 uat:["発注者側の立場で、受入テストを担当した経験はありますか？"],
 debug:["ゲームのデバッグ経験はありますか？どんなジャンル・機種でしたか？"],
 security:["脆弱性診断の経験はありますか？ツールによる診断ですか、手動の診断ですか？"],
 qc:["ソフトウェアのテスト・QAの経験と、製造業の品質管理の経験のどちらがありますか？"],
 fe:["画面の実装で使った技術と、担当した範囲を教えてください。","デザインどおりに作るだけでなく、使いやすさの改善を提案した経験はありますか？"],
 markup:["HTML/CSSでのページ制作に加えて、JavaScriptで動きを付けた経験はありますか？"],
 be:["データベースの設計や、APIの設計から担当した経験はありますか？","大量のデータやアクセスを扱うシステムの経験はありますか？"],
 fs:["フロントエンドとバックエンド、どちらの経験が長いですか？"],
 mobile:["iOSとAndroidのどちらの経験がありますか？ストアへの公開まで担当しましたか？"],
 se:["担当した工程を教えてください（設計・実装・テストのどこからどこまで）。"],
 ds:["画面デザインに加えて、ユーザー調査やHTML/CSSの経験はありますか？"],
 infra:["クラウド（AWSなど）の構築経験と、運用中の障害対応の経験はありますか？","インフラの設定をコードで管理した経験（Terraformなど）はありますか？"],
 pm:["何名規模のチームを管理した経験がありますか？","スケジュールの遅れや問題が起きたとき、どのように立て直しましたか？"],
 pdm:["機能の優先順位を決めたり、要件をまとめたりした経験はありますか？"]
};
function engQs(a,pos,techs,top,max){
  const q=[];const seen=new Set();const push=(x,w)=>{if(!seen.has(x)){seen.add(x);q.push([x,w]);}};
  if(pos.biz)push("自社サービス（事業会社）の開発に関わった経験はありますか？","この案件は自社サービスの開発の可能性が高いため");
  else if(pos.si)push("受託開発（SIer）の現場での経験はありますか？お客様とのやりとりや資料作成の経験も教えてください。","この案件はSIer・受託開発の可能性が高いため");
  else push("事業会社（自社サービス）とSIer（受託開発）、どちらでの経験が長いですか？","企業のタイプによって評価される経験が変わるため");
  if(pos.fresh)push("新規開発（一から作る開発）に関わった経験はありますか？どの段階から関わりましたか？","この案件は新規開発の可能性が高いため");
  else if(pos.maint)push("運用中のシステムの改修・保守の経験はありますか？","この案件は今あるシステムの改修・保守・作り直しの可能性が高いため");
  else push("新規開発と、運用中のシステムの改修・保守、どちらの経験が多いですか？","開発のフェーズによって評価される経験が変わるため");
  push("これまでのプロジェクトで、サービスの利用者数やチームの人数はどれくらいでしたか？","案件の規模と合うか確かめるため");
  if(pos.lead)push("チームをまとめたり、作業を割り振ったりした経験はありますか？","まとめ役を期待されている可能性があるため");
  else push("前のプロジェクトでは、チームの中でどんな役割でしたか？","立ち位置が合うか確かめるため");
  top.filter(x=>x.s>=max*.4).slice(0,2).forEach(x=>(ENG[x.r]||[]).forEach(e=>push(e,R[x.r].n+"に近いと判定したため")));
  techs.filter(id=>!TD.techs[id].minor&&(partners(id).some(p=>p.lv!=="diff")||TD.techs[id].ask)).slice(0,4).forEach(id=>{
    const t=TD.techs[id],cand=partners(id).filter(p=>(p.lv==="near"||p.lv==="similar")&&!techs.includes(p.id)),best=cand.some(p=>p.lv==="near")?cand.filter(p=>p.lv==="near"):cand,alt=best.slice(0,2).map(p=>TD.techs[p.id].n);
    push(`${t.n}の実務経験はありますか？（期間と、どんな開発で使ったか）${alt.length?`ない場合、近い技術（${alt.join("・")}）の経験はありますか？`:""}`,`募集要項に${t.n}が書かれているため`);
    if(t.ask)push(t.ask,`${t.n}は用途によって経験の中身が変わるため`);
  });
  return q;
}

// ===== 表示 =====
const $=id=>document.getElementById(id);
const ta=$("ckText"),out=$("ckOut"),hl=$("ckHl"),st=$("ckStatus");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TAG={part:"ほかも担当",neg:"対象外",exp:"経験不問",want:"歓迎",future:"将来"};
let isSample=false,lastCo=[],lastEn=[],curTab="co";
function qList(qs,withAns){return `<ol class="qs">${qs.map(([q,s])=>`<li><span class="qq">${esc(q)}</span><small class="why">${esc(s)}</small>${withAns&&ANS[q]?`<ul class="ans">${ANS[q].map(([a,m])=>`<li><b>${esc(a)}</b><span>⇒ ${esc(m)}</span></li>`).join("")}</ul>`:""}</li>`).join("")}</ol>`;}
function render(){
  const raw=ta.value;
  if(!raw.trim()){out.innerHTML=`<div class="ck-card"><h3>結果がここに出ます</h3><p style="color:var(--muted);font-size:.9rem">左の欄に募集要項を貼り付けるか、ファイルを読み込んでください。「サンプルを入れる」で動きを確認できます。</p></div>`;hl.innerHTML="";$("ckHlWrap").hidden=true;lastCo=[];lastEn=[];TECHCTX={tech:"◯◯",near:"△△"};renderAsk();return;}
  const a=analyze(raw),g=gaps(a),pos=position(a.text),techs=findTech(a.text);
  $("ckHlWrap").hidden=false;
  const top=a.ranked.slice(0,3), max=top[0]?.s||1;
  let h="";
  // 案件の位置づけ
  h+=`<div class="ck-card"><h3>案件の位置づけ${isSample?'<span class="ck-sample">サンプル</span>':""}</h3><div class="pos">${pos.rows.map(r=>`<div class="pos-row"><div class="pos-k">${r.k}</div><div class="pos-v"><span class="pv ${r.cls}">${esc(r.v)}</span>${r.note?`<small>${esc(r.note)}</small>`:""}${r.ev.length?`<div class="pev">${r.ev.map(e=>`<q>${esc(e)}</q>`).join("")}</div>`:""}</div></div>`).join("")}</div>
  <p class="ck-small">規模や立ち位置によって、求められる経験や単価の目安が変わります。「書かれていない」項目は、下の「企業に聞く」に質問を入れています。</p></div>`;
  // 職種
  h+=`<div class="ck-card"><h3>近い職種</h3>`;
  if(!top.length){h+=`<p style="font-size:.9rem;color:var(--muted)">職種を判断できるキーワードが見つかりませんでした。業務内容の部分が入っているか確認してください。</p>`;}
  top.forEach((x,i)=>{const r=R[x.r];const pct=Math.round(x.s/max*100);
    const ev=[];const seen=new Set();(a.EV[x.r]||[]).forEach(m=>{const key=m.t+(m.mod||"")+m.sec.id;if(seen.has(key))return;seen.add(key);ev.push(m);});
    h+=`<div class="rk" style="color:var(${r.c})"><div class="rk-top"><span class="rk-name" style="color:var(--ink)">${i+1}. ${r.n}${r.sub?`<small>（${r.sub}）</small>`:""}</span><span class="rk-pct">${i===0?"最も近い":"一致度 "+pct+"%"}</span></div>
    <div class="rk-bar"><i style="width:${pct}%"></i></div>
    <div class="rk-ev">${ev.slice(0,8).map(m=>`<span class="ev">${esc(m.t)}${m.mod?`<em>${TAG[m.mod]}</em>`:(m.sec.lb&&m.sec.id!=="other"?`<em>${m.sec.lb}</em>`:"")}</span>`).join("")}${ev.length>8?`<span class="ev">ほか${ev.length-8}件</span>`:""}</div></div>`;});
  if(top.length>=2){const f1=R[top[0].r].f,f2=R[top[1].r].f;
    if(f1!==f2&&top[1].s/top[0].s>=.6)h+=`<p class="ck-flag info">「${FAM[f1]}」と「${FAM[f2]}」の両方の要素があり、複数の職種にまたがる案件です。どちらの比重が大きいか確認すると安心です。</p>`;}
  if(top.length&&top[0].s<4)h+=`<p class="ck-flag">判断材料になるキーワードが少ないため、判定の精度は低めです。</p>`;
  h+=`</div>`;
  // 技術の近さ
  const onlyDiff=id=>partners(id).every(p=>p.lv==="diff");
  const shown=techs.filter(id=>partners(id).length||TD.techs[id].note).sort((x,y)=>onlyDiff(x)-onlyDiff(y)).slice(0,8);
  TECHCTX={tech:"◯◯",near:"△△"};
  TECHCTX=pickCtx(techs.filter(id=>!TD.techs[id].minor));
  h+=`<div class="ck-card"><h3>技術の近さ</h3>`;
  if(!shown.length)h+=`<p style="font-size:.9rem;color:var(--muted)">近さを表示できる技術が見つかりませんでした。</p>`;
  else{
    h+=`<div class="lv-legend">${LVO.map(l=>`<span class="lv lv-${l}">${LV[l]}</span>`).join("")}</div><div class="techs">`;
    shown.forEach(id=>{const t=TD.techs[id],ps=partners(id);
      h+=`<details class="tech"><summary><b>${esc(t.n)}</b><span class="tchips">${ps.map(p=>`<span class="lv lv-${p.lv}" title="${esc(LV[p.lv])}">${esc(TD.techs[p.id].n)}</span>`).join("")}</span></summary><div class="tbody">${t.note?`<p>${esc(t.note)}</p>`:""}${ps.length?`<ul>${ps.map(p=>`<li><b>${esc(TD.techs[p.id].n)}</b><span class="lv lv-${p.lv}">${LV[p.lv]}</span>${esc(p.n)}</li>`).join("")}</ul>`:""}</div></details>`;});
    h+=`</div><p class="ck-small">技術名をタップすると説明が開きます。近さは目安です。最終的には、本人がその技術で何をしてきたかで判断してください。</p>`;
  }
  h+=`</div>`;
  // 工程と、書かれていないこと
  h+=`<div class="ck-card"><h3>記載のある工程</h3><div class="steps">${STEPS.map(([n,re])=>`<span class="${re.test(a.text)?"on":""}">${n}</span>`).join("")}</div>`;
  if(g.out.length)h+=`<h3 style="margin-top:6px">募集要項から読み取れないこと</h3>${g.out.map(o=>`<p class="ck-flag${o.info?" info":""}">${esc(o.m)}</p>`).join("")}`;
  h+=`</div>`;
  // 質問
  const co=[];const seenQ=new Set();
  const pushQ=(q,src)=>{if(seenQ.has(q))return;seenQ.add(q);co.push([q,src]);};
  pos.qs.forEach(q=>pushQ(q,"案件の規模・立ち位置を確かめるため"));
  top.filter(x=>x.s>=max*.4).slice(0,2).forEach(x=>R[x.r].q.forEach(q=>pushQ(q,R[x.r].n+"に近いと判定したため")));
  g.qs.forEach(([q,src])=>pushQ(q,"募集要項に「"+src+"」の記載がないため"));
  const en=engQs(a,pos,techs,top,max);
  lastCo=co.map(x=>x[0]+(ANS[x[0]]?"\n"+ANS[x[0]].map(([a,m])=>"   ・"+a+" ⇒ "+m).join("\n"):""));
  lastEn=en.map(x=>x[0]);
  h+=`<div class="ck-card"><h3>確認したいこと</h3>
  <div class="tabs" role="tablist"><button type="button" role="tab" id="tab-co" aria-selected="${curTab==="co"}" data-tab="co">企業に聞く（${co.length}）</button><button type="button" role="tab" id="tab-en" aria-selected="${curTab==="en"}" data-tab="en">エンジニアに聞く（${en.length}）</button></div>
  <div class="tabpane" id="pane-co" ${curTab==="co"?"":"hidden"}>${qList(co,true)}</div>
  <div class="tabpane" id="pane-en" ${curTab==="en"?"":"hidden"}><p class="ck-small">これまでの経歴を聞くときの質問です。</p>${qList(en,false)}</div>
  <div class="ck-bar"><button class="btn ck-copy" type="button" id="ckCopy">表示中の質問をコピー</button><a class="btn ghost" href="#ask">ほかに気になることを探す</a></div></div>`;
  out.innerHTML=h;
  // ハイライト
  let o="",p=0;
  a.M.forEach(m=>{o+=esc(a.text.slice(p,m.s));
    const rk=Object.keys(m.w).sort((x,y)=>m.w[y]-m.w[x])[0];
    const cls=m.mod==="neg"?"m-neg":(m.mod||m.sec.w<1)?"m-half":"m-on";
    o+=`<mark class="${cls}" style="--mc:var(${R[rk].c})" title="${esc(R[rk].n)}">${esc(a.text.slice(m.s,m.e))}</mark>`;p=m.e;});
  o+=esc(a.text.slice(p));hl.innerHTML=o;
  renderAsk();
}
function copyText(txt,b,label){
  const done=()=>{b.textContent="コピーしました";setTimeout(()=>b.textContent=label,1600);};
  const fallback=()=>{const t=document.createElement("textarea");t.value=txt;document.body.appendChild(t);t.select();try{document.execCommand("copy");done();}catch(_){}t.remove();};
  try{navigator.clipboard.writeText(txt).then(done,fallback);}catch(_){fallback();}
}
out.addEventListener("click",e=>{
  const tb=e.target.closest("[data-tab]");
  if(tb){curTab=tb.dataset.tab;["co","en"].forEach(k=>{$("pane-"+k).hidden=k!==curTab;$("tab-"+k).setAttribute("aria-selected",k===curTab);});return;}
  if(e.target.id!=="ckCopy")return;
  const list=curTab==="co"?lastCo:lastEn;
  copyText(list.map((q,i)=>`${i+1}. ${q}`).join("\n"),e.target,"表示中の質問をコピー");
});
let tm;ta.addEventListener("input",()=>{isSample=false;clearTimeout(tm);tm=setTimeout(render,200);});

const SAMPLE=`【案件名】自社Webサービスの QAエンジニア募集

【業務内容】
会員数約30万人の飲食店予約サービス（自社開発）の品質保証をお任せします。
・新機能のテスト計画、テスト設計、テスト実施
・仕様書のレビューへの参加
・不具合の分析と開発チームへのフィードバック
・将来的にはテスト自動化の推進もお任せしたいと考えています

【必須スキル】
・Webアプリケーションのテスト設計経験（2年以上）
・JIRAなどを使った不具合管理の経験

【歓迎スキル】
・Playwright、Seleniumを使ったテスト自動化の経験
・JSTQB Foundation Level

【開発環境】
TypeScript / React / Go / AWS

【その他】
・負荷テストは対象外です
・チーム：開発8名、QA2名`;
$("ckSample").addEventListener("click",()=>{ta.value=SAMPLE;isSample=true;st.className="ck-note";render();});
$("ckClear").addEventListener("click",()=>{ta.value="";isSample=false;render();ta.focus();});

// ===== ファイル読み込み（ブラウザ内のみ） =====
const loadScript=src=>new Promise((ok,ng)=>{if(document.querySelector(`script[src="${src}"]`))return ok();const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>ng(new Error("load"));document.head.appendChild(s);});
const PDFJS="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",PDFW="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",MAM="https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js";
async function readFile(f){
  const name=f.name.toLowerCase();
  st.className="ck-note";st.textContent=`「${f.name}」を読み込んでいます…`;
  try{
    let txt="";
    if(name.endsWith(".pdf")||f.type==="application/pdf"){
      await loadScript(PDFJS);await loadScript(PDFW);
      pdfjsLib.GlobalWorkerOptions.workerSrc=PDFW;
      const doc=await pdfjsLib.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise;
      for(let i=1;i<=doc.numPages;i++){const c=await (await doc.getPage(i)).getTextContent();txt+=c.items.map(it=>it.str+(it.hasEOL?"\n":"")).join("")+"\n";}
      if(!txt.trim())throw new Error("empty");
    }else if(name.endsWith(".docx")){
      await loadScript(MAM);
      txt=(await mammoth.extractRawText({arrayBuffer:await f.arrayBuffer()})).value;
    }else if(/\.(txt|md|csv|tsv)$/.test(name)||f.type.startsWith("text/")){
      txt=await f.text();
    }else{throw new Error("type");}
    ta.value=txt;isSample=false;render();
    st.textContent=`「${f.name}」を読み込みました。内容はこのブラウザの外には送信されていません。`;
  }catch(e){
    st.className="ck-note err";
    st.textContent=e.message==="type"?"このファイル形式には対応していません。テキスト、PDF、Word（.docx）を選ぶか、文章を貼り付けてください。":e.message==="empty"?"このPDFからは文字を読み取れませんでした。画像として保存されたPDFの可能性があります。文章をコピーして貼り付けてください。":e.message==="load"?"ファイルを読むための部品を読み込めませんでした。通信環境を確認するか、文章を貼り付けてください。":"ファイルを読み込めませんでした。文章をコピーして貼り付けてください。";
  }
}
$("ckFile").addEventListener("change",e=>{const f=e.target.files[0];if(f)readFile(f);e.target.value="";});
ta.addEventListener("dragover",e=>{e.preventDefault();ta.classList.add("drag");});
ta.addEventListener("dragleave",()=>ta.classList.remove("drag"));
ta.addEventListener("drop",e=>{e.preventDefault();ta.classList.remove("drag");const f=e.dataTransfer.files[0];if(f)readFile(f);});

// ===== それでも気になること（用意した質問例から探す） =====
const AK=window.ASK||[];
const askIn=$("askQ"),askOut=$("askOut"),askChips=$("askChips");
const nz=s=>String(s).normalize("NFKC").toLowerCase().replace(/[\s、。，,.!?！？「」『』（）()・\/／]/g,"");
const STOP=/知りたい|教えて(ください)?|したい|ですか|ますか|でしょうか|大丈夫|って|のか|かどうか/g;
const core=s=>nz(s).replace(STOP,"");
const bigr=s=>{const r=new Set();for(let i=0;i<s.length-1;i++)r.add(s.slice(i,i+2));return r;};
function dice(a,b){if(!a.size||!b.size)return 0;let n=0;a.forEach(x=>{if(b.has(x))n++;});return 2*n/(a.size+b.size);}
function searchAsk(q){
  const qn=nz(q);if(!qn)return [];
  const qc=core(q),qb=bigr(qc),qt=findTech(q.normalize("NFKC"));
  const r=AK.map(e=>{let s=0;e.kw.forEach(k=>{const kn=nz(k);if(kn&&(qn.includes(kn)||(qc.length>=2&&kn.includes(qc))))s+=2+kn.length*.2;});
    s+=6*dice(qb,bigr(core(e.q+e.label)));
    if(qt.length&&e.id==="similar")s+=3;if(qt.length&&e.id==="years")s+=1;
    return {e,s};}).filter(x=>x.s>=1.5).sort((x,y)=>y.s-x.s);
  const best=r.length?r[0].s:0;
  return r.filter(x=>x.s>=best*.5).slice(0,3).map(x=>x.e);
}
let askCtx=null;
const ctx=()=>askCtx||TECHCTX;
const fill=s=>s.replace(/\{tech\}/g,ctx().tech).replace(/\{near\}/g,ctx().near);
let askSel=["scale"];
function askCard(e){
  const li=(arr,who)=>arr.map(x=>{const t=fill(x);return `<li><span>${esc(t)}</span><button type="button" class="btn ghost mini" data-copy="${esc(t)}">コピー</button></li>`;}).join("");
  return `<article class="ask-card"><p class="ask-cat">${esc(e.cat||"")}</p><h3>${esc(e.label)}</h3><p class="ask-why">${esc(e.why)}</p>
  <div class="ask-cols">${e.company.length?`<div><p class="ask-h">企業にはこう聞いてみては？</p><ul class="ask-list">${li(e.company)}</ul></div>`:""}
  ${e.engineer.length?`<div><p class="ask-h">エンジニアにはこう聞いてみては？</p><ul class="ask-list">${li(e.engineer)}</ul></div>`:""}</div>
  ${/\{tech\}|\{near\}/.test(e.company.concat(e.engineer).join(""))?`<p class="ck-small">${ctx().tech==="◯◯"||ctx().near==="△△"?"◯◯・△△には技術名を入れてください。":askCtx?"技術名は、入力した内容から入れています。":"技術名は、貼り付けた募集要項から入れています。"}</p>`:""}</article>`;
}
function renderAsk(){
  if(!askOut)return;
  const q=askIn.value.trim();
  let list,msg="";
  askCtx=null;
  if(q){const qt=findTech(q.normalize("NFKC"));if(qt.length)askCtx=pickCtx(qt);list=searchAsk(q);if(!list.length)msg=`<p class="ck-flag info">近い質問例が見つかりませんでした。言葉を変えるか、下の一覧から近いものを選んでください。</p>`;}
  else list=askSel.map(id=>AK.find(e=>e.id===id)).filter(Boolean);
  askOut.innerHTML=msg+list.map(askCard).join("");
}
if(askChips){
  const cats=(window.ASK_CATS||[...new Set(AK.map(e=>e.cat||"その他"))]).filter(c=>AK.some(e=>(e.cat||"その他")===c));
  const selCat=$("askCat"),selItem=$("askItem");
  selCat.innerHTML=cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
  const fillItems=()=>{selItem.innerHTML=AK.filter(e=>(e.cat||"その他")===selCat.value).map(e=>`<option value="${e.id}">${esc(e.label)}</option>`).join("");};
  const show=()=>{askIn.value="";askSel=[selItem.value];renderAsk();
    const r=askOut.getBoundingClientRect();if(r.top<0||r.top>window.innerHeight*.6)askOut.scrollIntoView({behavior:"smooth",block:"start"});};
  fillItems();
  selCat.addEventListener("change",()=>{fillItems();show();});
  selItem.addEventListener("change",show);
  let at;askIn.addEventListener("input",()=>{clearTimeout(at);at=setTimeout(renderAsk,150);});
  askOut.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(b)copyText(b.dataset.copy,b,"コピー");});
}

ta.value=SAMPLE;isSample=true;render();
})();
