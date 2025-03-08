import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Cleans up test data from the database
 */
async function cleanup() {
  try {
    // Delete in correct order to handle foreign key constraints
    await prisma.expense.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('✨ Cleaned up test data');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

/**
 * Creates test data in the database
 */
async function createTestData() {
  try {
    // 1. Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'test123', // In real app, this would be hashed
        name: 'Test User'
      }
    });
    console.log('✅ Created user:', user);

    // 2. Create some categories
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Food', description: 'Groceries and restaurants' }
      }),
      prisma.category.create({
        data: { name: 'Transport', description: 'Bus, taxi, fuel' }
      })
    ]);
    console.log('✅ Created categories:', categories);

    // 3. Create some test expenses
    const expenses = await Promise.all([
      prisma.expense.create({
        data: {
          amount: 50.00,
          description: 'Grocery shopping',
          date: new Date(),
          userId: user.id,
          categoryId: categories[0].id
        }
      }),
      prisma.expense.create({
        data: {
          amount: 25.00,
          description: 'Bus ticket',
          date: new Date(),
          userId: user.id,
          categoryId: categories[1].id
        }
      })
    ]);
    console.log('✅ Created expenses:', expenses);

    // 4. Fetch and verify the data
    const userWithExpenses = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        expenses: {
          include: {
            category: true
          }
        }
      }
    });
    console.log('\n📊 Fetched user with expenses:', JSON.stringify(userWithExpenses, null, 2));

    return { user, categories, expenses };
  } catch (error) {
    console.error('Error creating test data:', error);
    throw error;
  }
}

/**
 * Main function to run the database tests
 * Usage:
 * - Run with cleanup: pnpm tsx src/test-db.ts cleanup
 * - Run without cleanup: pnpm tsx src/test-db.ts
 */
async function main() {
  try {
    // Check if cleanup is requested
    if (process.argv.includes('cleanup')) {
      await cleanup();
      return;
    }

    await createTestData();
  } catch (error) {
    console.error('Error in main:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main(); 