export interface Category {
  id: string
  name: string
  description?: string
}

export interface Expense {
  id: string
  amount: number
  description: string
  date: string
  categoryId: string
  category: Category
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ExpenseFormData {
  id: string
  amount: number
  description: string
  date: string
  categoryId: string
}

export interface ExpenseResponse {
  expenses: Expense[]
  total: number
  page: number
  limit: number
}

export interface CategoryResponse {
  categories: Category[]
}

export interface ExpenseSummary {
  totalExpenses: number
  monthlyExpenses: number
  averageExpense: number
} 