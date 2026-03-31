import { createClient } from '@/lib/supabase/client'

export async function testSupabaseConnection() {
  const supabase = createClient()
  
  console.log('=== Supabase Connection Test ===')
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  
  // Test 1: Check if we can query oura_data table
  console.log('\n--- Test 1: Query oura_data ---')
  const { data: ouraData, error: ouraError, count: ouraCount } = await supabase
    .from('oura_data')
    .select('*', { count: 'exact', head: false })
    .limit(5)
  
  console.log('Oura data count:', ouraCount)
  console.log('Oura data:', ouraData)
  console.log('Oura error:', ouraError)
  
  // Test 2: Check if we can query weight_data table
  console.log('\n--- Test 2: Query weight_data ---')
  const { data: weightData, error: weightError, count: weightCount } = await supabase
    .from('weight_data')
    .select('*', { count: 'exact', head: false })
    .limit(5)
  
  console.log('Weight data count:', weightCount)
  console.log('Weight data:', weightData)
  console.log('Weight error:', weightError)
  
  // Test 3: Check if we can query google_fit_data table
  console.log('\n--- Test 3: Query google_fit_data ---')
  const { data: fitData, error: fitError, count: fitCount } = await supabase
    .from('google_fit_data')
    .select('*', { count: 'exact', head: false })
    .limit(5)
  
  console.log('Google Fit data count:', fitCount)
  console.log('Google Fit data:', fitData)
  console.log('Google Fit error:', fitError)
  
  // Test 4: Check with user_id filter
  console.log('\n--- Test 4: Query with user_id filter ---')
  const { data: userData, error: userError, count: userCount } = await supabase
    .from('oura_data')
    .select('*', { count: 'exact', head: false })
    .eq('user_id', 'user_001')
    .limit(5)
  
  console.log('User data count:', userCount)
  console.log('User data:', userData)
  console.log('User error:', userError)
  
  console.log('\n=== Test Complete ===')
  
  return {
    oura: { count: ouraCount, error: ouraError },
    weight: { count: weightCount, error: weightError },
    fit: { count: fitCount, error: fitError },
    user: { count: userCount, error: userError }
  }
}
