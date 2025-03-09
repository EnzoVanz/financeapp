'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api-client'
import { Expense } from '@finance/types'

interface Category {
  id: string
  name: string
}

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onRefresh: () => void
}

export function ExpenseList({ expenses, onEdit, onRefresh }: ExpenseListProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    setIsLoading(id)
    setError('')

    try {
      await api.delete(`/expenses/${id}`)
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete expense')
    } finally {
      setIsLoading(null)
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No expenses found. Add your first expense!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
      {expenses.map((expense) => (
        <Card key={expense.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{expense.description}</h3>
              <div className="text-sm text-gray-500 space-x-2">
                <span>${expense.amount.toFixed(2)}</span>
                <span>•</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{expense.category.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(expense)}
                disabled={isLoading === expense.id}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(expense.id)}
                disabled={isLoading === expense.id}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 