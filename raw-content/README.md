# 『欲望という名の電車』コンテンツ入力ガイド

このフォルダはコンテンツをガガガっと JSON に自動変換するための入力フォルダです。

## 📋 ファイル構成

```
raw-content/
├── README.md                 # このファイル
├── courses.csv              # コース情報（テンプレート）
└── episodes.csv             # エピソード情報（テンプレート）
```

## 📝 入力方法

### 1. **courses.csv** にコース情報を入力

CSV フォーマット:
```
id,title,subtitle,description,order
S,ようこそ,はじめての方へ,このサイトの使い方を学びます,0
A,コース A,基礎,作品理解の基礎を学ぶコース,1
B,コース B,背景,歴史的・文化的背景を学ぶ,2
```

**フィールド説明:**
- `id`: コースの一意な識別子（英字）※ URL に使用
- `title`: コース名
- `subtitle`: キャッチコピー
- `description`: 詳細説明
- `order`: 表示順序（0が最初）

### 2. **episodes.csv** に講義情報を入力

CSV フォーマット:
```
id,courseId,title,description,duration,youtubeId,order
S-0,S,はじめに,オンライン講義のガイダンス,5:30,dQw4w9WgXcQ,0
A-1,A,背景と文化,作品の背景を学びます,8:45,abc123def456,0
A-2,A,主要人物,主要な登場人物について,10:20,,1
```

**フィールド説明:**
- `id`: 講義の一意な識別子（`courseId-番号` 形式推奨）
- `courseId`: 所属するコース ID
- `title`: 講義タイトル
- `description`: 講義説明
- `duration`: 動画の長さ（例: "5:30"）
- `youtubeId`: YouTube のビデオ ID（空欄可）
- `order`: コース内での表示順序

### 3. **people.csv** にスタッフ情報を入力（オプション）

CSV フォーマット:
```
name,role,bio,image
田中 太郎,プロデューサー,プロジェクトリーダー,/images/people/tanaka.jpg
```

## 🔄 変換手順

### ステップ 1: CSV ファイルを編集

`courses.csv`、`episodes.csv` などを編集して、コンテンツ情報を入力します。

### ステップ 2: ビルドスクリプトを実行

```bash
cd /Users/inoueshouichi/Streetcar
python3 build-content.py
```

### ステップ 3: JSON ファイルが自動生成

```
public/data/
├── site.json          # 既存（変更なし）
├── courses.json       # ✨ 自動生成
└── episodes.json      # ✨ 自動生成
```

### ステップ 4: ブラウザで確認

1. サーバーを起動（既に起動していれば不要）
2. ブラウザをリロード
3. 新しいコースと講義が表示されることを確認

## ⚠️ 注意事項

### CSV の記述ルール

**必須:**
1. 1行目は**ヘッダー**（フィールド名）
2. 各フィールドは**カンマで区切る**
3. フィールド値に**カンマが含まれる場合は二重引用符で囲む**
4. 空欄は `""` または何も入れない

**例:**
```csv
id,title,description
A,コース A,"このコースは、さまざまなテーマを扱い、複雑な内容をカバーしています"
B,コース B,基本的な内容
```

### YouTube ID の抽出方法

YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
→ ビデオ ID: `dQw4w9WgXcQ`

短縮 URL: `https://youtu.be/dQw4w9WgXcQ`
→ ビデオ ID: `dQw4w9WgXcQ`

## 🐛 トラブルシューティング

### ビルドに失敗した

1. `python3 build-content.py` を実行して、エラーメッセージを確認
2. CSV ファイルの形式を確認（カンマの位置、エスケープなど）
3. 必須フィールドが入力されているか確認

### JSON が生成されない

1. CSV ファイルが `raw-content/` に存在するか確認
2. CSV のヘッダーが正しいか確認
3. `build-content.py` が実行可能か確認

### 変更が反映されない

1. ブラウザキャッシュをクリア（Cmd+Shift+R または Ctrl+Shift+R）
2. `public/data/*.json` が更新されたか確認（タイムスタンプを確認）

## 📚 参照

- [コンテンツ編集マニュアル](../docs/content-editing-guide.md)
- [CODEX.md](../CODEX.md) - プロジェクト規則

---

**最終更新:** 2026-07-10
