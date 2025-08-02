'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/stores'
import { Calculator, Minus, Plus, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Counter() {
  const t = useTranslations('Counter')
  const count = useStore((state) => state.count)
  const increase = useStore((state) => state.increase)
  const decrease = useStore((state) => state.decrease)
  const resetCounter = useStore((state) => state.resetCounter)

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Calculator className="h-5 w-5" />
          {t('title')}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-primary text-center text-6xl font-bold">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" className="size-16" onClick={decrease} title={t('decrease')}>
            <Minus className="size-6" />
          </Button>

          <Button variant="outline" size="icon" className="size-16" onClick={resetCounter} title={t('reset')}>
            <RotateCcw className="size-6" />
          </Button>

          <Button variant="outline" size="icon" className="size-16" onClick={increase} title={t('increase')}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
