import { useState } from 'react'

export function useOpenState(props: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const isControlled = props.open !== undefined && props.onOpenChange !== undefined
  const [internalOpen, setInternalOpen] = useState(false)

  const open = isControlled ? props.open! : internalOpen
  const onOpenChange = isControlled ? props.onOpenChange! : setInternalOpen

  return { open, onOpenChange }
}
