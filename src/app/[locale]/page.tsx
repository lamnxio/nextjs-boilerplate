import { Counter } from '@/components/counter'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({
    locale,
    namespace: 'HomePage',
  })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <Counter />
}
