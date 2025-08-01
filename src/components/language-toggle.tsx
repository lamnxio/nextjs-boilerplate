'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import { Languages } from 'lucide-react'
import { usePathname, useRouter } from '@/configs/next-intl'

export function LanguageToggle() {
  const t = useTranslations('LanguageToggle')
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (locale: string) => {
    router.push(pathname, { locale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages />
          <span className="sr-only">{t('toggle_language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>{t('english')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('vi')}>{t('vietnamese')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
