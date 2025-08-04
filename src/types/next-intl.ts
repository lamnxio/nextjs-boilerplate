import { useTranslations } from "next-intl"

export type Translator = ReturnType<typeof useTranslations>
export type TranslatorNs<T extends string> = ReturnType<typeof useTranslations<T>>
