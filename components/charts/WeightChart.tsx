'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { WeightData } from '@/types/health'
import { formatJSTDate } from '@/lib/utils/formatters'

interface WeightChartProps {
  data: WeightData[]
}

export function WeightChart({ data }: WeightChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map(item => ({
      date: formatJSTDate(item.measured_at),
      weight: item.weight_kg,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg max-[320px]:text-base">体重推移</CardTitle>
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
              tick={{ fontSize: 12 }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#3b82f6" 
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
