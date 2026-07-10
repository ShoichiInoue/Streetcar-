# CODEX設計仕様書
## 『欲望という名の電車』オンライン講義サイト

**目的**  
第47回定期演奏会で扱う『欲望という名の電車』について、演奏に参加する人を主な対象としつつ、一般の来場者も自然に楽しめる映像講義サイトを構築する。  
コース名・回数・各回の内容は今後大きく変更される可能性があるため、**HTMLへ内容を直書きせず、データを差し替えるだけで更新できる構造**を最優先する。

---

# 1. 実装方針

## 1.1 使用技術

初期版は次のみに限定する。

- HTML
- CSS
- Vanilla JavaScript
- JSON
- YouTube埋め込み
- Cloudflare Pages
- GitHub

React、Astro、Vue、データベース、サーバー処理は初期版では使用しない。

## 1.2 基本原則

1. 表示構造とコンテンツデータを分離する。
2. コースや講義の追加・削除・並べ替えをJSON編集だけで行えるようにする。
3. 各ページを34枚手作業で複製しない。
4. 共通部品はJavaScriptで生成する。
5. スマートフォンを最優先し、PCでも上品に見えるレスポンシブ設計とする。
6. 動画ファイルはサイトへ置かず、YouTube埋め込みを使う。
7. Codex向けの長期指示書・設計資料は`public`の外へ置く。
8. `public`以下だけがCloudflare Pagesで公開される前提とする。

---

# 2. 推奨ディレクトリ構成

```text
Streetcar/
├── CODEX.md
├── README.md
├── docs/
│   ├── architecture.md
│   ├── content-policy.md
│   └── design-notes.md
│
├── source/
│   ├── scripts/
│   ├── references/
│   └── notes/
│
└── public/
    ├── index.html
    ├── welcome.html
    ├── course.html
    ├── episode.html
    ├── bibliography.html
    ├── about.html
    │
    ├── css/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── layout.css
    │   ├── components.css
    │   └── pages.css
    │
    ├── js/
    │   ├── app.js
    │   ├── intro-guard.js
    │   ├── data-loader.js
    │   ├── render-home.js
    │   ├── render-course.js
    │   ├── render-episode.js
    │   ├── navigation.js
    │   └── analytics.js
    │
    ├── data/
    │   ├── site.json
    │   ├── courses.json
    │   ├── episodes.json
    │   ├── references.json
    │   └── people.json
    │
    ├── images/
    │   ├── site/
    │   ├── courses/
    │   ├── episodes/
    │   └── references/
    │
    ├── icons/
    └── favicon.ico
```

## 2.1 非公開領域

以下はCloudflareへ配信しない。

- `CODEX.md`
- `docs/`
- `source/`
- 動画台本
- 未公開の研究メモ
- 著作権確認前の画像
- 個人情報
- APIキーや認証情報

---

# 3. Cloudflare Pages設定

```text
Framework preset:
None

Build command:
mkdir -p dist && cp -R public/. dist/

Build output directory:
dist
```

`public`以下のみを公開する。

---

# 4. Codexの作業規則

Codexは作業開始時に、原則として次の順に読む。

1. `CODEX.md`
2. 必要な場合のみ`docs/architecture.md`
3. 編集対象のファイル
4. 関連するJSON

無関係なファイルを大量に読まない。  
一度に広範囲を書き換えず、小さな単位で実装・確認する。

## 4.1 禁止事項

- 講義タイトルや本文をHTMLへ直接大量に記述しない。
- コース数をA〜Fの6個に固定しない。
- 各コースの回数を固定しない。
- 前後関係をファイル名だけから決め打ちしない。
- 本番用URLをJavaScriptへハードコードしない。
- 外部ライブラリを無断で追加しない。
- デザイン変更のためにコンテンツJSONを壊さない。
- 未完成ページでエラー画面を出さない。
- YouTube動画未登録時に空のiframeを表示しない。

---

# 5. 初回訪問時のS-0導線

## 5.1 要件

初めてサイトを開いた利用者だけ、自動的に`welcome.html`へ案内する。

保存キー：

```text
streetcar_intro_seen_v1
```

## 5.2 動作

1. 利用者が初めて任意ページへアクセスする。
2. `localStorage`に保存キーがなければ`welcome.html`へ移動する。
3. 元のアクセス先を`next`パラメータとして保持する。
4. S-0動画・説明の最後に「コースを選ぶ」ボタンを表示する。
5. ボタンを押した時点で保存キーを設定する。
6. `next`があれば元ページへ戻し、なければトップページへ進む。
7. 二回目以降は自動転送しない。
8. ヘッダーまたはAboutページに「はじめての方へ」を常設し、S-0をいつでも再視聴可能にする。

例：

```text
初回アクセス:
episode.html?id=A-1

転送先:
welcome.html?next=episode.html%3Fid%3DA-1
```

## 5.3 例外

次の場合は初回判定を無視する。

```text
?skipIntro=1
```

利用目的：

- 制作確認
- デバッグ
- スクリーンショット撮影
- 自動テスト

## 5.4 実装上の注意

- Cookieではなく`localStorage`を使う。
- `welcome.html`自身では再転送しない。
- ストレージ利用不可の場合もサイト閲覧を妨げない。
- 初回判定は個人追跡に使わない。
- 保存キーのバージョンを変更すれば、将来新版S-0を再表示できる。

---

# 6. ページ構成

## 6.1 `welcome.html`：S-0

表示内容：

- サイトタイトル
- S-0タイトル
- 5分程度の案内動画
- 短い説明文
- 「好きなところから見てよい」という案内
- 今後、専門家やゲストが参加する可能性
- 本番前後のどちらでも楽しめること
- 「コースを選ぶ」ボタン
- 「説明を飛ばしてコース一覧へ」補助リンク

動画未完成時：

- ポスター画像
- 台本の短縮版
- 「動画は準備中です」
- コース一覧へ進めるボタン

## 6.2 `index.html`：トップ／コース一覧

表示内容：

- ヒーローエリア
- サイトの短い説明
- コースカード一覧
- 公開済み講義
- おすすめの入口
- 最近追加された講義
- 「どこから見ればよいかわからない方へ」
- S-0再視聴リンク

コースカードは`courses.json`から自動生成する。

各カードの内容：

- コース記号
- コース名
- 副題
- 短い説明
- 公開済み回数
- 総予定回数
- キービジュアル
- アクセントカラー
- 詳細ページへのリンク

## 6.3 `course.html?id=A`

表示内容：

- コース名
- 副題
- コース概要
- キービジュアル
- 回一覧
- 各回の公開状態
- 推奨視聴順
- 関連コース

回一覧は`episodes.json`から該当コースを抽出し、`order`順で表示する。

## 6.4 `episode.html?id=A-1`

表示順：

1. パンくず
2. コース・回番号
3. タイトル
4. 副題
5. YouTubeプレイヤー
6. 前回／コース一覧／次回
7. 概要
8. チャプター
9. 関連コンテンツ
10. 参考文献
11. 関連人物
12. 画像・資料
13. 注記
14. 下部の前後ナビゲーション

動画未公開時：

- 「準備中」表示
- 概要や参考文献は閲覧可能
- 次回リンクなどは通常表示
- 空iframeは表示しない

## 6.5 `bibliography.html`

- 全参考文献
- 著者・発行年・分類による絞り込み
- 使用されている講義への逆リンク
- 外部リンクがある場合のみ表示

---

# 7. データ設計

## 7.1 `site.json`

```json
{
  "siteTitle": "『欲望という名の電車』オンライン講義",
  "shortTitle": "Streetcar Lecture",
  "concertTitle": "第47回定期演奏会",
  "description": "作品をより深く楽しむための映像講義サイト",
  "youtubeChannelUrl": "",
  "introStorageKey": "streetcar_intro_seen_v1",
  "defaultOgpImage": "/images/site/og-default.jpg"
}
```

## 7.2 `courses.json`

コース数・名称・順番は自由に変更可能とする。

```json
[
  {
    "id": "A",
    "order": 10,
    "title": "なぜスタンリーはブランチをレイプしたのか",
    "subtitle": "二人の対立はなぜ身体的暴力へ到達したのか",
    "summary": "作品の中心問題を、登場人物の尊厳と対立から読み解く。",
    "image": "/images/courses/course-a.jpg",
    "accent": "#8f2d35",
    "status": "active",
    "featured": true,
    "recommendedFor": ["物語を理解したい", "人物関係を知りたい"]
  }
]
```

### `status`

- `active`：通常表示
- `coming-soon`：予告表示
- `hidden`：非表示
- `archived`：資料として残す

## 7.3 `episodes.json`

```json
[
  {
    "id": "S-0",
    "courseId": "S",
    "order": 0,
    "title": "ようこそ",
    "subtitle": "このサイトの楽しみ方",
    "summary": "各コースの見方と、このサイトの目的を紹介する。",
    "videoId": "",
    "videoStatus": "planned",
    "duration": "05:00",
    "thumbnail": "/images/episodes/s-0.jpg",
    "chapters": [],
    "related": [],
    "references": [],
    "people": [],
    "gallery": [],
    "tags": ["案内"],
    "status": "published",
    "publishedAt": "",
    "updatedAt": ""
  },
  {
    "id": "A-1",
    "courseId": "A",
    "order": 10,
    "title": "ブランチは何を守ろうとしたのか",
    "subtitle": "幻想の背後にあるもの",
    "summary": "ブランチの幻想を、尊厳と自己像を守る行為として読む。",
    "videoId": "",
    "videoStatus": "planned",
    "duration": "",
    "thumbnail": "/images/episodes/a-1.jpg",
    "chapters": [
      {
        "time": "00:00",
        "label": "導入"
      }
    ],
    "related": ["B-5", "C-2", "C-5", "E-4"],
    "references": ["williams-streetcar"],
    "people": ["tennessee-williams"],
    "gallery": [],
    "tags": ["ブランチ", "幻想", "尊厳"],
    "status": "coming-soon",
    "publishedAt": "",
    "updatedAt": ""
  }
]
```

### `videoStatus`

- `planned`
- `recording`
- `editing`
- `published`

### `status`

- `draft`
- `coming-soon`
- `published`
- `hidden`
- `archived`

## 7.4 `references.json`

```json
[
  {
    "id": "williams-streetcar",
    "type": "book",
    "author": "Tennessee Williams",
    "title": "A Streetcar Named Desire",
    "year": 1947,
    "publisher": "New Directions",
    "url": "",
    "note": "原作戯曲",
    "language": "en"
  }
]
```

## 7.5 `people.json`

```json
[
  {
    "id": "tennessee-williams",
    "name": "テネシー・ウィリアムズ",
    "role": "劇作家",
    "description": "『欲望という名の電車』の作者。",
    "image": "/images/references/tennessee-williams.jpg",
    "url": ""
  }
]
```

---

# 8. 前回・次回の決定方法

`episodes.json`から次の条件で自動計算する。

1. 同じ`courseId`
2. `status`が`hidden`ではない
3. `order`の昇順
4. 現在の回の直前・直後

タイトルや回数が変わっても、`order`を修正するだけでよい。

コースをまたぐ「次におすすめ」は、前後リンクとは分離し、`related`で管理する。

---

# 9. 関連コンテンツ

`related`には講義IDだけを保存する。

```json
"related": ["B-5", "C-2", "C-5", "E-4"]
```

表示時に`episodes.json`から以下を取得する。

- コース記号
- タイトル
- 副題
- サムネイル
- 公開状態

未公開回の場合：

- タイトルを表示
- 「近日公開」ラベルを付ける
- クリック可否は設定で切り替え可能

---

# 10. デザイン方針

## 10.1 コンセプト

**劇場の暗がりと、紙提灯の柔らかな光。**

高級感は持たせるが、過剰な装飾や映画館風の俗っぽさは避ける。  
大学の公開講義、演劇プログラム、現代的な映像配信サービスの中間を目指す。

## 10.2 カラートークン

`tokens.css`に集約する。

```css
:root {
  --color-bg: #11100f;
  --color-surface: #191715;
  --color-surface-soft: #24211e;
  --color-text: #f2eee8;
  --color-text-muted: #b9b1a8;
  --color-line: rgba(255, 255, 255, 0.12);
  --color-accent: #b6504f;
  --color-gold: #c7a56a;
  --color-focus: #f0c98a;

  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;

  --shadow-soft: 0 18px 60px rgba(0, 0, 0, 0.28);
  --content-max: 1180px;
}
```

コースごとの色は補助的に使用し、可読性を損なわない。

## 10.3 タイポグラフィ

- 日本語本文：明朝体とゴシック体を適切に使い分ける。
- 長文本文はゴシック系を優先する。
- 見出しは明朝体またはセリフ系で舞台的な格調を出す。
- 外部フォントが読み込めない場合にも崩れないフォントスタックを設定する。
- 本文最小サイズは16px。
- 行間は1.7前後。

## 10.4 カード

コースカード：

- 横長または縦長
- 背景画像に暗いオーバーレイ
- コース記号を大きく表示
- ホバー時はわずかに浮く
- 動きは短く控えめ
- スマホでは1列
- タブレットでは2列
- PCでは3列

## 10.5 動画

- 16:9
- 最大幅960px程度
- 角丸
- 背景は黒
- 動画下に前後ナビゲーション
- YouTubeの再生速度変更機能をそのまま利用
- `youtube-nocookie.com`を優先

---

# 11. アクセシビリティ

必須項目：

- キーボード操作
- 明確なフォーカスリング
- 十分なコントラスト
- 画像の`alt`
- iframeの`title`
- 見出しレベルの順序
- ボタンとリンクの役割を混同しない
- アニメーション抑制設定への対応
- 動画字幕の用意を推奨
- 音声のみで伝わらない情報は概要にも記載

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 12. エラー処理

## 12.1 不正な講義ID

例：

```text
episode.html?id=Z-99
```

表示：

- 「講義が見つかりません」
- トップへ戻る
- コース一覧へ戻る
- URL確認案内

## 12.2 JSON読込失敗

- ページ全体を真っ白にしない
- 再読み込みボタン
- トップへ戻るリンク
- コンソールへ具体的エラーを出す

## 12.3 画像読込失敗

- 代替画像
- レイアウト崩れを防ぐ
- 不要な壊れた画像アイコンを出さない

---

# 13. URL設計

初期版：

```text
/
welcome.html
course.html?id=A
episode.html?id=A-1
bibliography.html
about.html
```

将来的にAstro等へ移行する場合：

```text
/courses/a/
/episodes/a-1/
/bibliography/
```

内部リンク生成は一か所に集約し、将来のURL変更に備える。

---

# 14. 公開状態の扱い

## トップページ

- `published`：通常カード
- `coming-soon`：近日公開
- `draft`：表示しない
- `hidden`：表示しない
- `archived`：原則非表示

## 講義ページ

`coming-soon`でもページ自体は表示可能とし、

- タイトル
- 概要
- 参考文献
- 関連回
- 公開予定表示

を出せるようにする。

---

# 15. 将来変更に耐える条件

以下を満たすこと。

- A〜Fの名称変更がJSONだけで完了する。
- コースGを追加してもHTML修正不要。
- 1コースの回数を増減してもHTML修正不要。
- A-1をA-3へ並べ替えても`order`変更だけで対応。
- タイトル変更が関連リンクへ自動反映される。
- 回を非公開にしても前後リンクが破綻しない。
- 動画未完成でもページが成立する。
- 参考文献の表記を一括修正できる。
- S-0を新版へ更新して再表示可能。
- 将来Astroへ移行してもJSONを再利用できる。

---

# 16. 初期実装の優先順位

## Phase 1：骨組み

1. ディレクトリ整理
2. JSONローダー
3. 初回S-0転送
4. S-0ページ
5. トップのコースカード
6. コース一覧ページ
7. 講義ページ
8. 前後リンク
9. 関連リンク
10. スマホ対応

## Phase 2：公開品質

1. YouTube埋め込み
2. 参考文献
3. 画像ギャラリー
4. OGP
5. favicon
6. 404相当画面
7. アクセシビリティ改善
8. 読込速度改善

## Phase 3：分析と発展

1. Cloudflare Web Analytics
2. UTM導線
3. YouTube視聴分析
4. タグ一覧
5. サイト内検索
6. 最近追加された回
7. おすすめ視聴ルート

---

# 17. 初回Codex実装指示

以下をCodexへ渡す。

```text
このリポジトリのCODEX.mdを最優先で読んでください。

まずPhase 1の骨組みだけを実装してください。
HTML、CSS、Vanilla JavaScript、JSONのみを使用してください。
外部ライブラリは追加しないでください。

特に以下を実装してください。

1. public/data/courses.jsonとepisodes.jsonから表示を生成する
2. 初回訪問時だけwelcome.htmlへ転送する
3. welcome.htmlから元のページまたはトップへ進める
4. index.htmlにコース一覧を生成する
5. course.html?id=Aで該当コースの回一覧を生成する
6. episode.html?id=A-1で講義ページを生成する
7. 同一コース内の前回・次回をorderから自動計算する
8. related IDから関連講義カードを生成する
9. 動画未公開でも壊れない
10. スマートフォン対応する

実装前に変更予定ファイルを列挙してください。
実装後に、ローカル確認手順と変更点を短く報告してください。
```

---

# 18. 完了条件

初期版は次を満たせば完成とする。

- 初回アクセスでS-0へ移動する。
- 二回目以降はトップまたは直接指定ページを開ける。
- S-0はメニューから再視聴できる。
- JSON変更でコース一覧が変わる。
- JSON変更で講義一覧が変わる。
- JSON変更でタイトル・関連回・前後順が変わる。
- 動画未登録回でも表示できる。
- PCとスマホでレイアウトが破綻しない。
- Cloudflare Pagesで公開できる。
- `public`外の制作資料は公開されない。
