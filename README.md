# Personal Expense Manager

A full-stack expense tracking application built with Next.js, Express.js, and TypeScript that helps users manage their personal finances efficiently.

## Live Demo

Frontend: [https://personalexpencemanager-frontend.vercel.app](https://personalexpencemanager-frontend.vercel.app)

## Features

- 🔐 Secure user authentication and authorization
- 📊 Intuitive expense tracking interface
- 📈 Visual expense analytics with charts
- 🔍 Filter and search expenses
- 📱 Responsive design for all devices
- ⚡ Real-time updates

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextUI](https://nextui.org/) - UI components
- [Recharts](https://recharts.org/) - Data visualization

### Backend
- [Express.js](https://expressjs.com/) - Node.js framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [JWT](https://jwt.io/) - Authentication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/rakib-utsho/FullStack_Expence-Manager

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
touch .env.local

# Add environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add environment variables
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
PORT=5000

# Start development server
npm run dev
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── types/
│   │   └── app/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    │   ├── app/
    │   ├── config/
    │   └── modules/
    ├── prisma/
    └── package.json
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
