import { useMainLanguage, useT } from '@/lib/i18n'
import { formatDisplayDate } from '@/lib/utils'

export default function SchedulePage() {
  const { language } = useMainLanguage()
  const t = useT()
  const today = new Date()
  
  return (
    <div className="space-y-2">
      <div>
        <h1 className="my-0 mb-2 text-3xl font-semibold tracking-tight text-foreground">
          {t('schelude.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDisplayDate(language, today, true)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('schelude.subtitle')}
        </p>
      </div>
    </div>
  )
}
