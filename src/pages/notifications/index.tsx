import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          通知
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          お知らせとアラートの一覧をここに表示します。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>通知一覧</CardTitle>
          <CardDescription>
            接続先の API が整い次第、ここに通知リストを表示します。
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
