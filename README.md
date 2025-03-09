# Finance App

A modern, responsive financial management application to help you track and manage your finances effectively. Works seamlessly on both desktop and mobile devices.

## Project Structure

```
financeapp/
├── apps/
│   ├── api/         # Backend API service
│   └── web/         # Next.js frontend application
└── packages/
    └── types/       # Shared TypeScript types
```

## Features

- 💰 Expense Management
  - Create, read, update, and delete expenses
  - Categorize expenses
  - View expense summaries and statistics
- 🔒 User Authentication
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates

## Development Progress & Roadmap

### Phase 1 - Foundation (MVP) ✨
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
  - [x] Protected routes
- [ ] Core expense tracking
  - [x] Expense CRUD API endpoints
  - [x] Expense form component
  - [x] Expense listing page
  - [ ] Category management
  - [ ] Filters and sorting
- [ ] Basic dashboard
  - [ ] Expense summary cards
  - [ ] Monthly expense breakdown
  - [ ] Category distribution chart
  - [ ] Recent transactions list

### Phase 2 - Enhanced Features 🚀
- Core Feature Enhancements
  - [ ] Advanced filtering and search
  - [ ] Bulk operations
  - [ ] Export to CSV/PDF
  - [ ] Recurring expenses
  - [ ] Budget alerts
- Mobile Optimization
  - [ ] PWA support
  - [ ] Offline capabilities
  - [ ] Touch-optimized interactions
  - [ ] Native-like animations
  - [ ] Swipe gestures
- Enhanced Authentication
  - [ ] OAuth providers (Google, GitHub)
  - [ ] Two-factor authentication
  - [ ] Password reset flow
  - [ ] Session management
  - [ ] Rate limiting
- Advanced Features
  - [ ] Income management
  - [ ] Budget planning
  - [ ] Financial goals
  - [ ] Savings tracking
  - [ ] Investment portfolio
  - [ ] Multi-currency support
  - [ ] Enhanced categorization
  - [ ] Data import/export
  - [ ] Email notifications
  - [ ] Expense insights and AI analysis

### Phase 3 - Polish & Scale 🌟
- Performance
  - [ ] API optimization
  - [ ] Image optimization
  - [ ] Caching strategies
  - [ ] Database indexing
- Analytics & Reporting
  - [ ] Advanced analytics dashboard
  - [ ] Custom report builder
  - [ ] Expense forecasting
  - [ ] Trend analysis
- User Experience
  - [ ] Onboarding flow
  - [ ] Tooltips and guides
  - [ ] Keyboard shortcuts
  - [ ] Theme customization
- Infrastructure
  - [ ] CI/CD pipeline
  - [ ] Automated testing
  - [ ] Error monitoring
  - [ ] Performance monitoring
  - [ ] Auto-scaling setup

## Tech Stack

### Frontend
- Framework: Next.js 15.2.1 (React 19.0.0 + TypeScript)
- Styling: Tailwind CSS
- Components: shadcn/ui
- State Management: Zustand 5.0.3 + React Query 5.67.2
- Data Visualization: Recharts/Chart.js
- Mobile Support: Responsive design, touch-friendly UI

### Backend
- Runtime: Node.js
- Framework: NestJS 10.0.0
- Database: PostgreSQL (Neon.tech)
- ORM: Prisma
- Authentication: JWT + bcrypt
- Security: Helmet, CORS, Rate limiting

### Infrastructure
- Frontend Hosting: Vercel
- Database: Neon.tech
- Version Control: Git
- Package Manager: pnpm
- API Documentation: Swagger/OpenAPI (coming soon)

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

## Mobile Support

The application is designed to be fully responsive and mobile-friendly:

- **Responsive Design**: Works on all screen sizes
- **Mobile Navigation**: Touch-friendly menu and interactions
- **Progressive Enhancement**: Basic functionality works everywhere
- **Future PWA Support**: Planned offline capabilities

### Mobile Features
- Responsive layouts
- Touch-friendly inputs
- Mobile-optimized forms
- Swipe gestures (coming soon)
- Native-like experience

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Security

The application implements several security best practices:

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Security headers with Helmet
- Input validation
- Error handling
- Rate limiting (coming soon)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
