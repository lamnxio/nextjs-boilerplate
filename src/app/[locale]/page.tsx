import { Counter } from "@/components/counter"
import { TicTacToe } from "@/components/tic-tac-toe"
import { Statistics } from "@/components/statistics"
import { ResetAllButton } from "@/components/reset-all-button"
import { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  })

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  }
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  })

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
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
