import { language, tStore, isMainLanguage, setLanguage } from '~/lib/i18n'

export default function ProfileSettingsPage() {
  const t = tStore
  const lang = language

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement
    const next = target.value
    if (isMainLanguage(next)) {
      setLanguage(next)
    }
  }

  return (
    <div class="space-y-6">
      <div>
        <h1 class="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          {t()('profile.settings.title')}
        </h1>
        <p class="mt-1 text-sm text-muted-foreground">
          {t()('profile.settings.intro')}
        </p>
      </div>
      <div class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="font-semibold leading-none tracking-tight">
            {t()('language.main')}
          </h3>
          <p class="text-sm text-muted-foreground">
            {t()('language.description')}
          </p>
        </div>
        <div class="p-6 pt-0">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label
              for="main-language"
              class="text-sm font-medium text-foreground"
            >
              {t()('language.main')}
            </label>
            <select
              id="main-language"
              value={lang()}
              onChange={handleChange}
              class="h-9 max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="ja">{t()('language.japanese')}</option>
              <option value="en">{t()('language.english')}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="font-semibold leading-none tracking-tight">設定項目</h3>
          <p class="text-sm text-muted-foreground">
            フォームやトグルは、要件が固まり次第ここに追加します。
          </p>
        </div>
      </div>
    </div>
  )
}
