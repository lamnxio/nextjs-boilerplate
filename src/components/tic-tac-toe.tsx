'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/stores'
import { cn } from '@/lib/utils'
import { RotateCcw, Trophy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useEffect, useRef } from 'react'

export function TicTacToe() {
  const t = useTranslations('TicTacToe')
  const prevWinnerRef = useRef<string | null>(null)

  const {
    ticTacToe: { board, currentPlayer, winner, isGameOver, isDraw, gamesPlayed },
    makeMove,
    resetGame,
    resetStats,
  } = useStore()

  useEffect(() => {
    if (winner && winner !== prevWinnerRef.current) {
      toast.success(t('win_message', { player: winner }))
      prevWinnerRef.current = winner
    }
    if (!winner) {
      prevWinnerRef.current = null
    }
  }, [winner, t])

  const getStatusText = () => {
    if (winner) {
      return t('player_wins', { player: winner })
    }
    if (isDraw) {
      return t('draw')
    }
    return t('player_turn', { player: currentPlayer })
  }

  const getStatusColor = () => {
    if (winner === 'X') return 'text-blue-600'
    if (winner === 'O') return 'text-red-600'
    if (isDraw) return 'text-yellow-600'
    return currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5" />
          {t('title')}
        </CardTitle>
        <p className={cn('text-lg font-medium transition-colors', getStatusColor())}>{getStatusText()}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="mx-auto grid w-fit grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={cn(
                'h-16 w-16 text-2xl font-bold transition-all duration-200',
                'hover:scale-105 active:scale-95',
                cell === 'X' && 'border-blue-200 bg-blue-50 text-blue-600',
                cell === 'O' && 'border-red-200 bg-red-50 text-red-600',
                !cell && !isGameOver && 'hover:bg-gray-50',
              )}
              onClick={() => makeMove(index)}
              disabled={isGameOver || cell !== null}
            >
              {cell}
            </Button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <Button onClick={resetGame} variant="secondary" size="sm">
            <RotateCcw />
            {t('play_again')}
          </Button>
          {gamesPlayed > 0 && (
            <Button onClick={resetStats} variant="ghost" size="sm">
              {t('reset_stats')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
