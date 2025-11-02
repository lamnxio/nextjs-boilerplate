import { Counter } from "@/components/counter"
import { ResetAllButton } from "@/components/reset-all-button"
import { Statistics } from "@/components/statistics"
import { TicTacToe } from "@/components/tic-tac-toe"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t("HomePage.meta_title"),
    description: t("HomePage.meta_description"),
  }
}

export default function Page() {
  const t = useTranslations()

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("HomePage.title")}</h1>
        <p className="text-muted-foreground">{t("HomePage.subtitle")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Counter />
          <Statistics />
        </div>
        <div>
          <TicTacToe />
        </div>
      </div>

      <div className="flex justify-center">
        <ResetAllButton />
      </div>
    </div>
  )
}
