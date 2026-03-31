'use client'

import { FoldableLayout } from '@/components/layout/FoldableLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { DailyInsight } from '@/types/health'
import { Loader2, Brain } from 'lucide-react'
import { formatJSTDate, formatJSTDateTime } from '@/lib/utils/formatters'

const USER_ID = 'user_001'

export default function InsightsPage() {
  const { data: insights, isLoading } = useSWR<DailyInsight[]>('daily-insights', async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('daily_insights')
      .select('*')
      .eq('user_id', USER_ID)
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      console.error('Error fetching insights:', error)
      return []
    }
    return data || []
  }, {
    refreshInterval: 300000, // 5分ごとに更新
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

  return (
    <FoldableLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl flex items-center gap-2">
            <Brain className="h-8 w-8" />
            🧠 AI Insights
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            Gemini AIによる健康データ分析
          </p>
        </div>

        <div className="space-y-4">
          {insights?.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg max-[320px]:text-base">
                      {formatJSTDate(insight.date)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatJSTDateTime(insight.created_at)}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {insight.model_name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {insight.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!insights || insights.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                AI分析結果がまだありません
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                データが蓄積されると、Gemini AIが自動的に分析を行います
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </FoldableLayout>
  )
}
