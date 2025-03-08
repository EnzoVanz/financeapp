'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react'

interface ExpenseSummary {
  totalExpenses: number
  monthlyExpenses: number
  averageExpense: number
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<ExpenseSummary>({
    totalExpenses: 0,
    monthlyExpenses: 0,
    averageExpense: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3001/expenses/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) throw new Error('Failed to fetch summary')
        const data = await response.json()
        setSummary(data)
      } catch (error) {
        console.error('Error fetching summary:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [])

  const stats = [
    {
      name: 'Total Expenses',
      value: `$${summary.totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      change: '+4.75%',
      changeType: 'increase'
    },
    {
      name: 'Monthly Expenses',
      value: `$${summary.monthlyExpenses.toFixed(2)}`,
      icon: ArrowDownIcon,
      change: '-1.39%',
      changeType: 'decrease'
    },
    {
      name: 'Average Expense',
      value: `$${summary.averageExpense.toFixed(2)}`,
      icon: ArrowUpIcon,
      change: '+2.45%',
      changeType: 'increase'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here's an overview of your expenses
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 animate-pulse bg-gray-200 rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className={`text-xs ${
                  stat.changeType === 'increase' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Placeholder for charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              Chart coming soon...
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              Chart coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 