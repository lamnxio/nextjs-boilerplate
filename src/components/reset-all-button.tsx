"use client"

import { Button } from "@/components/ui/button"
import { useStore } from "@/stores"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function ResetAllButton() {
  const t = useTranslations("Actions")
  const resetAllSlices = useStore((state) => state.resetAllSlices)

  const handleResetAll = () => {
    resetAllSlices()
    toast.success(t("reset_all_success"))
  }

  return (
    <Button variant="destructive" onClick={handleResetAll} className="w-fit">
      <Trash2 className="mr-2 h-4 w-4" />
      {t("reset_all")}
    </Button>
  )
}
