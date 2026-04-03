import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useMainLanguage } from '@/context/MainLanguageContext'
import { formatWelcome } from '@/lib/mainLanguage'

export function DashboardPage() {
  const { user } = useAuth()
  const { language } = useMainLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          ダッシュボード
        </h1>
        {user ? (
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatWelcome(language, user.name)}
          </p>
        ) : null}
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
