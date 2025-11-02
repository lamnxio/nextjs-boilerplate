"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { LoadingButton } from "@/components/ui/loading-button"
import { useAddPet } from "@/features/pet/hooks/use-pet-mutations"
import { AddPetValues } from "@/features/pet/validations/pet-validation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useOpenState } from "@/hooks/use-open-state"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import * as React from "react"
import { toast } from "sonner"
import { PetForm } from "./pet-form"

interface AddPetDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean
  onSuccess?: () => void
}

export function AddPetDialog({ showTrigger = true, onSuccess, ...props }: AddPetDialogProps) {
  const t = useTranslations()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const openState = useOpenState(props)

  const { mutateAsync, isPending } = useAddPet()

  const handleSubmit = async (values: AddPetValues) => {
    try {
      await mutateAsync({
        ...values,
        category: { name: values.category },
        photoUrls: values.photoUrls.map((photo) => photo.url),
        tags: values.tags?.map((tag) => ({
          name: tag,
        })),
      })
      openState.onOpenChange?.(false)
      toast.success(t("AddPetDialog.success_message"))
      onSuccess?.()
    } catch {
      toast.error(t("AddPetDialog.error_message"))
    }
  }

  if (isDesktop) {
    return (
      <Dialog {...props} {...openState}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              {t("AddPetDialog.trigger")}
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("AddPetDialog.title")}</DialogTitle>
            <DialogDescription>{t("AddPetDialog.description")}</DialogDescription>
          </DialogHeader>

          <PetForm onSubmit={handleSubmit} isLoading={isPending} showFooter={false}>
            {() => (
              <DialogFooter className="gap-2 sm:space-x-0">
                <DialogClose asChild>
                  <Button variant="outline">{t("PetForm.buttons.cancel")}</Button>
                </DialogClose>
                <LoadingButton type="submit" loading={isPending}>
                  {t("PetForm.buttons.save")}
                </LoadingButton>
              </DialogFooter>
            )}
          </PetForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button size="sm">
            <Plus />
            {t("AddPetDialog.trigger")}
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("AddPetDialog.title")}</DrawerTitle>
          <DrawerDescription>{t("AddPetDialog.description")}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <PetForm onSubmit={handleSubmit} isLoading={isPending} showFooter={false}>
            {() => (
              <DrawerFooter className="p-0 pb-4">
                <DrawerClose asChild>
                  <Button variant="outline">{t("PetForm.buttons.cancel")}</Button>
                </DrawerClose>
                <LoadingButton type="submit" loading={isPending}>
                  {t("PetForm.buttons.save")}
                </LoadingButton>
              </DrawerFooter>
            )}
          </PetForm>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
