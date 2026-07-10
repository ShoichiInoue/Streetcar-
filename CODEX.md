# CODEX.md

このリポジトリは、『欲望という名の電車』オンライン講義サイトです。

## 最重要原則

- `public`以下だけが公開対象です。
- コンテンツはHTMLへ直書きせず、原則として`public/data/*.json`から表示してください。
- コース数、コース名、回数、各回タイトルは今後変更されます。固定値として実装しないでください。
- HTML、CSS、Vanilla JavaScript、JSONのみを使用してください。
- 外部ライブラリを追加する前に確認を求めてください。
- 動画はYouTube埋め込みです。
- 動画未公開でもページが成立するようにしてください。
- 初回訪問時だけS-0へ誘導し、二回目以降は誘導しません。
- 詳細仕様は`docs/architecture.md`を参照してください。

## 作業前

1. 変更予定ファイルを列挙する。
2. 変更理由を短く説明する。
3. 必要なファイルだけ読む。

## 作業後

1. 変更内容を要約する。
2. ローカル確認手順を示す。
3. 既知の未実装事項を示す。
4. 勝手にGit commitやpushをしない。

## コンテンツ管理（自動変換の仕組み）

コース、講義、スタッフ情報は`raw-content/`フォルダの CSV ファイルで一元管理し、自動で JSON に変換します。

### 入力方法

1. `raw-content/courses.csv` にコース情報を入力
2. `raw-content/episodes.csv` に講義情報を入力

### ビルド実行

```bash
cd /Users/inoueshouichi/Streetcar
python3 build-content.py
```

### 出力

```
public/data/
├── courses.json      # ✨ 自動生成
└── episodes.json     # ✨ 自動生成
```

### 詳細

詳しい入力ガイドは`raw-content/README.md`を参照してください。
