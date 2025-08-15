/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ExpenseForm from "./ExpenceForm"
import ExpenseStats from "./Expence-Status"
import ExpenseChart from "./Expence-Chart"
import ExpenseList from "./Expence-List"


export interface Expense {
  id: string
  title: string
  amount: number
  category: "Food" | "Transport" | "Shopping" | "Others"
  date: string
  createdAt: Date
}

export default function ExpenseTracker() {
  const [user, setUser] = useState<| null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const router = useRouter()

  // Check authentication on mount
//   useEffect(() => {
//     const currentUser = 
//     if (!currentUser) {
//       router.push("/login")
//     } else {
//       setUser(currentUser)
//     }
//     setIsLoading(false)
//   }, [router])

  // Load expenses from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedExpenses = localStorage.getItem(`expenses_${user.id}`)
      if (savedExpenses) {
        const parsed = JSON.parse(savedExpenses)
        setExpenses(
          parsed.map((exp: any) => ({
            ...exp,
            createdAt: new Date(exp.createdAt),
          })),
        )
      }
    }
  }, [user])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`expenses_${user.id}`, JSON.stringify(expenses))
    }
  }, [expenses, user])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const addExpense = (expenseData: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const updateExpense = (id: string, expenseData: Omit<Expense, "id" | "createdAt">) => {
    setExpenses((prev) => prev.map((exp) => (exp.id === id ? { ...exp, ...expenseData } : exp)))
    setEditingExpense(null)
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
  }

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = filterCategory === "all" || expense.category === filterCategory
    const dateMatch =
      (!dateRange.start || expense.date >= dateRange.start) && (!dateRange.end || expense.date <= dateRange.end)
    return categoryMatch && dateMatch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <ExpenseForm
              onSubmit={editingExpense ? (data) => updateExpense(editingExpense.id, data) : addExpense}
              initialData={editingExpense}
              isEditing={!!editingExpense}
              onCancel={() => setEditingExpense(null)}
            />
          </div>

          {/* Right Column - Stats and List */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseStats expenses={filteredExpenses} />

            {expenses.length > 0 && <ExpenseChart expenses={expenses} />}

            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setEditingExpense}
              onDelete={deleteExpense}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
