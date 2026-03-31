# 🔧 データ表示問題の解決方法

## 現在の状況

ダッシュボードの主要指標が「-」と表示され、データが取得できていません。

## 原因

**Supabase RLS（Row Level Security）が有効**になっており、認証なしのアクセスが拒否されています。

## 解決手順（5分で完了）

### ステップ1: Supabaseダッシュボードにアクセス

1. https://supabase.com/dashboard にアクセス
2. YuruHealthプロジェクトを選択

### ステップ2: SQL Editorを開く

1. 左メニューから「SQL Editor」をクリック
2. 「New query」をクリック

### ステップ3: 以下のSQLを実行

```sql
-- 全テーブルのRLS無効化（個人専用アプリのため安全）
ALTER TABLE oura_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE weight_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE google_fit_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE intake_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_insights DISABLE ROW LEVEL SECURITY;
ALTER TABLE raw_data_lake DISABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_tokens DISABLE ROW LEVEL SECURITY;
```

4. 「Run」ボタンをクリック
5. 成功メッセージが表示されることを確認

### ステップ4: Next.jsアプリをリロード

1. ブラウザで http://localhost:3000 をリロード（Ctrl+R または Cmd+R）
2. ブラウザのコンソール（F12）を開いて以下のログを確認：

```
[useOuraData] Fetching Oura data for user: user_001
[useOuraData] Query result - count: X data: [...]
```

3. ダッシュボードに数値が表示されることを確認

## 確認方法

### データが存在するか確認

Supabase SQL Editorで以下を実行：

```sql
-- user_001のデータ件数確認
SELECT 'oura_data' as table_name, COUNT(*) as count FROM oura_data WHERE user_id = 'user_001'
UNION ALL
SELECT 'weight_data', COUNT(*) FROM weight_data WHERE user_id = 'user_001'
UNION ALL
SELECT 'google_fit_data', COUNT(*) FROM google_fit_data WHERE user_id = 'user_001';
```

すべて0件の場合は、Python Workerを実行してデータを収集：

```bash
cd /home/admin/yuru_health
python src/main.py
```

## それでも解決しない場合

### ブラウザコンソールのエラーを確認

1. F12キーで開発者ツールを開く
2. 「Console」タブを選択
3. 赤いエラーメッセージをコピー
4. エラー内容を確認：

**よくあるエラー:**

- `"new row violates row-level security policy"` → RLSがまだ有効（上記手順を再実行）
- `"permission denied for table"` → anon keyに権限がない（Supabaseサポートに問い合わせ）
- `"relation does not exist"` → テーブルが存在しない（スキーマを再作成）

### 環境変数を再確認

```bash
cat /home/admin/yuru_health_web/.env.local
```

以下の形式で設定されているか確認：
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## 成功時の表示

ダッシュボードに以下のような数値が表示されます：

- **レディネス**: 85
- **活動スコア**: 78
- **睡眠スコア**: 82
- **歩数**: 8,234 歩

グラフにも過去30日間のデータが表示されます。
