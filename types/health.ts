import { Database } from './database'

export type OuraData = Database['public']['Tables']['oura_data']['Row']
export type WeightData = Database['public']['Tables']['weight_data']['Row']
export type GoogleFitData = Database['public']['Tables']['google_fit_data']['Row']
export type EnvironmentalLog = Database['public']['Tables']['environmental_logs']['Row']
export type IntakeLog = Database['public']['Tables']['intake_logs']['Row']
export type DailyInsight = Database['public']['Tables']['daily_insights']['Row']
export type RawDataLake = Database['public']['Tables']['raw_data_lake']['Row']

export interface HealthMetrics {
  readiness?: number
  activity?: number
  sleep?: number
  steps?: number
  weight?: number
}

export interface DashboardData {
  oura: OuraData | null
  weight: WeightData | null
  googleFit: GoogleFitData[]
  environmental: EnvironmentalLog | null
}
