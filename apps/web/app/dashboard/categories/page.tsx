'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryForm } from '@/components/categories/category-form'
import { CategoryList } from '@/components/categories/category-list'
import { api } from '@/lib/api-client'
import { Category, CategoryResponse } from '@finance/types'

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const response = await api.get<CategoryResponse>('/categories')
      if (response.data) {
        setCategories(response.data.categories)
      }
    } catch (err) {
      setError('Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setShowForm(true)
  }

  function handleFormSuccess() {
    setShowForm(false)
    setEditingCategory(null)
    fetchCategories()
  }

  function handleFormCancel() {
    setShowForm(false)
    setEditingCategory(null)
  }

  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <CategoryForm
          initialData={editingCategory || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onRefresh={fetchCategories}
      />
    </div>
  )
} 