-- YuruHealth Next.js MVP用 RLS無効化スクリプト
-- 個人専用アプリのため、開発段階ではRLSを無効化してデータアクセスを許可

-- oura_data テーブルのRLS無効化
ALTER TABLE oura_data DISABLE ROW LEVEL SECURITY;

-- weight_data テーブルのRLS無効化
ALTER TABLE weight_data DISABLE ROW LEVEL SECURITY;

-- google_fit_data テーブルのRLS無効化
ALTER TABLE google_fit_data DISABLE ROW LEVEL SECURITY;

-- environmental_logs テーブルのRLS無効化
ALTER TABLE environmental_logs DISABLE ROW LEVEL SECURITY;

-- intake_logs テーブルのRLS無効化
ALTER TABLE intake_logs DISABLE ROW LEVEL SECURITY;

-- daily_insights テーブルのRLS無効化
ALTER TABLE daily_insights DISABLE ROW LEVEL SECURITY;

-- raw_data_lake テーブルのRLS無効化
ALTER TABLE raw_data_lake DISABLE ROW LEVEL SECURITY;

-- oauth_tokens テーブルのRLS無効化
ALTER TABLE oauth_tokens DISABLE ROW LEVEL SECURITY;

-- 確認用クエリ
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
