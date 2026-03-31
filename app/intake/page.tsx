'use client'

import { FoldableLayout } from '@/components/layout/FoldableLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { IntakeLog } from '@/types/health'
import { Loader2, Utensils } from 'lucide-react'
import { formatJSTDateTime } from '@/lib/utils/formatters'

const USER_ID = 'user_001'

export default function IntakePage() {
  const { data: intakeLogs, isLoading } = useSWR<IntakeLog[]>('intake-logs', async () => {
    const supabase = createClient()
    const startTime = new Date()
    startTime.setHours(startTime.getHours() - 12)
    
    const { data, error } = await supabase
      .from('intake_logs')
      .select('*')
      .eq('user_id', USER_ID)
      .gte('timestamp', startTime.toISOString())
      .order('timestamp', { ascending: false })
      .limit(20)
    
    if (error) {
      console.error('Error fetching intake logs:', error)
      return []
    }
    return data || []
  }, {
    refreshInterval: 60000,
  })

  if (isLoading) {
    return (
      <FoldableLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </FoldableLayout>
    )
  }

  const getSceneBadgeColor = (scene: string) => {
    switch (scene.toLowerCase()) {
      case '朝食': return 'bg-yellow-500'
      case '昼食': return 'bg-orange-500'
      case '夕食': return 'bg-red-500'
      case '間食': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <FoldableLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl flex items-center gap-2">
            <Utensils className="h-8 w-8" />
            🍽️ 摂取記録
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            直近12時間の摂取ログ
          </p>
        </div>

        <div className="space-y-3">
          {intakeLogs?.map((log) => {
            const payload = log.snapshot_payload as any
            
            return (
              <Card key={log.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${getSceneBadgeColor(log.scene)} text-white`}>
                          {log.scene}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatJSTDateTime(log.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {payload && typeof payload === 'object' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      {Object.entries(payload).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">
                            {typeof value === 'number' ? value.toFixed(1) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {(!intakeLogs || intakeLogs.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                直近12時間の摂取記録がありません
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Streamlit UIから摂取記録を追加できます
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </FoldableLayout>
  )
}
