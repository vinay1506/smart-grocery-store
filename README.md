# Smart Grocery Store 🛒

A modern, full-stack grocery shopping application built with React, TypeScript, and Node.js.

## 🌟 Features

- 🛍️ Modern and responsive UI with Tailwind CSS
- 🔍 Product search and filtering
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly design
- 🔐 User authentication
- 📊 Product management
- 💳 Secure checkout process

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Context API for state management

### Backend
- Node.js
- Express.js
- MYsql
- JWT Authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Mysql

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vinay1506/smart-grocery-store.git
cd smart-grocery-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📁 Project Structure

```
smart-grocery-store/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── context/          # Context providers
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── backend/              # Backend source code
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── middleware/      # Custom middleware
├── public/              # Static assets
└── tests/              # Test files
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Build for Production

Build the frontend:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Vinay - [GitHub](https://github.com/vinay1506)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
  
