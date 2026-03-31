export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      weight_data: {
        Row: {
          id: string
          user_id: string
          measured_at: string
          weight_kg: number
          raw_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          measured_at: string
          weight_kg: number
          raw_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          measured_at?: string
          weight_kg?: number
          raw_data?: Json
          created_at?: string
        }
      }
      oura_data: {
        Row: {
          id: string
          user_id: string
          measured_at: string
          activity_score: number | null
          sleep_score: number | null
          readiness_score: number | null
          steps: number | null
          total_sleep_duration: number | null
          raw_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          measured_at: string
          activity_score?: number | null
          sleep_score?: number | null
          readiness_score?: number | null
          steps?: number | null
          total_sleep_duration?: number | null
          raw_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          measured_at?: string
          activity_score?: number | null
          sleep_score?: number | null
          readiness_score?: number | null
          steps?: number | null
          total_sleep_duration?: number | null
          raw_data?: Json
          created_at?: string
        }
      }
      google_fit_data: {
        Row: {
          id: string
          user_id: string
          date: string
          data_type: string
          value: Json
          raw_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          data_type: string
          value: Json
          raw_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          data_type?: string
          value?: Json
          raw_data?: Json
          created_at?: string
        }
      }
      environmental_logs: {
        Row: {
          id: string
          timestamp: string
          source: string
          latitude: number | null
          longitude: number | null
          weather_summary: string | null
          temp: number | null
          humidity: number | null
          co2: number | null
          pressure: number | null
          raw_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          timestamp: string
          source: string
          latitude?: number | null
          longitude?: number | null
          weather_summary?: string | null
          temp?: number | null
          humidity?: number | null
          co2?: number | null
          pressure?: number | null
          raw_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          timestamp?: string
          source?: string
          latitude?: number | null
          longitude?: number | null
          weather_summary?: string | null
          temp?: number | null
          humidity?: number | null
          co2?: number | null
          pressure?: number | null
          raw_data?: Json
          created_at?: string
        }
      }
      intake_logs: {
        Row: {
          id: string
          user_id: string
          timestamp: string
          scene: string
          snapshot_payload: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          timestamp: string
          scene: string
          snapshot_payload?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          timestamp?: string
          scene?: string
          snapshot_payload?: Json
          created_at?: string
        }
      }
      daily_insights: {
        Row: {
          id: string
          user_id: string | null
          date: string
          content: string
          model_name: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          date: string
          content: string
          model_name: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          date?: string
          content?: string
          model_name?: string
          created_at?: string
        }
      }
      raw_data_lake: {
        Row: {
          id: string
          user_id: string
          fetched_at: string
          source: string
          category: string
          payload: Json
          recorded_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          fetched_at: string
          source: string
          category: string
          payload: Json
          recorded_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fetched_at?: string
          source?: string
          category?: string
          payload?: Json
          recorded_at?: string | null
          created_at?: string
        }
      }
      oauth_tokens: {
        Row: {
          id: string
          user_id: string
          provider: string
          token_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          token_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          token_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
