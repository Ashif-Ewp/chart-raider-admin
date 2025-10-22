# Quick Setup Guide

Follow these steps to get your Action Bar Admin Panel up and running.

## Prerequisites Check

Make sure you have:
- ✅ Node.js (v14+) installed: `node --version`
- ✅ MongoDB installed and running: `mongod --version`
- ✅ npm installed: `npm --version`

## Step-by-Step Setup

### 1. Start MongoDB

Make sure MongoDB is running:
```bash
# If using systemd (Linux)
sudo systemctl start mongod

# Or start manually
mongod
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd /home/lean-fe/chart_raider/admin/backend

# Install dependencies
npm install

# The .env file is already created with default settings
# If you need to change MongoDB URI, edit backend/.env

# Seed the database with initial data
npm run seed

# Start the backend server
npm run dev
```

You should see:
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

### 3. Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd /home/lean-fe/chart_raider/admin/frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Verify Installation

1. **Backend Health Check**
   - Visit: `http://localhost:5000/health`
   - Should return: `{ "status": "OK", "message": "Action Bar Admin API is running" }`

2. **Frontend Dashboard**
   - Visit: `http://localhost:3000`
   - You should see the dashboard with statistics

3. **Database Verification**
   - The seed script should have created 60+ bonuses
   - Check the dashboard or visit `http://localhost:3000/bonuses`

## Default Configuration

### Backend (Port 5000)
- API: `http://localhost:5000/api`
- MongoDB: `mongodb://localhost:27017/actionbar_admin`
- Environment: Development

### Frontend (Port 3000)
- App: `http://localhost:3000`
- API Proxy: Points to `http://localhost:5000`

## Common Issues

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
sudo systemctl status mongod

# Or check if mongod process is running
ps aux | grep mongod
```

### Port Already in Use
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Production Build

### Backend
```bash
cd backend
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static server
npx serve -s build
```

## Next Steps

1. Access the dashboard at `http://localhost:3000`
2. Explore the 10 action bar categories
3. Create, edit, or delete bonuses
4. Filter and search through bonuses
5. Customize the system to your needs

## Support

If you encounter any issues:
1. Check both terminal windows for errors
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check the README.md files for detailed documentation

Happy coding! 🚀

