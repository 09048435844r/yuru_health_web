-- YuruHealth データ存在確認とRLS設定チェック

-- 1. RLS設定確認
SELECT 
  tablename,
  rowsecurity as rls_enabled
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

-- 2. user_001のデータ件数確認
SELECT 'oura_data' as table_name, COUNT(*) as count FROM oura_data WHERE user_id = 'user_001'
UNION ALL
SELECT 'weight_data', COUNT(*) FROM weight_data WHERE user_id = 'user_001'
UNION ALL
SELECT 'google_fit_data', COUNT(*) FROM google_fit_data WHERE user_id = 'user_001'
UNION ALL
SELECT 'intake_logs', COUNT(*) FROM intake_logs WHERE user_id = 'user_001'
UNION ALL
SELECT 'daily_insights', COUNT(*) FROM daily_insights WHERE user_id = 'user_001';

-- 3. 最新のOuraデータ確認
SELECT 
  measured_at,
  readiness_score,
  activity_score,
  sleep_score,
  steps
FROM oura_data
WHERE user_id = 'user_001'
ORDER BY measured_at DESC
LIMIT 5;

-- 4. 最新の体重データ確認
SELECT 
  measured_at,
  weight_kg
FROM weight_data
WHERE user_id = 'user_001'
ORDER BY measured_at DESC
LIMIT 5;

-- 5. 最新のGoogle Fitデータ確認
SELECT 
  date,
  data_type,
  value
FROM google_fit_data
WHERE user_id = 'user_001'
  AND data_type = 'steps'
ORDER BY date DESC
LIMIT 5;
