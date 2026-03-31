'use client'

import { FoldableLayout } from '@/components/layout/FoldableLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Cpu, HardDrive, Thermometer } from 'lucide-react'

export default function HealthPage() {
  return (
    <FoldableLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl flex items-center gap-2">
            <Activity className="h-8 w-8" />
            🖥️ サーバーヘルス
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            Raspberry Piシステム監視
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-[1768px]:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU温度</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-°C</div>
              <p className="text-xs text-muted-foreground mt-1">
                データ取得中...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU使用率</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-%</div>
              <p className="text-xs text-muted-foreground mt-1">
                データ取得中...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">メモリ使用率</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-%</div>
              <p className="text-xs text-muted-foreground mt-1">
                データ取得中...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ディスク使用率</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-%</div>
              <p className="text-xs text-muted-foreground mt-1">
                データ取得中...
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>システム情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">データソース:</span>
                <span className="font-medium">SQLite (data/system_health.db)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">収集間隔:</span>
                <span className="font-medium">5分</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">保持期間:</span>
                <span className="font-medium">30日</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">実行環境:</span>
                <span className="font-medium">Raspberry Pi (system_health_worker)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">
              <strong>注意:</strong> システムヘルスデータは現在SQLiteに保存されており、
              Next.jsアプリから直接アクセスできません。
              将来的にSupabaseに移行するか、API経由でアクセスする予定です。
            </p>
          </CardContent>
        </Card>
      </div>
    </FoldableLayout>
  )
}
