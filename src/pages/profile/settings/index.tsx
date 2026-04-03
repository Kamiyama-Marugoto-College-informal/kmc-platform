import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { isLocale, t, type Locale } from '@/lib/i18n'

interface ProfileSettingsPageProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function ProfileSettingsPage({
  locale,
  onLocaleChange,
}: ProfileSettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t('profileSettings', locale)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('languageDescription', locale)}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('mainLanguage', locale)}</CardTitle>
          <CardDescription>
            <label className="flex items-center gap-3" htmlFor="main-language">
              <span className="text-sm text-foreground">
                {t('mainLanguage', locale)}
              </span>
              <select
                id="main-language"
                className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                value={locale}
                onChange={(event) => {
                  const nextLocale = event.target.value
                  if (isLocale(nextLocale)) {
                    onLocaleChange(nextLocale)
                  }
                }}
              >
                <option value="ja">{t('languageJapanese', locale)}</option>
                <option value="en">{t('languageEnglish', locale)}</option>
              </select>
            </label>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
