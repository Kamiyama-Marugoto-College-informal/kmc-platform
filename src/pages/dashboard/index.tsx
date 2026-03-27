import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          ダッシュボード
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          概要と直近の情報をここに表示します。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>コンテンツ</CardTitle>
          <CardDescription>
            今後、チャレンジファンドや通知のサマリーをここに配置します。
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
