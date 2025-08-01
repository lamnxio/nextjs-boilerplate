'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { getAddPetSchema, PetValues } from '@/validations/pet-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/libs/utils'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputList } from '@/components/ui/tags-input'

interface PetFormProps {
  onSubmit: (values: PetValues) => void
  isLoading?: boolean
  onCancel?: () => void
  showFooter?: boolean
  footerClassName?: string
  children?: (form: UseFormReturn<PetValues>) => React.ReactNode
}

export function PetForm({ onSubmit, isLoading = false, onCancel, showFooter = true, footerClassName, children }: PetFormProps) {
  const t = useTranslations()

  const form = useForm<PetValues>({
    resolver: zodResolver(getAddPetSchema(t)),
    defaultValues: {
      name: '',
      photoUrls: [
        {
          url: '',
        },
      ],
      category: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'photoUrls',
  })

  const statusOptions = React.useMemo(() => {
    return ['available', 'pending', 'sold'].map((status) => ({
      value: status,
      label: t(`PetForm.status.${status}`),
    }))
  }, [t])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>{t('PetTable.columns.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('PetTable.columns.name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>{t('PetTable.columns.category')}</FormLabel>
              <FormControl>
                <Input placeholder={t('PetTable.columns.category')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>{t('PetTable.columns.photos')}</FormLabel>

              {fields.map((fieldItem, index) => (
                <FormField
                  key={fieldItem.id}
                  control={form.control}
                  name={`photoUrls.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>

                        {fields.length > 1 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => remove(index)} disabled={field.disabled}>
                            <Trash className="text-destructive h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormMessage />

              <Button type="button" className="w-fit" variant="outline" size="sm" onClick={() => append({ url: '' })} disabled={field.disabled}>
                <Plus />
                {t('PetForm.buttons.add_photo')}
              </Button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <TagsInput {...field} value={value} onValueChange={onChange} editable addOnPaste>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInputList>
                    {value?.map((v) => (
                      <TagsInputItem key={v} value={v}>
                        {v}
                      </TagsInputItem>
                    ))}
                    <TagsInputInput placeholder="Tag" />
                  </TagsInputList>
                </FormControl>
                <FormMessage />
              </TagsInput>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>{t('PetTable.columns.status')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('PetTable.columns.status')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showFooter && (
          <div className={cn('flex justify-end gap-2', footerClassName)}>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('PetForm.buttons.cancel')}
              </Button>
            )}
            <LoadingButton type="submit" loading={isLoading}>
              {t('PetForm.buttons.save')}
            </LoadingButton>
          </div>
        )}

        {children?.(form)}
      </form>
    </Form>
  )
}
