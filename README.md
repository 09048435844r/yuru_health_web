# YuruHealth Web 💚

**Next.js + Supabase による、ネイティブアプリ体験を追求したパーソナルヘルスダッシュボード**

Streamlitの構造的限界を突破し、Galaxy Z Fold 7に完全最適化された、毎日触りたくなる洗練されたWebアプリケーション。

---

## ✨ 3つの意義

### 1. 妥協なき「ネイティブアプリ体験」の追求
- React Server Components + Client Componentsによる状態管理
- タブ切り替え・フィルタリングが**ゼロ秒**で反応
- SWRによるリアルタイムデータ購読（1分間隔）

### 2. Galaxy Z Fold 7のポテンシャル完全解放
- カバーディスプレイ（~280px）: 縦スクロール最適化
- メインディスプレイ（1768px）: 3-4カラムレイアウト
- Tailwind CSSによる1ミリ単位の調整

### 3. 責務の完全分離による「ゼロ負荷・エッジUI」
- クライアント → Supabase直接接続
- Raspberry Pi負荷ゼロ
- Vercelエッジデプロイで爆速表示

---

## 🏗️ 技術スタック

| 技術 | 用途 |
|------|------|
| **Next.js 14 (App Router)** | React Server Components + ゼロJS初期ロード |
| **TypeScript** | 型安全なSupabaseクエリ |
| **Tailwind CSS** | Galaxy Z Fold 7完全対応レスポンシブ |
| **shadcn/ui** | アクセシブルで美しいコンポーネント |
| **Recharts** | インタラクティブグラフ |
| **Supabase JS Client** | リアルタイムデータ購読 |
| **SWR** | データフェッチング・キャッシング |
| **Lucide React** | アイコン |

---

## 📁 プロジェクト構成

```
yuru_health_web/
├── app/
│   ├── page.tsx              # ダッシュボード（健康メトリクス + グラフ）
│   ├── timeline/             # データ到達状況
│   ├── insights/             # Gemini AI分析結果
│   ├── intake/               # 摂取記録タイムライン
│   ├── settings/             # API連携設定
│   └── health/               # サーバーヘルス監視
├── components/
│   ├── layout/               # レスポンシブレイアウト
│   ├── charts/               # Rechartsグラフコンポーネント
│   ├── metrics/              # メトリクス表示
│   └── ui/                   # shadcn/uiコンポーネント
├── lib/
│   ├── supabase/             # Supabaseクライアント
│   ├── hooks/                # カスタムフック（useHealthData等）
│   └── utils/                # ヘルパー関数（formatters等）
└── types/
    ├── database.ts           # Supabaseテーブル型定義
    └── health.ts             # 健康データ型定義
```

---

## 🚀 セットアップ

### 1. 環境変数設定

`.env.local`ファイルを作成：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 依存関係インストール

```bash
npm install
```

### 3. 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

---

## 📊 実装済み機能

### ダッシュボード（`/`）
- 健康メトリクス（レディネス、活動、睡眠、歩数）
- 睡眠スコア推移グラフ（30日間）
- 体重推移グラフ（30日間）
- リアルタイムデータ更新（1分間隔）

### Timeline（`/timeline`）
- データ到達状況の可視化
- 過去7日間の取得履歴
- ソース別カテゴリ表示

### AI Insights（`/insights`）
- Gemini AI分析結果表示
- 日次分析履歴
- モデル名表示

### Intake Log（`/intake`）
- 直近12時間の摂取記録
- シーン別バッジ表示
- 成分詳細表示

### Settings（`/settings`）
- API連携状態確認
- データ収集設定表示

### Server Health（`/health`）
- システムヘルス情報表示
- 将来的にSupabase移行予定

---

## 🎨 レスポンシブデザイン

### カスタムブレークポイント

```css
/* カバーディスプレイ */
max-[320px]: 縦スクロール最適化、余白最小化

/* タブレット */
md (768px+): 2カラムレイアウト

/* メインディスプレイ */
min-[1768px]: 3-4カラムレイアウト
```

---

## 🔄 データフロー

```
[Raspberry Pi Worker]
       ↓ (15分間隔)
   [Supabase]
       ↓ (リアルタイム購読)
  [Next.js App]
       ↓
 [Galaxy Z Fold 7]
```

---

## 🚢 Vercelデプロイ

### 1. Vercelプロジェクト作成

```bash
npm install -g vercel
vercel login
vercel
```

### 2. 環境変数設定

Vercelダッシュボードで以下を設定：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. デプロイ

```bash
vercel --prod
```

---

## 📝 開発ガイドライン

### コーディング規約
- **言語**: TypeScript（型安全性100%）
- **スタイル**: Tailwind CSS（ユーティリティファースト）
- **コンポーネント**: shadcn/ui（カスタマイズ可能）
- **状態管理**: SWR（サーバーステート）

### パフォーマンス目標
- タブ切り替え: < 100ms
- 初期ロード: < 2秒
- データ更新: 1分間隔（自動）

---

## 🔗 関連プロジェクト

- **Python Worker**: `/home/admin/yuru_health`（データ収集バックエンド）
- **Streamlit UI**: レガシーUI（段階的に廃止予定）

---

## 📄 ライセンス

このプロジェクトはオープンソースです。

---

**YuruHealth - ゆるストイック健康管理システム 💚**
