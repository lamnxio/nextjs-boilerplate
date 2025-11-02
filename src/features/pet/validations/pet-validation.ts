import { useTranslations } from "next-intl"
import { z } from "zod"

const status = ["available", "pending", "sold"] as const

export const useGetAddPetSchema = () => {
  const t = useTranslations()

  return z.object({
    category: z.string().min(1, t("PetForm.validation.category_name_required")),
    name: z.string().min(1, t("PetForm.validation.name_required")),
    photoUrls: z.array(z.object({ url: z.url(t("PetForm.validation.invalid_url")) })).min(1, t("PetForm.validation.photo_urls_required")),
    tags: z.array(z.string().min(1, t("PetForm.validation.tag_name_required"))).optional(),
    status: z.enum(status, {
      message: t("PetForm.validation.status_required"),
    }),
  })
}

export type AddPetValues = z.infer<ReturnType<typeof useGetAddPetSchema>>
