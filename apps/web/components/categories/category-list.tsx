'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api-client'
import { Category } from '@finance/types'

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onRefresh: () => void
}

export function CategoryList({ categories, onEdit, onRefresh }: CategoryListProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category? This will also delete all expenses in this category.')) {
      return
    }

    setIsLoading(id)
    setError('')

    try {
      await api.delete(`/categories/${id}`)
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category')
    } finally {
      setIsLoading(null)
    }
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No categories found. Add your first category!
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
      {categories.map((category) => (
        <Card key={category.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-gray-500">{category.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(category)}
                disabled={isLoading === category.id}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(category.id)}
                disabled={isLoading === category.id}
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