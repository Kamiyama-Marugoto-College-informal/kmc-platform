import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          プロフィール設定
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          表示名や通知の受け取り方などをここで変更します。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>設定項目</CardTitle>
          <CardDescription>
            フォームやトグルは、要件が固まり次第ここに追加します。
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
