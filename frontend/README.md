# Simple Banking Web App - Frontend

This is the frontend application for the Simple Banking Web App built with Next.js and Material-UI (MUI).

## Tech Stack

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - JavaScript library for building user interfaces
- **Material-UI (MUI) 7.3.2** - React component library for faster development
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code linting

## Features

- Modern Material-UI design system
- Responsive layout with Grid2 components
- Banking-themed homepage with service cards
- TypeScript support for type safety
- ESLint configuration for code quality

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    └── ThemeProvider.tsx
```

## Customization

The MUI theme is configured in `src/components/ThemeProvider.tsx`. You can customize:
- Color palette
- Typography
- Component overrides
- Spacing and breakpoints
