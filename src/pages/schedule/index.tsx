import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMainLanguage, useT } from '@/lib/i18n'

const EMBED_URL =
  'https://calendar.google.com/calendar/embed?src=4grade%40kamiyama.ac.jp&ctz=Asia%2FTokyo'

export default function SchedulePage() {
  const { language } = useMainLanguage()
  const t = useT()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="my-0 mb-2 text-3xl font-semibold tracking-tight text-foreground">
          {t('schelude.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('schelude.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('schelude.weekCalendar')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-hidden rounded-md border border-border">
            <iframe
              src={EMBED_URL}
              title={language === 'ja' ? 'Googleカレンダー' : 'Google Calendar'}
              style={{ border: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="h-[600px] w-full"
            />
          </div>

          <a
            href={EMBED_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-primary underline-offset-2 hover:underline"
          >
            {language === 'ja' ? 'Googleカレンダーを別タブで開く' : 'Open Google Calendar in a new tab'}
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
