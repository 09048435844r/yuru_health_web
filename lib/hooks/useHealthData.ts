'use client'

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { OuraData, WeightData, GoogleFitData } from '@/types/health'

const USER_ID = 'user_001'

export function useOuraData() {
  return useSWR<OuraData | null>('oura-latest', async () => {
    try {
      const supabase = createClient()
      console.log('[useOuraData] Fetching Oura data for user:', USER_ID)
      
      const { data, error, count } = await supabase
        .from('oura_data')
        .select('*', { count: 'exact' })
        .eq('user_id', USER_ID)
        .order('measured_at', { ascending: false })
        .limit(1)
      
      if (error) {
        console.error('[useOuraData] Supabase error:', error)
        console.error('[useOuraData] Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        return null
      }
      
      console.log('[useOuraData] Query result - count:', count, 'data:', data)
      
      if (!data || data.length === 0) {
        console.warn('[useOuraData] No data found for user:', USER_ID)
        return null
      }
      
      return data[0]
    } catch (err) {
      console.error('[useOuraData] Unexpected error:', err)
      return null
    }
  }, {
    refreshInterval: 60000,
    onError: (err) => console.error('[useOuraData] SWR error:', err),
  })
}

export function useWeightData(limit: number = 30) {
  return useSWR<WeightData[]>(`weight-${limit}`, async () => {
    try {
      const supabase = createClient()
      console.log('[useWeightData] Fetching weight data for user:', USER_ID)
      
      const { data, error, count } = await supabase
        .from('weight_data')
        .select('*', { count: 'exact' })
        .eq('user_id', USER_ID)
        .order('measured_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        console.error('[useWeightData] Supabase error:', error)
        console.error('[useWeightData] Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        return []
      }
      
      console.log('[useWeightData] Query result - count:', count, 'data length:', data?.length)
      return data || []
    } catch (err) {
      console.error('[useWeightData] Unexpected error:', err)
      return []
    }
  }, {
    refreshInterval: 60000,
    onError: (err) => console.error('[useWeightData] SWR error:', err),
  })
}

export function useGoogleFitSteps() {
  return useSWR<number | null>('googlefit-steps', async () => {
    try {
      const supabase = createClient()
      console.log('[useGoogleFitSteps] Fetching Google Fit steps for user:', USER_ID)
      
      const { data, error, count } = await supabase
        .from('google_fit_data')
        .select('value', { count: 'exact' })
        .eq('user_id', USER_ID)
        .eq('data_type', 'steps')
        .order('date', { ascending: false })
        .limit(1)
      
      if (error) {
        console.error('[useGoogleFitSteps] Supabase error:', error)
        console.error('[useGoogleFitSteps] Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        return null
      }
      
      console.log('[useGoogleFitSteps] Query result - count:', count, 'data:', data)
      
      if (!data || data.length === 0) {
        console.warn('[useGoogleFitSteps] No data found for user:', USER_ID)
        return null
      }
      
      return data[0]?.value as number || null
    } catch (err) {
      console.error('[useGoogleFitSteps] Unexpected error:', err)
      return null
    }
  }, {
    refreshInterval: 60000,
    onError: (err) => console.error('[useGoogleFitSteps] SWR error:', err),
  })
}

export function useOuraHistory(days: number = 30) {
  return useSWR<OuraData[]>(`oura-history-${days}`, async () => {
    try {
      const supabase = createClient()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      console.log('[useOuraHistory] Fetching Oura history for user:', USER_ID, 'from:', startDate.toISOString())
      
      const { data, error, count } = await supabase
        .from('oura_data')
        .select('*', { count: 'exact' })
        .eq('user_id', USER_ID)
        .gte('measured_at', startDate.toISOString())
        .order('measured_at', { ascending: true })
      
      if (error) {
        console.error('[useOuraHistory] Supabase error:', error)
        console.error('[useOuraHistory] Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        return []
      }
      
      console.log('[useOuraHistory] Query result - count:', count, 'data length:', data?.length)
      return data || []
    } catch (err) {
      console.error('[useOuraHistory] Unexpected error:', err)
      return []
    }
  }, {
    refreshInterval: 300000,
    onError: (err) => console.error('[useOuraHistory] SWR error:', err),
  })
}
