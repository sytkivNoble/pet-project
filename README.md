# Pet Project

A modern full-stack application built with Next.js, Express, Prisma, and TypeScript in a Turborepo monorepo.

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
- Update the `DATABASE_URL` in `.env` with your database credentials
- Run database migrations:
```bash
cd packages/database
pnpm db:generate
pnpm db:push
```

3. Start the development servers:
```bash
# Start all applications
pnpm dev

# Or start them individually:
# Web app (Next.js)
cd apps/web
pnpm dev

# API (Express)
cd apps/api
pnpm dev
```

## Project Structure

- `apps/web`: Next.js frontend application
- `apps/api`: Express backend API
- `packages/database`: Shared Prisma database package

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm lint`: Run linting for all packages
- `pnpm format`: Format code using Prettier

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Express, TypeScript
- **Database**: Prisma, PostgreSQL
- **Build System**: Turborepo
- **Package Manager**: pnpm 