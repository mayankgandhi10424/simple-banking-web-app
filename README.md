# Simple Banking Web App

This is a simple Banking Project, which will demonstrate how to do R&D effectively when you have no idea about the task you are doing.

This is my first time working on a Banking application. Will document all the process I went through including web search, AI Tools and Copilot.

## 🏦 Project Overview

What started as a learning exercise has evolved into a comprehensive banking web application with investment tracking capabilities, including mutual fund analysis with interactive charts and performance metrics. This project showcases the complete journey from initial R&D to a fully functional financial application.

## ✨ Features

### 🏠 Banking Homepage
- Modern Material-UI design system
- Responsive banking service cards
- Interactive navigation and user-friendly interface
- Mobile-first responsive design

### 📈 Investment Management
- **Mutual Funds Explorer**: Browse 5000+ mutual funds from Indian market
- **Interactive Charts**: Real-time NAV performance visualization using Chart.js
- **Advanced Filtering**: Search and filter funds by name, type, and category
- **Time Period Analysis**: Multiple time spans (1M, 3M, 6M, 1Y, 3Y, 5Y, All Time)
- **Performance Metrics**:
  - Current NAV tracking
  - Absolute and percentage change calculations
  - Annualized returns using CAGR formula
  - Time period analysis

### 🔧 Technical Features
- **Server-Side Rendering (SSR)** with Next.js App Router
- **Type Safety** with TypeScript throughout
- **API Integration** with India Mutual Fund API
- **Date Handling** for DD-MM-YYYY format parsing
- **Responsive Design** with Material-UI Stack components
- **Error Handling** and loading states
- **Performance Optimization** with data filtering and pagination

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router and Turbopack
- **React 19.1.0** - Modern React with latest features
- **Material-UI (MUI) 7.3.2** - Component library and design system
- **Chart.js & react-chartjs-2** - Interactive data visualization
- **TypeScript** - Type-safe development
- **ESLint** - Code quality and formatting

### APIs & Data
- **India Mutual Fund API** - Real-time mutual fund data
- **RESTful API Integration** - Efficient data fetching
- **Client-side State Management** - React hooks and context

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mayankgandhi10424/simple-banking-web-app.git
   cd simple-banking-web-app
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
simple-banking-web-app/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── investments/  # Investment pages
│   │   │   │   └── [id]/     # Dynamic mutual fund details
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx    # Root layout with shared components
│   │   │   └── page.tsx      # Homepage
│   │   └── components/
│   │       ├── Header.tsx    # Shared navigation header
│   │       └── ThemeProvider.tsx # MUI theme configuration
│   ├── package.json
│   └── README.md            # Frontend-specific documentation
└── README.md               # This file
```

## 🎯 R&D Process Documentation

This project serves as a comprehensive case study of effective R&D processes when approaching unfamiliar domains:

### 💡 Research & Discovery Journey
- **Domain Research**: Starting with zero banking application knowledge
- **Technology Evaluation**: Comparing frameworks and choosing Next.js + Material-UI
- **API Discovery**: Finding and integrating the India Mutual Fund API
- **Problem-Solving**: Real-time documentation of challenges and solutions
- **AI Tool Integration**: Effective use of GitHub Copilot and AI assistants

### 🛠️ Development Process Insights
- **Iterative Development**: Building from basic setup to complex features
- **Documentation-Driven**: Maintaining detailed README files throughout
- **Error Resolution**: Documenting hydration issues, date parsing challenges
- **Feature Evolution**: From simple listing to interactive charts and analytics

## 🎯 Key Learning Outcomes

This project demonstrates:

### 💡 R&D and Development Process
- **Effective use of AI tools** for rapid development and learning
- **GitHub Copilot integration** for code completion and architectural guidance
- **Problem-solving approaches** when working with unfamiliar financial technologies
- **Documentation-driven development** for better maintainability and knowledge transfer

### 🏗️ Modern Web Development Practices
- **Component-driven architecture** with React and Material-UI
- **Type-safe development** with TypeScript interfaces
- **API integration patterns** with error handling and loading states
- **Performance optimization techniques** for large datasets
- **Responsive design principles** for multi-device compatibility

### 📊 Financial Application Development
- **Real-time data visualization** with interactive charts
- **Complex calculations** for financial metrics (CAGR, annualized returns)
- **Date handling** for various date formats
- **Data filtering and search** for large financial datasets

## 🔗 Documentation Links

- **[Frontend Documentation](./frontend/README.md)** - Detailed frontend setup and architecture
- **[API Documentation](https://api.mfapi.in/)** - India Mutual Fund API reference

## 🤝 Contributing

This project serves as a learning resource. Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

This repository documents the complete development journey, including:
- Research methodology for banking application requirements
- Technology selection and evaluation process
- Implementation challenges and solutions
- AI tool utilization strategies
- Code quality and best practices

## 📄 License

This project is created for educational and learning purposes.

## 👨‍💻 Author

**Mayank Gandhi** - [GitHub](https://github.com/mayankgandhi10424)

---

*This project demonstrates effective R&D processes and modern web development practices for financial applications.*
