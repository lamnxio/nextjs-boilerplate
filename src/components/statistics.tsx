"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/stores"
import { BarChart3 } from "lucide-react"
import { useTranslations } from "next-intl"

export function Statistics() {
  const t = useTranslations("TicTacToe")
  const {
    ticTacToe: { gamesPlayed, xWins, oWins, draws },
  } = useStore()

  if (gamesPlayed === 0) {
    return null
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {t("statistics")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <Badge variant="outline" className="w-full justify-center">
              {gamesPlayed}
            </Badge>
            <p className="text-muted-foreground mt-1 text-xs">{t("total_games")}</p>
          </div>
          <div>
            <Badge variant="outline" className="w-full justify-center text-blue-600">
              {xWins}
            </Badge>
            <p className="text-muted-foreground mt-1 text-xs">{t("x_wins")}</p>
          </div>
          <div>
            <Badge variant="outline" className="w-full justify-center text-red-600">
              {oWins}
            </Badge>
            <p className="text-muted-foreground mt-1 text-xs">{t("o_wins")}</p>
          </div>
          <div>
            <Badge variant="outline" className="w-full justify-center text-yellow-600">
              {draws}
            </Badge>
            <p className="text-muted-foreground mt-1 text-xs">{t("draws")}</p>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground text-center text-sm">
          {xWins > oWins && xWins > 0 && <span className="font-medium text-blue-600">{t("x_leading")}</span>}
          {oWins > xWins && oWins > 0 && <span className="font-medium text-red-600">{t("o_leading")}</span>}
          {xWins === oWins && xWins > 0 && <span className="font-medium text-yellow-600">{t("tied")}</span>}
          {gamesPlayed > 0 && xWins === 0 && oWins === 0 && <span>{t("no_winner_yet")}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
