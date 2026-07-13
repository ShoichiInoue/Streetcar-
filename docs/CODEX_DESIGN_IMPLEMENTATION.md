# CODEX_DESIGN_IMPLEMENTATION.md
## 『欲望という名の電車』合奏補助コンテンツサイト
### UI・ビジュアル再設計 実装指示書

---

# 0. この指示書の目的

この指示書は、既存の静的サイトを、作品世界にふさわしい統一感のある映像講義サイトへ再設計するための実装仕様である。

この作業では、既存のJSONデータ構造、ページ遷移、講義情報、コース情報を壊さずに、主として以下を改善する。

- ビジュアルデザイン
- 情報の優先順位
- 余白
- タイポグラフィ
- 色
- 写真の扱い
- カード
- 動画ページ
- スマートフォン表示
- アクセシビリティ
- 初回導線
- ページ間の統一感

このサイトは、主として演奏参加者が作品理解を深めるために使う。
同時に、演奏会へ来場した観客も自然に楽しめるものとする。

「教材サイト」や「資料置き場」ではなく、

**作品世界へ入っていくためのオンライン講義空間**

として設計すること。

---

# 1. 作業開始時の必須手順

作業を始める前に、必ず次の順で確認すること。

1. `CODEX.md`
2. `docs/architecture.md`
3. `docs/design-spec.md`
4. `public/data/site.json`
5. `public/data/courses.json`
6. `public/data/episodes.json`
7. 現在のHTMLとCSS
8. 必要なJavaScript

そのうえで、最初に次を短く報告すること。

- 変更予定ファイル
- 変更理由
- 既存機能に影響する可能性
- 今回触らない範囲

無関係なファイルを大量に読み込まないこと。

---

# 2. 絶対に守ること

## 2.1 技術

使用可能：

- HTML
- CSS
- Vanilla JavaScript
- JSON

使用禁止：

- React
- Vue
- Svelte
- Astro
- jQuery
- Tailwind
- Bootstrap
- 外部UIコンポーネント
- 不要なnpm依存
- ビルド必須の構成への変更

初期版は静的サイトとして維持する。

## 2.2 データ

- コース名をHTMLへ直書きしない。
- 各回タイトルをHTMLへ直書きしない。
- A〜Fの6コースに固定しない。
- 回数を固定しない。
- JSONから自動表示する。
- データ構造は壊さない。
- 既存の`id`を勝手に変更しない。
- 公開状態の意味を変更しない。

## 2.3 公開範囲

`public`以下のみが公開対象。

以下は公開しない。

- `CODEX.md`
- `docs`
- `source`
- `raw-content`
- 制作メモ
- 未許諾画像
- 個人情報
- APIキー
- 内部用PDF

## 2.4 Git

- 勝手にcommitしない。
- 勝手にpushしない。
- 履歴を書き換えない。
- force pushしない。
- 作業終了時に、ユーザーが実行すべきGitコマンドだけ示す。

---

# 3. デザインコンセプト

## 3.1 中心コンセプト

**劇場の暗がりと、紙提灯のやわらかな光。**

画面全体は暗い。
しかし、冷たすぎず、重すぎず、閉鎖的すぎない。

黒そのものではなく、以下を中心にする。

- 深い焦げ茶
- 墨色
- 夜の紺
- くすんだ金
- 温かいオフホワイト

サイトを開いたときに感じるべき印象：

- 静か
- 知的
- 温かい
- 夜
- 劇場
- 本
- 余白
- 写真集
- 公開講義
- 少し謎めいている
- 入りづらくはない
- 続きを見たくなる

## 3.2 目指さないもの

- 映画館予約サイト
- YouTubeの模倣
- 高級ブランドの模倣
- 1940年代風装飾の過剰使用
- レトロテーマパーク
- ホラー
- ゴシック
- 派手なポスター
- 情報を詰め込んだ大学LMS
- 金色だらけの豪華風デザイン

---

# 4. デザイン哲学

## 4.1 主役は動画

画面内の情報優先順位は以下。

1. 動画
2. 講義タイトル
3. 前後ナビゲーション
4. 概要
5. 関連講義
6. 参考文献
7. 写真・資料
8. 補助情報

写真は主役ではない。
背景写真が動画や文字より強く見えないようにする。

## 4.2 余白を情報として使う

情報を詰め込まない。

推奨セクション間隔：

```css
--space-section-sm: 48px;
--space-section-md: 72px;
--space-section-lg: 96px;
```

講義ページでは、

```text
動画
↓ 40〜48px
前後ナビゲーション
↓ 56〜72px
概要
↓ 72〜96px
関連講義
↓ 72〜96px
参考文献
```

を基本とする。

## 4.3 金色は重要性を示す

金色は「豪華さ」ではなく「導線」。

使用対象：

- 主要CTA
- 現在地
- コース記号
- 小さな区切り線
- ホバー
- フォーカス
- 重要ラベル

使用禁止：

- 長文本文
- 背景全面
- 大きな面積
- すべての枠線
- すべての見出し

---

# 5. デザイントークン

`public/css/tokens.css`に集約すること。

```css
:root {
  /* Background */
  --color-bg: #0c0b0a;
  --color-bg-deep: #080706;
  --color-surface: #151311;
  --color-surface-soft: #1d1916;
  --color-surface-raised: #241f1b;

  /* Text */
  --color-text: #f4efe7;
  --color-text-soft: #d8d0c7;
  --color-text-muted: #aaa097;
  --color-text-dim: #7f766e;

  /* Accent */
  --color-gold: #c6a15b;
  --color-gold-soft: #8f7444;
  --color-gold-pale: #dfc794;

  /* Course accents */
  --course-a: #7c2b31;
  --course-b: #5d4663;
  --course-c: #445a70;
  --course-d: #8b6437;
  --course-e: #3f5b4c;
  --course-f: #766252;

  /* Lines */
  --color-line: rgba(255, 255, 255, 0.12);
  --color-line-strong: rgba(255, 255, 255, 0.20);

  /* Focus */
  --color-focus: #f0c98a;

  /* Radius */
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;

  /* Shadow */
  --shadow-soft: 0 18px 60px rgba(0, 0, 0, 0.28);
  --shadow-card: 0 12px 36px rgba(0, 0, 0, 0.24);

  /* Layout */
  --content-max: 1180px;
  --reading-max: 760px;
  --video-max: 1080px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 96px;

  /* Motion */
  --duration-fast: 160ms;
  --duration-normal: 240ms;
  --ease-standard: cubic-bezier(.2, .7, .2, 1);
}
```

既存トークンと重複する場合は整理する。
同じ意味の色を複数定義しない。

---

# 6. タイポグラフィ

## 6.1 見出し

日本語見出し：

```css
font-family:
  "Yu Mincho",
  "Hiragino Mincho ProN",
  "Noto Serif JP",
  serif;
```

英字見出し：

```css
font-family:
  "Cormorant Garamond",
  "Times New Roman",
  serif;
```

ただし、外部Webフォントを新規導入しない。
端末内フォントで成立させる。

## 6.2 本文

```css
font-family:
  "Hiragino Sans",
  "Yu Gothic",
  "Noto Sans JP",
  system-ui,
  sans-serif;
```

## 6.3 サイズ

PC：

```css
--font-display: clamp(2.6rem, 6vw, 5.4rem);
--font-page-title: clamp(2rem, 4vw, 3.6rem);
--font-section-title: clamp(1.5rem, 2.4vw, 2.2rem);
--font-card-title: 1.15rem;
--font-body: 1rem;
--font-small: 0.875rem;
```

本文：

- 16〜18px
- 行間1.75
- 1行35〜45文字程度
- 最大幅760px

## 6.4 見出しルール

- `h1`は1ページ1つ
- 見出し階層を飛ばさない
- 大文字英字を長文に使わない
- 字間は見出しだけ少し広げる
- 日本語本文のletter-spacingを広げすぎない

---

# 7. レイアウト

## 7.1 コンテナ

```css
.container {
  width: min(calc(100% - 40px), var(--content-max));
  margin-inline: auto;
}
```

スマートフォン：

```css
width: min(calc(100% - 32px), var(--content-max));
```

## 7.2 グリッド

コースカード：

- PC：3列
- Tablet：2列
- Mobile：1列

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 24px;
```

## 7.3 セクション

各セクションの先頭に、

- 小見出し
- 大見出し
- 補足文

を統一して配置する。

同じ階層のセクションで余白や見出し位置を変えない。

---

# 8. ヘッダー

## 8.1 PC

高さは72〜80px。

左：

- サイト短縮名
- 小さく演奏会名

右：

- コース
- 参考文献
- このサイトについて
- はじめての方へ

ヘッダーは黒背景。
下に細い境界線。

固定ヘッダーは可能だが、画面を圧迫しないこと。

## 8.2 スマートフォン

- 高さ60〜64px
- 左に短縮タイトル
- 右にメニューボタン
- メニューは全画面ではなく、上から静かに開く
- 閉じるボタンを明確にする
- ESCで閉じる
- 背景スクロールを止める
- キーボード操作可能にする

---

# 9. S-0 / welcome.html

## 9.1 目的

初回案内。
サイトの使い方を説明する。

## 9.2 レイアウト

第一画面に以下を収める。

- 小さな演奏会名
- 大見出し
- 短い説明
- 動画またはキービジュアル
- 主要ボタン

スクロール後に、

- どんなコースがあるか
- 好きな回から見られること
- 本番前後に使えること
- ゲストの可能性
- コース一覧へ進むボタン

## 9.3 ビジュアル

背景：

- 夜の路面電車
- 石畳
- 街灯
- ニューオーリンズの街
- 暗い劇場

写真に次を重ねる。

```css
linear-gradient(
  180deg,
  rgba(8, 7, 6, 0.42),
  rgba(8, 7, 6, 0.84)
)
```

中央または左寄りに、紙提灯の光を思わせる薄い暖色グラデーション。

## 9.4 CTA

主要文言：

```text
コースを選ぶ
```

補助：

```text
説明を飛ばして一覧へ
```

主要CTAは金背景。
補助CTAは透明背景＋細枠。

---

# 10. トップページ / index.html

## 10.1 ヒーロー

大見出し：

```text
『欲望という名の電車』を、
音楽の外側から読む。
```

補足：

```text
原作、人物、心理、演出、ニューオーリンズ、
現代社会、作品史から、ひとつの作品を横断的に読み解く。
```

背景画像は文字を邪魔しない。
必ず暗いオーバーレイ。

## 10.2 コース一覧

セクション見出し：

```text
COURSES
コースから選ぶ
```

カードは必ずJSONから生成。

## 10.3 おすすめの入口

タグや小カードで表示。

例：

- まず1本だけ見る
- 物語から入る
- 音楽から入る
- ブランチを知る
- ニューオーリンズを知る

見た目はコースカードより小さくする。

## 10.4 新着

新着講義は3〜4件。
「公開日」のみでなく、「最近追加された講義」として見せる。

---

# 11. コースカード

## 11.1 構造

```text
画像
コース記号
タイトル
副題
短い説明
公開済み回数
リンク
```

## 11.2 比率

カード画像：

```css
aspect-ratio: 4 / 3;
```

カード全体は高さを揃える。

## 11.3 ホバー

許可：

- 4px上がる
- 画像が1.02倍
- 枠線が少し明るくなる

禁止：

- 大きく傾く
- 強い発光
- 3D
- 派手な色変化

---

# 12. コースページ / course.html

## 12.1 コースヘッダー

左：

- コース記号
- タイトル
- 副題
- 概要

右：

- キービジュアル

スマートフォンでは縦積み。

## 12.2 回一覧

PC：

```text
[サムネイル] [回番号・タイトル・概要・時間・状態]
```

Mobile：

```text
[サムネイル]
[回番号]
[タイトル]
[概要]
[状態・時間]
```

## 12.3 公開状態

ラベルは文字で明示。

- 公開中
- 近日公開
- 制作中

色だけで伝えない。

---

# 13. 講義ページ / episode.html

## 13.1 上部

順序：

1. パンくず
2. コース名・回番号
3. タイトル
4. 副題
5. 動画

## 13.2 動画

```css
aspect-ratio: 16 / 9;
max-width: var(--video-max);
margin-inline: auto;
border-radius: var(--radius-md);
overflow: hidden;
box-shadow: var(--shadow-soft);
background: #000;
```

YouTube未公開時は、

- 準備中カード
- サムネイル
- 公開予定
- 概要

を表示。

空iframeは出さない。

## 13.3 ナビゲーション

動画直下：

```text
← 前回    コース一覧    次回 →
```

スマートフォン：

```text
← 前回      次回 →
コース一覧
```

または縦積み。

## 13.4 概要

本文は中央寄せではなく左揃え。
最大幅760px。
行間1.75。

## 13.5 チャプター

時刻を金色の小ラベル。
ラベルと本文の整列を統一。

## 13.6 関連コンテンツ

横断リンクを3〜4枚のカードで表示。

カードはコースカードより小型。

表示：

- ID
- タイトル
- 副題
- コース色
- 公開状態

## 13.7 参考文献

カードではなくリスト形式を基本とする。

各文献：

- 著者
- 書名
- 出版社・発行年
- 使用箇所
- 外部リンク

罫線で静かに区切る。

## 13.8 写真・資料

2〜3列。
画像の下に、

- キャプション
- 出典
- 撮影者
- ライセンス

を表示。

---

# 14. 参考文献ページ / bibliography.html

## 14.1 目的

資料一覧ではなく、講義との関係を見せる。

## 14.2 表示

分類フィルター：

- 原作
- 作家
- 心理学
- 精神医学
- 演劇
- ニューオーリンズ
- 音楽
- 映画
- 論文

各文献に、

```text
使用回：A-1 / B-5 / C-2
```

を表示。

---

# 15. 写真ルール

## 15.1 推奨

- モノクロ
- 低彩度
- セピア
- 強めの黒
- 余白を残す
- 人物の顔を大きく使いすぎない

## 15.2 禁止

- AI生成感の強い人物
- 権利不明の映画静止画
- 低解像度画像
- 派手な観光写真
- ストックフォト感の強い写真
- すべてのカードで同じ処理

## 15.3 オーバーレイ

```css
background:
  linear-gradient(
    180deg,
    rgba(12, 11, 10, 0.08),
    rgba(12, 11, 10, 0.76)
  ),
  url(...);
```

---

# 16. ボタン

## 16.1 Primary

```css
background: var(--color-gold);
color: #0b0a09;
min-height: 48px;
padding: 0 22px;
border-radius: var(--radius-sm);
```

## 16.2 Secondary

```css
background: transparent;
color: var(--color-text);
border: 1px solid var(--color-line-strong);
```

## 16.3 禁止

- pill型の乱用
- すべて丸角24px以上
- 発光
- bouncing
- グラデーション

---

# 17. アニメーション

## 17.1 許可

- opacity
- translateY 4px
- scale 1.02
- border-color
- background-color

## 17.2 時間

160〜240ms。

## 17.3 reduced motion

必須。

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 18. アクセシビリティ

必須。

- 本文16px以上
- 十分なコントラスト
- フォーカス表示
- キーボード操作
- iframe title
- alt
- aria-label
- 見出し階層
- ボタンとリンクの適切な使い分け
- メニューのフォーカストラップ
- 色だけに依存しない
- 動画字幕を想定
- クリック領域44px以上

---

# 19. レスポンシブ

## 19.1 ブレークポイント

```css
@media (max-width: 1100px) { ... }
@media (max-width: 780px) { ... }
@media (max-width: 520px) { ... }
```

## 19.2 Mobile first

必ずスマートフォンで成立させてからPCを広げる。

## 19.3 モバイルの注意

- 横スクロールを出さない
- 本文16px未満禁止
- タップ領域44px以上
- ヘッダーを高くしすぎない
- 動画を画面幅いっぱい
- 余白を削りすぎない
- 長いタイトルが3〜4行になっても崩れない

---

# 20. 実装対象ファイル

優先順位：

1. `public/css/tokens.css`
2. `public/css/layout.css`
3. `public/css/components.css`
4. `public/css/pages.css`
5. `public/welcome.html`
6. `public/index.html`
7. `public/course.html`
8. `public/episode.html`
9. `public/bibliography.html`
10. `public/about.html`

JSは必要最小限の修正のみ。

---

# 21. 実装フェーズ

## Phase 1

- トークン整理
- 全体背景
- コンテナ
- タイポグラフィ
- ヘッダー
- ボタン
- 基本カード

## Phase 2

- welcome
- index
- course
- episode

## Phase 3

- bibliography
- about
- モバイルメニュー
- アニメーション
- アクセシビリティ

## Phase 4

- 画像最適化
- OGP
- favicon
- 最終QA

---

# 22. 完了条件

以下をすべて満たすこと。

- JSON変更が画面へ反映される
- 既存URLが動く
- 初回S-0が動く
- 2回目以降はS-0を飛ばす
- S-0を手動再視聴できる
- 動画未公開でも壊れない
- コース数変更に耐える
- 回数変更に耐える
- 前後リンクが壊れない
- 関連講義が表示される
- PC・Tablet・Mobileで破綻しない
- キーボードで操作できる
- Cloudflare Pagesでそのまま公開できる
- `public`外が公開されない

---

# 23. 作業後の報告形式

作業後は次の形式で報告すること。

```text
変更ファイル
- ...

主な変更
- ...

デザイン上の変更
- ...

機能への影響
- ...

ローカル確認手順
1. ...
2. ...

未実装
- ...

Gitコマンド
git status
git add .
git commit -m "サイトデザインを再構築"
git push
```

---

# 24. Codexへ渡す最初の実行プロンプト

```text
CODEX.md、docs/architecture.md、docs/design-spec.md、
docs/CODEX_DESIGN_IMPLEMENTATION.mdを読んでください。

まず、現在のサイト構造とCSSを確認し、
変更予定ファイル、変更理由、既存機能への影響を列挙してください。

その後、Phase 1だけを実装してください。

Phase 1の対象：
- tokens.css
- layout.css
- components.css
- pages.cssの共通部分
- ヘッダー
- ボタン
- 基本カード
- 全体背景
- タイポグラフィ

制約：
- HTML、CSS、Vanilla JavaScriptのみ
- 既存JSONを壊さない
- 外部ライブラリを追加しない
- 既存URLを変更しない
- Git commit、pushはしない

実装後に、
変更ファイル、変更点、ローカル確認方法、未実装事項を報告してください。
```
