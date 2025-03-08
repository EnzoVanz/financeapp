import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, UpdateExpenseDto, ExpenseFilterDto } from './dto/expense.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(req.user.userId, createExpenseDto);
  }

  @Get()
  findAll(@Request() req, @Query() filters: ExpenseFilterDto) {
    return this.expensesService.findAll(req.user.userId, filters);
  }

  @Get('summary')
  getSummary(@Request() req) {
    return this.expensesService.getSummary(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.expensesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(req.user.userId, id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.expensesService.remove(req.user.userId, id);
  }
} 