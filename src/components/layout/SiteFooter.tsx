import { Button } from '@/components/ui/button'
import { useMainLanguage } from '@/context/MainLanguageContext'
import { formatFooterCopyright, mainLanguageMessages } from '@/lib/mainLanguage'

export function SiteFooter() {
  const { language } = useMainLanguage()
  const year = new Date().getFullYear()
  const copyright = formatFooterCopyright(language, year)
  const msg = mainLanguageMessages[language]

  return (
    <footer className="border-t border-border bg-muted/30 py-4 text-center text-xs text-muted-foreground">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="my-0">{copyright}</p>
        <nav
          aria-label={language === 'ja' ? 'フッターリンク' : 'Footer links'}
          className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          <Button
            variant="link"
            size="xs"
            className="text-muted-foreground"
            asChild
          >
            <a href="#">{msg.footerTerms}</a>
          </Button>
          <Button
            variant="link"
            size="xs"
            className="text-muted-foreground"
            asChild
          >
            <a href="#">{msg.footerPrivacy}</a>
          </Button>
        </nav>
      </div>
    </footer>
  )
}
