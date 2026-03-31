# Supabase RLS設定ガイド

## 問題の診断

Next.jsアプリからSupabaseのデータが取得できない場合、以下の原因が考えられます：

1. **RLS（Row Level Security）が有効**で、認証なしのアクセスが拒否されている
2. 環境変数が正しく設定されていない
3. ネットワーク接続の問題

## 解決方法

### オプション1: RLSを無効化（個人専用アプリの場合）

YuruHealthは個人専用アプリのため、開発段階ではRLSを無効化することを推奨します。

**Supabaseダッシュボードでの手順:**

1. Supabaseダッシュボード（https://supabase.com/dashboard）にログイン
2. プロジェクトを選択
3. 左メニューから「SQL Editor」を選択
4. 以下のSQLを実行：

```sql
-- 全テーブルのRLS無効化
ALTER TABLE oura_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE weight_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE google_fit_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE intake_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_insights DISABLE ROW LEVEL SECURITY;
ALTER TABLE raw_data_lake DISABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_tokens DISABLE ROW LEVEL SECURITY;
```

5. 「Run」をクリックして実行
6. Next.jsアプリをリロードして確認

### オプション2: RLSポリシーを設定（本番環境推奨）

認証なしでも特定のユーザーのデータを読み取れるようにするポリシーを設定：

```sql
-- oura_dataテーブルの読み取りポリシー
CREATE POLICY "Allow anonymous read for user_001"
ON oura_data
FOR SELECT
USING (user_id = 'user_001');

-- 他のテーブルも同様に設定
CREATE POLICY "Allow anonymous read for user_001"
ON weight_data
FOR SELECT
USING (user_id = 'user_001');

CREATE POLICY "Allow anonymous read for user_001"
ON google_fit_data
FOR SELECT
USING (user_id = 'user_001');

CREATE POLICY "Allow anonymous read for user_001"
ON environmental_logs
FOR SELECT
USING (true);

CREATE POLICY "Allow anonymous read for user_001"
ON intake_logs
FOR SELECT
USING (user_id = 'user_001');

CREATE POLICY "Allow anonymous read for user_001"
ON daily_insights
FOR SELECT
USING (user_id = 'user_001');

CREATE POLICY "Allow anonymous read for user_001"
ON raw_data_lake
FOR SELECT
USING (user_id = 'user_001');
```

## 確認方法

### 1. ブラウザコンソールでエラーを確認

1. ブラウザで開発者ツールを開く（F12）
2. 「Console」タブを選択
3. 以下のようなログが表示されるか確認：

```
[useOuraData] Fetching Oura data for user: user_001
[useOuraData] Query result - count: X data: [...]
```

エラーが表示される場合：
```
[useOuraData] Supabase error: { message: "...", code: "...", ... }
```

### 2. RLS設定を確認

Supabase SQL Editorで以下を実行：

```sql
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'oura_data',
    'weight_data',
    'google_fit_data',
    'environmental_logs',
    'intake_logs',
    'daily_insights',
    'raw_data_lake',
    'oauth_tokens'
  )
ORDER BY tablename;
```

`rowsecurity`が`false`であればRLSは無効化されています。

### 3. データ存在確認

```sql
-- user_001のOuraデータを確認
SELECT COUNT(*) FROM oura_data WHERE user_id = 'user_001';

-- user_001の体重データを確認
SELECT COUNT(*) FROM weight_data WHERE user_id = 'user_001';

-- user_001のGoogle Fitデータを確認
SELECT COUNT(*) FROM google_fit_data WHERE user_id = 'user_001';
```

## トラブルシューティング

### エラー: "new row violates row-level security policy"

→ RLSが有効で、書き込みポリシーが設定されていない
→ 上記のオプション1または2を実行

### エラー: "permission denied for table"

→ anon keyに読み取り権限がない
→ Supabaseダッシュボードで「Authentication」→「Policies」を確認

### データが0件

→ Python Workerがまだデータを収集していない
→ `/home/admin/yuru_health`でWorkerを手動実行：

```bash
cd /home/admin/yuru_health
python src/main.py
```

## 環境変数の確認

`.env.local`ファイルが正しく設定されているか確認：

```bash
cat /home/admin/yuru_health_web/.env.local
```

以下の値が設定されているはず：
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```
