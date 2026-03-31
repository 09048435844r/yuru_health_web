'use client'

import { FoldableLayout } from '@/components/layout/FoldableLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { formatJSTDate } from '@/lib/utils/formatters'

interface DataArrival {
  source: string
  category: string
  lastFetched: string
  count: number
}

export default function TimelinePage() {
  const { data, isLoading } = useSWR<DataArrival[]>('data-arrival', async () => {
    const supabase = createClient()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    
    const { data: rawData, error } = await supabase
      .from('raw_data_lake')
      .select('source, category, fetched_at')
      .gte('fetched_at', startDate.toISOString())
      .order('fetched_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching data arrival:', error)
      return []
    }

    const grouped = rawData?.reduce((acc, item) => {
      const key = `${item.source}-${item.category}`
      if (!acc[key]) {
        acc[key] = {
          source: item.source,
          category: item.category,
          lastFetched: item.fetched_at,
          count: 0
        }
      }
      acc[key].count++
      return acc
    }, {} as Record<string, DataArrival>)

    return Object.values(grouped || {})
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

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'oura': return 'bg-purple-500'
      case 'withings': return 'bg-blue-500'
      case 'googlefit': return 'bg-green-500'
      case 'switchbot': return 'bg-orange-500'
      case 'weather': return 'bg-sky-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <FoldableLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl">
            📊 データ到達状況
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            過去7日間のデータ取得履歴
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-[1768px]:grid-cols-3 gap-4">
          {data?.map((item) => (
            <Card key={`${item.source}-${item.category}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg max-[320px]:text-base">
                    {item.source}
                  </CardTitle>
                  <Badge className={`${getSourceBadgeColor(item.source)} text-white`}>
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">最終取得:</span>
                    <p className="font-medium">{formatJSTDate(item.lastFetched)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">取得回数:</span>
                    <p className="font-medium">{item.count} 回</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!data || data.length === 0) && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              データがありません
            </CardContent>
          </Card>
        )}
      </div>
    </FoldableLayout>
  )
}
