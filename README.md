# Pet Project

A modern full-stack Todo application built with Next.js, Express, Prisma, and TypeScript in a Turborepo monorepo, featuring robust error handling with `neverthrow`.

## Features

- ✨ Full-stack TypeScript development
- 🎯 Type-safe API calls with tRPC
- 🚀 Monorepo setup with Turborepo
- 🔄 Optimistic updates for better UX
- ⚠️ Robust error handling with `neverthrow`
- 🗃️ PostgreSQL database with Prisma ORM
- 🎨 Styled with Tailwind CSS

## Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your database:
- Create a PostgreSQL database
- Copy `.env.example` to `.env` and update with your database credentials:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/your_database"
```
- Run database migrations:
```bash
cd packages/database
pnpm db:generate
pnpm db:push
```

3. Start the development servers:
```bash
# Start both frontend and backend in parallel
pnpm dev
```

## Project Structure

```
.
├── apps/
│   ├── web/                 # Next.js frontend
│   │   └── src/
│   │       ├── app/        # Next.js app router
│   │       ├── components/ # React components
│   │       └── utils/      # Utility functions
│   └── api/                # Express backend
│       └── src/
│           ├── router/     # tRPC routers
│           └── services/   # Business logic
└── packages/
    └── database/           # Shared Prisma package
```

## Available Scripts

- `pnpm dev`: Start all applications in parallel
- `pnpm build`: Build all applications
- `pnpm lint`: Run linting for all packages
- `pnpm format`: Format code using Prettier

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: tRPC
- **Error Handling**: neverthrow

### Backend
- **Framework**: Express
- **Language**: TypeScript
- **API Layer**: tRPC
- **Error Handling**: neverthrow
- **Validation**: Zod

### Database
- **ORM**: Prisma
- **Database**: PostgreSQL

### Development
- **Build System**: Turborepo
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Monorepo**: Workspace

## Architecture

The application follows a clean architecture pattern:

1. **Frontend Layer** (`apps/web`)
   - Pages and components
   - tRPC client for type-safe API calls
   - Optimistic updates for better UX
   - Error handling with neverthrow

2. **Backend Layer** (`apps/api`)
   - tRPC router for API endpoints
   - Service layer for business logic
   - Error handling with Result types
   - Input validation with Zod

3. **Database Layer** (`packages/database`)
   - Prisma schema and migrations
   - Shared types and validations
   - Database access patterns

## Error Handling

The application uses `neverthrow` for robust error handling:

- Backend services return `Result` types
- tRPC router transforms errors into proper HTTP responses
- Frontend handles errors gracefully with error states
- Type-safe error handling across the stack

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request