import { LanguageToggle } from '@/components/language-toggle'
import { ModeToggle } from '@/components/mode-toggle'
import { Link } from '@/lib/next-intl'
import { Dog, Home } from 'lucide-react'
import { Button } from '../ui/button'

export function AppHeader() {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" asChild>
          <Link href="/">
            <Home />
          </Link>
        </Button>
        <Button size="icon" variant="outline" asChild>
          <Link href="/pets">
            <Dog />
          </Link>
        </Button>
        <LanguageToggle />
        <ModeToggle />
      </div>
    </div>
  )
}
