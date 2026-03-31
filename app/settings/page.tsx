'use client'

import { FoldableLayout } from '@/components/layout/FoldableLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, CheckCircle2, XCircle } from 'lucide-react'

const apiIntegrations = [
  { name: 'Oura Ring', status: 'active', description: '睡眠・活動・コンディションスコア' },
  { name: 'Withings', status: 'active', description: '体重データ' },
  { name: 'Google Fit', status: 'active', description: '歩数・睡眠データ' },
  { name: 'SwitchBot', status: 'active', description: '室内環境（CO2・温湿度）' },
  { name: 'OpenWeatherMap', status: 'active', description: '天気・気温・気圧' },
]

export default function SettingsPage() {
  return (
    <FoldableLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-[320px]:text-2xl flex items-center gap-2">
            <Settings className="h-8 w-8" />
            ⚙️ 設定
          </h1>
          <p className="text-muted-foreground mt-2 max-[320px]:text-sm">
            API連携とシステム設定
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4 max-[320px]:text-lg">
            API連携状態
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiIntegrations.map((api) => (
              <Card key={api.name}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg max-[320px]:text-base">
                        {api.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {api.description}
                      </CardDescription>
                    </div>
                    {api.status === 'active' ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        接続中
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        未接続
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>データ収集</CardTitle>
            <CardDescription>
              Raspberry Pi上のPython Workerが15分間隔でデータを自動収集しています
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">収集間隔:</span>
                <span className="font-medium">15分（3, 18, 33, 48分）</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">実行環境:</span>
                <span className="font-medium">GitHub Actions + Raspberry Pi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">データベース:</span>
                <span className="font-medium">Supabase (PostgreSQL)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OAuth認証</CardTitle>
            <CardDescription>
              OAuth認証の管理はStreamlit UIから行えます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Withings、Google Fitの認証トークンはSupabaseの<code className="bg-muted px-1 py-0.5 rounded">oauth_tokens</code>テーブルに保存されています。
            </p>
          </CardContent>
        </Card>
      </div>
    </FoldableLayout>
  )
}
