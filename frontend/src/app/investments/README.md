# Investment Page - Mutual Funds Explorer

## Overview

The Investment page provides a comprehensive interface for exploring mutual funds available in India using the **India Mutual Fund API** (https://api.mfapi.in/mf).

## Features

### 🔍 **Search & Filter**
- Real-time search functionality to find mutual funds by name
- Instant filtering of results as you type
- Search across thousands of mutual fund schemes

### 📊 **Fund Information Display**
- **Scheme Name**: Full name of the mutual fund
- **Scheme Code**: Unique identifier for each fund
- **Fund Type Classification**: Automatically categorized as:
  - **Equity** (Green) - Growth-focused funds
  - **Debt** (Blue) - Fixed income funds
  - **Hybrid** (Orange) - Balanced funds
  - **Index** (Primary) - Index tracking funds
  - **ELSS** (Purple) - Tax saving funds
  - **Liquid** (Gray) - Short-term funds
- **ISIN Codes**: Both Growth and Dividend reinvestment ISINs when available

### 📄 **Pagination**
- **20 funds per page** for optimal loading performance
- Pagination controls with First/Last page buttons
- Page navigation while maintaining search state
- Dynamic page count based on filtered results

### 🎨 **User Experience**
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Hover Effects**: Cards lift on hover for better interactivity
- **Loading States**: Spinner while fetching data
- **Error Handling**: Retry mechanism for failed API calls
- **Empty States**: Clear messaging when no results found

## API Integration

### **Data Source**
- **API**: India Mutual Fund API (https://api.mfapi.in/mf)
- **Method**: GET request to fetch all mutual fund schemes
- **Response**: Array of mutual fund objects with scheme details

### **Fund Details**
Clicking "View Details" opens the individual fund's API endpoint:
```
https://api.mfapi.in/mf/{schemeCode}
```

## Technical Implementation

### **State Management**
- `mutualFunds`: Complete dataset from API
- `filteredFunds`: Search-filtered results
- `currentPage`: Active page number
- `searchTerm`: Current search query
- `loading`: API request state
- `error`: Error handling state

### **Performance Optimizations**
- **Client-side pagination**: Reduces API calls
- **Debounced search**: Efficient filtering
- **Responsive grid**: CSS Grid for optimal layouts
- **Lazy loading**: Cards rendered only when needed

### **TypeScript Interface**
```typescript
interface MutualFund {
  schemeCode: number;
  schemeName: string;
  isinGrowth: string | null;
  isinDivReinvestment: string | null;
}
```

## Navigation

- **From Homepage**: Click the "Investments" card
- **Back to Homepage**: "Back to Home" button in app bar
- **Fund Details**: "View Details" button opens fund-specific API data

## Future Enhancements

- **Advanced Filters**: By fund house, category, performance
- **Sorting Options**: By name, returns, AUM
- **Favorites**: Save preferred funds
- **Comparison**: Side-by-side fund comparison
- **Charts**: Performance visualization
- **Recommendations**: AI-powered fund suggestions

## File Structure

```
src/app/investments/
├── page.tsx          # Main investment page component
└── README.md         # This documentation
```
