import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateExpenseDto, UpdateExpenseDto, ExpenseFilterDto } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        date: new Date(createExpenseDto.date),
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(userId: string, filters: ExpenseFilterDto) {
    const where = {
      userId,
      ...(filters.startDate && {
        date: {
          gte: new Date(filters.startDate),
        },
      }),
      ...(filters.endDate && {
        date: {
          ...(filters.startDate && { gte: new Date(filters.startDate) }),
          lte: new Date(filters.endDate),
        },
      }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
    };

    const [expenses, total] = await Promise.all([
      this.prisma.expense.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          date: 'desc',
        },
        skip: filters.page ? (filters.page - 1) * (filters.limit || 10) : undefined,
        take: filters.limit || undefined,
      }),
      this.prisma.expense.count({ where }),
    ]);

    return {
      expenses,
      total,
      page: filters.page || 1,
      limit: filters.limit || total,
    };
  }

  async findOne(userId: string, id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!expense || expense.userId !== userId) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(userId: string, id: string, updateExpenseDto: UpdateExpenseDto) {
    // Check if expense exists and belongs to user
    await this.findOne(userId, id);

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...updateExpenseDto,
        ...(updateExpenseDto.date && { date: new Date(updateExpenseDto.date) }),
      },
      include: {
        category: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    // Check if expense exists and belongs to user
    await this.findOne(userId, id);

    await this.prisma.expense.delete({
      where: { id },
    });
  }

  async getSummary(userId: string) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [totalExpenses, monthlyExpenses] = await Promise.all([
      this.prisma.expense.aggregate({
        where: { userId },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: {
          userId,
          date: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
        _sum: { amount: true },
      }),
    ]);

    const expenseCount = await this.prisma.expense.count({
      where: { userId },
    });

    return {
      totalExpenses: totalExpenses._sum.amount || 0,
      monthlyExpenses: monthlyExpenses._sum.amount || 0,
      averageExpense: expenseCount > 0 ? (totalExpenses._sum.amount || 0) / expenseCount : 0,
    };
  }
}