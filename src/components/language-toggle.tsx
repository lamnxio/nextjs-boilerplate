"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/lib/next-intl"
import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useMemo } from "react"

export function LanguageToggle() {
  const t = useTranslations("LanguageToggle")
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const languageOptions = useMemo(
    () => [
      { value: "en", label: t("english") },
      { value: "vi", label: t("vietnamese") },
    ],
    [t],
  )

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      router.push(pathname, { locale: newLocale })
    },
    [router, pathname],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages />
          <span className="sr-only">{t("toggle_language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map(({ value, label }) => (
          <DropdownMenuCheckboxItem key={value} checked={value === locale} onClick={() => handleLanguageChange(value)}>
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
