'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Heart, TrendingUp, Footprints } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number | null | undefined
  icon: React.ReactNode
  unit?: string
  className?: string
}

function MetricCard({ title, value, icon, unit, className }: MetricCardProps) {
  const getScoreColor = (score: number | null | undefined) => {
    if (score === null || score === undefined) return 'bg-gray-500'
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className={cn('flex-1 min-w-[150px]', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium max-[320px]:text-xs">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold max-[320px]:text-xl">
            {value !== null && value !== undefined ? value : '-'}
          </div>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {value !== null && value !== undefined && (
          <div className="mt-2">
            <Badge className={cn('text-white', getScoreColor(value))}>
              {value >= 85 ? '良好' : value >= 70 ? '普通' : '要注意'}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface HealthMetricsProps {
  readiness?: number | null
  activity?: number | null
  sleep?: number | null
  steps?: number | null
}

export function HealthMetrics({ readiness, activity, sleep, steps }: HealthMetricsProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4 min-[1768px]:gap-6">
      <MetricCard
        title="レディネス"
        value={readiness}
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="活動スコア"
        value={activity}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="睡眠スコア"
        value={sleep}
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="歩数"
        value={steps}
        icon={<Footprints className="h-4 w-4 text-muted-foreground" />}
        unit="歩"
      />
    </div>
  )
}
