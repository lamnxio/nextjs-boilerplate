'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/stores'
import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function Counter() {
  const t = useTranslations('Counter')
  const count = useStore((state) => state.count)
  const increase = useStore((state) => state.increase)
  const decrease = useStore((state) => state.decrease)
  const resetCounter = useStore((state) => state.resetCounter)
  const resetAllSlices = useStore((state) => state.resetAllSlices)

  const handleResetAll = () => {
    resetAllSlices()
    toast.success(t('reset_all_success'))
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-primary text-center text-6xl font-bold">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={decrease} className="h-12 w-12" title={t('decrease')}>
            <Minus className="h-6 w-6" />
          </Button>

          <Button variant="outline" size="icon" onClick={resetCounter} className="h-12 w-12" title={t('reset')}>
            <RotateCcw className="h-6 w-6" />
          </Button>

          <Button variant="outline" size="icon" onClick={increase} className="h-12 w-12" title={t('increase')}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center">
          <Button variant="destructive" onClick={handleResetAll} className="w-full" title={t('reset_all')}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t('reset_all')}
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">{t('description')}</div>
      </CardContent>
    </Card>
  )
}
