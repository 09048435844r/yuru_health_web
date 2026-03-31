'use client'

import { FoldableLayout, ResponsiveGrid } from '@/components/layout/FoldableLayout'
import { HealthMetrics } from '@/components/metrics/HealthMetrics'
import { SleepScoreChart } from '@/components/charts/SleepScoreChart'
import { WeightChart } from '@/components/charts/WeightChart'
import { useOuraData, useWeightData, useGoogleFitSteps, useOuraHistory } from '@/lib/hooks/useHealthData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { testSupabaseConnection } from '@/lib/utils/supabase-test'

export default function Home() {
  const { data: ouraData, isLoading: ouraLoading, error: ouraError } = useOuraData()
  const { data: weightData, isLoading: weightLoading, error: weightError } = useWeightData(30)
  const { data: steps, isLoading: stepsLoading, error: stepsError } = useGoogleFitSteps()
  const { data: ouraHistory, isLoading: historyLoading, error: historyError } = useOuraHistory(30)
  
  // Run connection test on mount
  useEffect(() => {
    testSupabaseConnection()
  }, [])

  const isLoading = ouraLoading || weightLoading || stepsLoading || historyLoading

  if (isLoading) {
    return (
      <FoldableLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </FoldableLayout>
    )
  }

  return (
    <FoldableLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl">
            今日のコンディション 💚
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            {new Date().toLocaleDateString('ja-JP', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>

        {/* 健康メトリクス */}
        <section>
          <h2 className="text-xl font-semibold mb-4 max-[320px]:text-lg">
            主要指標
          </h2>
          <HealthMetrics
            readiness={ouraData?.readiness_score}
            activity={ouraData?.activity_score}
            sleep={ouraData?.sleep_score}
            steps={steps}
          />
        </section>

        {/* グラフ */}
        <ResponsiveGrid>
          {ouraHistory && ouraHistory.length > 0 && (
            <SleepScoreChart data={ouraHistory} />
          )}
          {weightData && weightData.length > 0 && (
            <WeightChart data={weightData} />
          )}
        </ResponsiveGrid>

        {/* データ更新情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">データ更新状況</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>最終更新: {new Date().toLocaleTimeString('ja-JP')}</p>
            <p className="mt-1">データは1分ごとに自動更新されます</p>
          </CardContent>
        </Card>
      </div>
    </FoldableLayout>
  )
}
