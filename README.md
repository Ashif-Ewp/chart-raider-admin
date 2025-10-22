# Action Bar Admin Panel

A complete full-stack admin panel for managing action bar bonus systems. Built with Express.js, MongoDB, React, and Tailwind CSS.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![Tech Stack](https://img.shields.io/badge/Express-4-green)
![Tech Stack](https://img.shields.io/badge/MongoDB-7-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tailwind-3-cyan)

## 📋 Overview

This application provides a comprehensive admin interface for managing action bar bonuses across 10 different categories including Prize Bags, Stop Loss, Double Edged Trades, Health Pumps, and more.

## ✨ Features

### Backend (Express + MongoDB)
- RESTful API with full CRUD operations
- MongoDB database with Mongoose ODM
- Category-based organization
- Bonus activation/deactivation
- Database seeding script
- Health check endpoint
- Error handling and validation

### Frontend (React + Tailwind)
- Modern, responsive dashboard
- Real-time bonus management
- Advanced filtering and search
- Beautiful UI with Tailwind CSS
- Toast notifications
- Category-based navigation
- Form validation

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- MongoDB (local or remote)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd /home/lean-fe/chart_raider/admin
```

2. **Set up Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection
npm run seed  # Seed the database
npm run dev   # Start backend server
```

Backend runs on `http://localhost:5000`

3. **Set up Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm start     # Start React app
```

Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
admin/
├── backend/
│   ├── config/              # Database configuration
│   ├── constants/           # Action bar constants
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── scripts/             # Utility scripts (seed)
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── constants/       # Constants
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🎯 Action Bar Categories

The system manages bonuses across 10 categories:

| Category | Icon | Description |
|----------|------|-------------|
| Prize Bag | 🎁 | Random reward bonuses |
| Stop Loss | 🛡️ | Loss protection mechanisms |
| Double Edged Trades | ⚔️ | High risk/reward trades |
| Health Pumps | ❤️ | Health restoration bonuses |
| TradeliXer | 🧪 | Trade enhancement items |
| Trade Recovery | ♻️ | Loss recovery systems |
| Action Bar | ⚡ | Action bar modifications |
| XP Stack | ⭐ | Experience point bonuses |
| Peek Meter | 👁️ | Visibility enhancements |
| Trade Delay | ⏱️ | Timing-based bonuses |

## 🔌 API Endpoints

### Categories
- `GET /api/actionbar/categories` - Get all categories with counts

### Bonuses
- `GET /api/actionbar/bonuses` - Get all bonuses (filterable)
- `GET /api/actionbar/bonuses/grouped` - Get bonuses by category
- `GET /api/actionbar/bonuses/:id` - Get single bonus
- `POST /api/actionbar/bonuses` - Create new bonus
- `PUT /api/actionbar/bonuses/:id` - Update bonus
- `DELETE /api/actionbar/bonuses/:id` - Delete bonus
- `PATCH /api/actionbar/bonuses/:id/toggle` - Toggle active status

### Health
- `GET /health` - API health check

## 📊 Database Schema

```javascript
ActionBarBonus {
  name: String          // Display name (e.g., "PB 1")
  key: String           // Unique key (e.g., "PB_1")
  category: String      // Category enum
  description: String   // Detailed description
  value: Mixed          // Bonus value (flexible type)
  count: Number         // Usage count
  isActive: Boolean     // Active status
  rarity: String        // common|rare|epic|legendary
  metadata: Object      // Additional data
  createdAt: Date       // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start    # Hot reload enabled
```

### Database Seeding
```bash
cd backend
npm run seed
```

This populates the database with all predefined action bar bonuses.

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The optimized build will be in `frontend/build/`

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/actionbar_admin
NODE_ENV=development
```

### Frontend (.env - optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 Usage Examples

### Creating a Bonus
1. Navigate to "Create Bonus" page
2. Fill in bonus details (name, key, category, etc.)
3. Set value, count, and rarity
4. Toggle active status
5. Save bonus

### Filtering Bonuses
- Use search bar to find by name/key/description
- Filter by category dropdown
- Filter by active/inactive status
- Real-time results update

### Managing Bonuses
- Click "Edit" to modify bonus details
- Click "Toggle" to enable/disable
- Click "Delete" to remove (with confirmation)

## 🎨 UI Components

- **Dashboard** - Overview with statistics
- **BonusCard** - Individual bonus display
- **BonusForm** - Create/Edit form
- **Layout** - Main app layout with navigation
- **Filters** - Advanced search and filtering

## 🧪 Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- CORS - Cross-origin support
- dotenv - Environment configuration

### Frontend
- React 18 - UI library
- React Router v6 - Routing
- Tailwind CSS - Styling
- Axios - HTTP client
- React Toastify - Notifications
- Lucide React - Icons

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ for Chart Raider**

