'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExpenseForm } from '@/components/expenses/expense-form'
import { ExpenseList } from '@/components/expenses/expense-list'
import { api } from '@/lib/api-client'

interface Category {
  id: string
  name: string
}

interface Expense {
  id: string
  amount: number
  description: string
  date: string
  category: Category
  categoryId: string
}

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
  }, [])

  async function fetchExpenses() {
    try {
      const response = await api.get<{ expenses: Expense[] }>('/expenses')
      if (response.data) {
        setExpenses(response.data.expenses)
      }
    } catch (err) {
      setError('Failed to load expenses')
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.get<{ categories: Category[] }>('/categories')
      if (response.data) {
        setCategories(response.data.categories)
      }
    } catch (err) {
      setError('Failed to load categories')
    }
  }

  function handleEdit(expense: Expense) {
    setEditingExpense(expense)
    setShowForm(true)
  }

  function handleFormSuccess() {
    setShowForm(false)
    setEditingExpense(null)
    fetchExpenses()
  }

  function handleFormCancel() {
    setShowForm(false)
    setEditingExpense(null)
  }

  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <ExpenseForm
          initialData={editingExpense || undefined}
          categories={categories}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onRefresh={fetchExpenses}
      />
    </div>
  )
} 