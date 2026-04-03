import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useMainLanguage } from '@/context/MainLanguageContext'
import { isMainLanguage, mainLanguageMessages } from '@/lib/mainLanguage'

export function ProfileSettingsPage() {
  const { language, setLanguage } = useMainLanguage()
  const t = mainLanguageMessages[language]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          {t.profileSettings}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.settingsPageIntro}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.mainLanguage}</CardTitle>
          <CardDescription>{t.languageDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label
              htmlFor="main-language"
              className="text-sm font-medium text-foreground"
            >
              {t.mainLanguage}
            </label>
            <select
              id="main-language"
              value={language}
              onChange={(event) => {
                const next = event.target.value
                if (isMainLanguage(next)) {
                  setLanguage(next)
                }
              }}
              className="h-9 max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="ja">{t.japanese}</option>
              <option value="en">{t.english}</option>
            </select>
          </div>
        </CardContent>
      </Card>
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
