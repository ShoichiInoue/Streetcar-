# 『欲望という名の電車』オンライン講義 - コンテンツ編集マニュアル

このドキュメントは、サイトコンテンツを管理・編集する者向けの詳細マニュアルです。

## 📋 目次

1. [ファイル構成](#ファイル構成)
2. [コンテンツ編集の流れ](#コンテンツ編集の流れ)
3. [JSONファイル編集](#jsonファイル編集)
4. [動画の追加方法](#動画の追加方法)
5. [よくある質問](#よくある質問)
6. [ローカル確認方法](#ローカル確認方法)

---

## ファイル構成

### 公開ファイル（`public/` 以下）

Cloudflare Pages で公開されるのは `public/` 以下だけです。

```
public/
├── index.html                   # ホームページ（自動生成）
├── welcome.html                 # ようこそページ
├── course.html                  # コース表示ページ
├── episode.html                 # 講義詳細ページ
├── about.html                   # このサイトについて
├── bibliography.html            # 参考資料
│
├── data/                        # コンテンツ（編集対象）
│   ├── site.json               # サイト全体設定
│   ├── courses.json            # コース一覧
│   ├── episodes.json           # 講義一覧
│   ├── references.json         # 参考資料
│   └── people.json             # スタッフ情報
│
├── css/                        # スタイルシート（編集不要）
├── js/                         # JavaScript（編集不要）
└── images/                     # 画像ファイル
```

### 非公開ファイル（`docs/`、`source/` など）

- `CODEX.md` - 作業ルール
- `docs/architecture.md` - システム設計書
- `docs/content-editing-guide.md` - このファイル

---

## コンテンツ編集の流れ

### 1️⃣ **サイト基本情報を編集する**

ファイル: `public/data/site.json`

```json
{
  "title": "『欲望という名の電車』オンライン講義",
  "description": "第47回定期演奏会 合奏補助コンテンツ",
  "subtitle": "Streetcar Named Desire Online Lecture",
  "organization": "第47回定期演奏会実行委員会"
}
```

**編集項目:**
- `title`: ページのタイトル
- `description`: サイトの説明
- `subtitle`: 英語版タイトル
- `organization`: 主催者名

---

### 2️⃣ **コース情報を追加・編集する**

ファイル: `public/data/courses.json`

```json
[
  {
    "id": "S",
    "title": "ようこそ",
    "subtitle": "はじめての方へ",
    "description": "このサイトの使い方と『欲望という名の電車』の概要を学びます",
    "order": 0,
    "episodes": []
  },
  {
    "id": "A",
    "title": "コース A",
    "subtitle": "基礎",
    "description": "作品理解の基礎を学ぶコース",
    "order": 1,
    "episodes": []
  }
]
```

**フィールド説明:**
- `id`: コースの一意な識別子（英字+数字）※ URL に使用
- `title`: コース名
- `subtitle`: キャッチコピー
- `description`: 詳細説明
- `order`: 表示順序（0が最初）
- `episodes`: このコースに属する講義 ID の配列

**新しいコースを追加する例:**

```json
{
  "id": "B",
  "title": "コース B",
  "subtitle": "背景と歴史",
  "description": "『欲望という名の電車』の文化的背景を学ぶ",
  "order": 2,
  "episodes": ["B-1", "B-2", "B-3"]
}
```

⚠️ **注意:**
- `id` を後から変更すると、講義の `courseId` も変更する必要があります
- `order` に重複がないようにしてください
- HTMLへコース情報を直書きしてはいけません

---

### 3️⃣ **講義を追加・編集する**

ファイル: `public/data/episodes.json`

```json
[
  {
    "id": "S-0",
    "courseId": "S",
    "title": "はじめに",
    "description": "オンライン講義のガイダンス",
    "duration": "5:30",
    "youtubeId": "dQw4w9WgXcQ",
    "transcript": "",
    "order": 0
  }
]
```

**フィールド説明:**
- `id`: 講義の一意な識別子（`courseId-番号` 形式推奨）
- `courseId`: 所属するコース ID
- `title`: 講義タイトル
- `description`: 講義説明
- `duration`: 動画の長さ（例: "5:30"）
- `youtubeId`: YouTube のビデオ ID（下記参照）
- `transcript`: テキストスクリプト（HTML形式可）
- `order`: コース内での表示順序

---

## JSONファイル編集

### JSON の基本ルール

JSON は **厳密な形式** です。以下を守ってください:

#### ❌ 正しくない例

```json
// コメントは使用禁止
{
  "id": "A-1",
  "title": "講義 1",    ← 最後のカンマ（末尾）は不可
}
```

#### ✅ 正しい例

```json
{
  "id": "A-1",
  "title": "講義 1"
}
```

### JSON の記述ルール

| ルール | 例 |
|--------|-----|
| **文字列は二重引用符 "" で囲む** | `"id": "A-1"` |
| **数値は引用符なし** | `"order": 0` |
| **真偽値は小文字** | `"active": true` |
| **配列は [ ] で囲む** | `"episodes": ["A-1", "A-2"]` |
| **オブジェクトは { } で囲む** | `{ "id": "A-1" }` |
| **最後の項目の後にカンマは不可** | `"title": "foo"` (カンマなし) |

### 検証方法

JSON の書き方が正しいか確認するツール:
- [jsonlint.com](https://www.jsonlint.com/)
- VS Code 内蔵の JSON バリデーション

---

## 動画の追加方法

### 📺 YouTube 動画を埋め込む手順

#### **ステップ 1: YouTube 動画の URL を確認**

YouTube の共有 URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

#### **ステップ 2: ビデオ ID を抽出**

URL の `v=` 以降の部分:
```
dQw4w9WgXcQ  ← これがビデオ ID
```

#### **ステップ 3: episodes.json に記録**

```json
{
  "id": "A-1",
  "courseId": "A",
  "title": "背景と文化",
  "description": "作品の背景を学びます",
  "duration": "8:45",
  "youtubeId": "dQw4w9WgXcQ",
  "transcript": "",
  "order": 0
}
```

#### **ステップ 4: ブラウザで確認**

1. ローカルサーバーを起動
2. ブラウザで該当の講義ページへアクセス
3. 動画が表示されることを確認

### 📝 動画未公開時の対応

`youtubeId` が空文字列の場合、自動的に「動画未公開」プレースホルダーが表示されます。

```json
{
  "id": "A-2",
  "youtubeId": "",  ← 空にしておく
  "description": "こちらの講義は近日中に公開予定です"
}
```

---

## よくある質問

### Q1: コース番号や講義数を固定してもいい？

❌ **いけません。** CODEX.md に「固定値として実装しないでください」と明記されています。

JSON でデータを管理することで、HTML を変更せずにコンテンツを追加・削除・並び替えできます。

### Q2: HTML に講義内容を直書きしてもいい？

❌ **いけません。** データを `episodes.json` から表示する仕組みになっています。

### Q3: 画像をどこに置く？

`public/images/` 以下に置きます:

```
public/images/
├── courses/
├── episodes/
├── references/
└── site/
```

JSON で参照する場合:
```json
{
  "id": "course-01",
  "image": "/images/courses/course-a.jpg"
}
```

### Q4: 外部ライブラリ（jQuery、Bootstrap等）を使いたい

❌ **事前確認が必須です。** CODEX.md に「外部ライブラリを追加する前に確認を求めてください」と明記されています。

初期版は **HTML、CSS、Vanilla JavaScript、JSON のみ** に限定されています。

### Q5: 初回訪問の導線を無視したい

ブラウザ URL に `?skipIntro=1` パラメータをつけます:

```
http://localhost:8000/?skipIntro=1
```

スクリーンショット撮影やデバッグ時に使用します。

### Q6: localStorage のキーは何？

```
streetcar_intro_seen_v1
```

### Q7: コース ID や講義 ID の命名ルールは？

**推奨:**
- コース: `A`, `B`, `C` ... (大文字英字)
- ようこそ: `S` (S for "start")
- 講義: `コースID-連番` (例: `A-1`, `A-2`, `B-1`)

---

## ローカル確認方法

### Python 3 を使用

```bash
cd /Users/inoueshouichi/Streetcar/public
python3 -m http.server 8000
```

### Node.js を使用

```bash
cd /Users/inoueshouichi/Streetcar/public
npx http-server . -p 8000
```

ブラウザで [http://localhost:8000](http://localhost:8000) にアクセス。

---

## 変更を反映させるには

1. JSON ファイルを編集・保存
2. ブラウザをリロード（Cmd+R または Ctrl+R）
3. ブラウザキャッシュが邪魔な場合: キャッシュなしリロード（Cmd+Shift+R または Ctrl+Shift+R）

---

## トラブルシューティング

### JSON が読み込まれない

1. ブラウザの開発者ツール（F12）を開く
2. Console タブでエラーメッセージを確認
3. 通常は JSON の形式エラー → jsonlint.com で検証

### 動画が表示されない

1. YouTube ID が正しいか確認
2. 動画が公開状態か確認
3. ブラウザキャッシュをクリア

### ページが真っ白に表示される

1. ブラウザキャッシュをクリア
2. ブラウザコンソールでエラーを確認
3. JSON ファイルが正しい形式か確認

---

**最終更新:** 2026-07-10
**編集者:** GitHub Copilot
