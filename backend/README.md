# Action Bar Admin - Backend

Backend API for the Action Bar Admin Panel built with Express.js and MongoDB.

## Features

- RESTful API for managing action bar bonuses
- MongoDB database with Mongoose ODM
- Category-based bonus organization
- CRUD operations for bonuses
- Bonus activation/deactivation
- Grouped and filtered queries
- Database seeding script

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/actionbar_admin
NODE_ENV=development
```

3. Seed the database:
```bash
npm run seed
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Categories

- `GET /api/actionbar/categories` - Get all categories with bonus counts

### Bonuses

- `GET /api/actionbar/bonuses` - Get all bonuses (with optional filters)
- `GET /api/actionbar/bonuses/grouped` - Get bonuses grouped by category
- `GET /api/actionbar/bonuses/:id` - Get a single bonus by ID
- `POST /api/actionbar/bonuses` - Create a new bonus
- `PUT /api/actionbar/bonuses/:id` - Update a bonus
- `DELETE /api/actionbar/bonuses/:id` - Delete a bonus
- `PATCH /api/actionbar/bonuses/:id/toggle` - Toggle bonus active status

### Query Parameters

**GET /api/actionbar/bonuses**
- `category` - Filter by category (e.g., PRIZE_BAG, STOP_LOSS)
- `isActive` - Filter by active status (true/false)

### Health Check

- `GET /health` - API health check endpoint

## Database Schema

### ActionBarBonus Model

```javascript
{
  name: String,          // Display name
  key: String,           // Unique identifier
  category: String,      // Category (enum)
  description: String,   // Bonus description
  value: Mixed,          // Bonus value (number/string)
  count: Number,         // Count/quantity
  isActive: Boolean,     // Active status
  rarity: String,        // Rarity level
  metadata: Object,      // Additional data
  timestamps: true       // createdAt, updatedAt
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── constants/
│   └── actionbar.js       # Action bar constants
├── controllers/
│   └── actionBarController.js  # Request handlers
├── models/
│   └── ActionBarBonus.js  # Mongoose model
├── routes/
│   └── actionBarRoutes.js # API routes
├── scripts/
│   └── seed.js            # Database seeding
├── .env                   # Environment variables
├── .env.example           # Environment template
├── package.json           # Dependencies
└── server.js              # Entry point
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed the database with initial data

## Error Handling

The API returns consistent error responses:

```javascript
{
  success: false,
  message: "Error message",
  error: "Detailed error (development only)"
}
```

## CORS Configuration

CORS is enabled for all origins by default. Modify in `server.js` for production use.

## License

MIT

