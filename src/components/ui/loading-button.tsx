import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import React from "react"
import { Button } from "./button"

interface Props extends React.ComponentProps<typeof Button> {
  loading?: boolean
}

export const LoadingButton = ({ loading = false, disabled, children, className, ...props }: Props) => {
  return (
    <Button disabled={loading || disabled} className={cn(loading && "[&_svg:not([data-slot='loading-icon'])]:hidden", className)} {...props}>
      {loading && <Loader2 data-slot="loading-icon" className="animate-spin" />}
      {children}
    </Button>
  )
}
