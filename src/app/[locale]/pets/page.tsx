import PetTable from '@/modules/pets/pet-table'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type PetPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: PetPageProps): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({
    locale,
    namespace: 'PetPage',
  })

  return {
    title: t('meta_title'),
  }
}

export default async function PetPage(props: PetPageProps) {
  const { locale } = await props.params
  setRequestLocale(locale)

  return <PetTable />
}
