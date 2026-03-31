'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { OuraData } from '@/types/health'
import { formatJSTDate } from '@/lib/utils/formatters'

interface SleepScoreChartProps {
  data: OuraData[]
}

export function SleepScoreChart({ data }: SleepScoreChartProps) {
  const chartData = data.map(item => ({
    date: formatJSTDate(item.measured_at),
    score: item.sleep_score || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg max-[320px]:text-base">睡眠スコア推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} className="max-[320px]:h-[200px]">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
