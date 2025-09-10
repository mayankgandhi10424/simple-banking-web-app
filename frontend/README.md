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

### 🏠 Homepage
- Modern Material-UI design system with custom theming
- Responsive banking service cards with hover effects
- Navigation header with dynamic content based on current page
- Mobile-first responsive design

### 📈 Investment Management
- **Mutual Fund Explorer**: Browse and search 5000+ Indian mutual funds
- **Interactive Charts**:
  - Real-time NAV performance visualization using Chart.js
  - Clean, minimalist chart design with no grid lines or axis labels
  - Hover tooltips showing date and NAV values
  - White background for better readability
- **Advanced Filtering**:
  - Real-time search by fund name
  - Time span filtering (1M, 3M, 6M, 1Y, 3Y, 5Y, All Time)
  - Proper date handling for DD-MM-YYYY API format
- **Performance Analytics**:
  - Current NAV tracking
  - Absolute change calculations (₹ and %)
  - Annualized returns using CAGR formula
  - Responsive side-by-side layout (chart + metrics)
- **Pagination**: Efficient handling of large datasets (20 items per page)

### 🎨 UI/UX Features
- **Responsive Design**: Stack-based layouts adapting to screen sizes
- **Loading States**: Smooth loading indicators during data fetch
- **Error Handling**: User-friendly error messages and retry options
- **Typography**: Consistent Material-UI typography system
- **Color Coding**: Fund type categorization with colored chips
- **Navigation**: Breadcrumb navigation and back buttons

### ⚡ Technical Features
- **TypeScript**: Full type safety with interfaces for API responses
- **SSR/Hydration**: Proper server-side rendering with hydration fixes
- **API Integration**: RESTful integration with India Mutual Fund API
- **Performance**: Optimized rendering with data filtering and memoization
- **Date Parsing**: Robust date handling for various formats
- **State Management**: React hooks for efficient state handling

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css                 # Global styles and theming
│   │   ├── layout.tsx                  # Root layout with MUI theme provider
│   │   ├── page.tsx                    # Banking homepage with service cards
│   │   └── investments/
│   │       ├── page.tsx                # Mutual funds listing with pagination
│   │       └── [id]/
│   │           └── page.tsx            # Individual fund details with charts
│   ├── components/
│   │   └── Header.tsx                  # Dynamic navigation header
│   ├── lib/
│   │   └── dateUtils.ts               # Date parsing utilities
│   └── utils/                         # Utility functions
└── package.json                       # Dependencies and scripts
```

## Tech Stack

### Core Framework
- **Next.js 15.5.2**: Latest React framework with App Router and Turbopack
- **React 19.1.0**: Cutting-edge React with concurrent features

### UI & Design
- **Material-UI 7.3.2**: Complete component library with modern theming
- **MUI Icons**: Comprehensive icon set for banking and financial UI
- **Responsive Design**: Mobile-first approach with Stack layouts

### Data Visualization
- **Chart.js 4.5**: Advanced charting library
- **react-chartjs-2 5.2**: React wrapper for Chart.js
- **Custom Chart Styling**: Minimalist design with performance focus

### Development Tools
- **TypeScript 5**: Full type safety and modern language features
- **ESLint**: Code quality and consistency rules
- **Turbopack**: Fast development build tool (Next.js 15)

### External APIs
- **India Mutual Fund API**: Real-time mutual fund data from api.mfapi.in
- **RESTful Integration**: Efficient data fetching and caching

### Performance & Optimization
- **Server-Side Rendering**: SEO-friendly with proper hydration
- **Data Pagination**: Efficient handling of large datasets
- **State Management**: Optimized React hooks pattern

## Customization

The MUI theme is configured in `src/app/layout.tsx`. You can customize:
- Color palette
- Typography
- Component overrides
- Spacing and breakpoints
