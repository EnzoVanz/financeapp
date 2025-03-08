# Finance App

A modern financial management application to help you track and manage your finances effectively.

## Repository

GitHub: [https://github.com/EnzoVanz/financeapp.git](https://github.com/EnzoVanz/financeapp.git)

## Development Progress

### Phase 1 - Foundation (MVP)
- [x] Project setup and infrastructure
  - [x] Next.js frontend setup
  - [x] NestJS backend setup
  - [x] Monorepo structure
- [x] Database setup
  - [x] PostgreSQL with Neon.tech
  - [x] Prisma ORM configuration
  - [x] Initial schema (Users, Expenses, Categories)
- [x] Basic user authentication
  - [x] Simple email/password auth
  - [x] JWT token-based sessions
  - [x] Password hashing
- [ ] Core expense tracking
  - [ ] Basic CRUD operations
  - [ ] Simple categorization
  - [ ] Essential data model
- [ ] Basic dashboard
  - [ ] Simple expense list
  - [ ] Basic charts (monthly overview)

### Future Enhancements
- Enhanced Authentication (When Needed)
  - OAuth providers (Google, GitHub)
  - Two-factor authentication
  - Password reset flow
  - Session management
  - Rate limiting
  
- Advanced Features
  - [ ] Income management
  - [ ] Basic budgeting
  - [ ] Essential reports
  - [ ] Enhanced categorization
  - [ ] Data import/export
  - [ ] Email notifications

## Tech Stack

### Frontend
- Framework: Next.js 15.2.1 (React 19.0.0 + TypeScript)
- Styling: Tailwind CSS
- Components: shadcn/ui
- State Management: Zustand 5.0.3 + React Query 5.67.2
- Data Visualization: Recharts/Chart.js

### Backend
- Runtime: Node.js
- Framework: NestJS 10.0.0
- Database: PostgreSQL (Neon.tech)
- ORM: Prisma
- Authentication: JWT + bcrypt

### Infrastructure
- Frontend Hosting: Vercel
- Database: Neon.tech
- Version Control: Git
- Package Manager: pnpm

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL database (we use Neon.tech)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/EnzoVanz/financeapp.git
   cd financeapp
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   # Copy example env files
   cp apps/api/.env.example apps/api/.env
   # Then edit .env with your database credentials
   ```

4. Start development servers
   You'll need to run both the frontend and backend servers in separate terminals:

   ```bash
   # Terminal 1 - Run backend
   pnpm api:dev

   # Terminal 2 - Run frontend
   pnpm web:dev

   # Alternative: Run just what you need
   pnpm dev        # Runs only frontend
   pnpm api:dev    # Runs only backend
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Database Management

This project uses Neon.tech for PostgreSQL hosting. You can manage your database through:

1. **Neon Console**
   - View and manage tables
   - Run SQL queries
   - Monitor performance
   - Set up development branches

2. **Prisma Studio**
   ```bash
   cd apps/api
   npx prisma studio
   ```

## Project Structure
```
financeapp/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   └── lib/            # Utilities
│   └── api/                # NestJS backend
│       ├── src/
│       │   ├── auth/       # Authentication (Implemented)
│       │   ├── expenses/   # Expense management
│       │   └── users/      # User management
│       └── prisma/         # Database schema
├── packages/
│   ├── types/             # Shared TypeScript types
│   ├── config/            # Shared configuration
│   └── database/          # Database utilities
└── README.md
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
