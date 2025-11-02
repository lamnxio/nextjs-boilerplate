import PetTable from "@/features/pet/components/pet-table"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t("PetPage.meta_title"),
  }
}

export default function PetPage() {
  return <PetTable />
}
