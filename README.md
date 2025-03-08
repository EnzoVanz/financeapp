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
- [ ] Basic user authentication
  - [ ] Simple email/password auth
  - [ ] JWT token-based sessions
  - [ ] Password hashing
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
- Framework: Next.js 14 (React + TypeScript)
- Styling: Tailwind CSS
- Components: shadcn/ui
- State Management: Zustand + React Query
- Data Visualization: Recharts/Chart.js

### Backend
- Runtime: Node.js
- Framework: NestJS
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
   ```bash
   # Start backend
   cd apps/api
   pnpm run start:dev

   # In another terminal, start frontend
   cd apps/web
   pnpm run dev
   ```

## Project Structure
```
financeapp/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   └── lib/           # Utilities
│   └── api/                # NestJS backend
│       ├── src/
│       │   ├── auth/       # Authentication
│       │   ├── expenses/   # Expense management
│       │   └── users/      # User management
│       └── prisma/         # Database schema
├── packages/               # Shared packages
└── README.md
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
