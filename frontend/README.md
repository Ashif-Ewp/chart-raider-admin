# Action Bar Admin - Frontend

Modern admin panel for managing action bar bonuses built with React and Tailwind CSS.

## Features

- 📊 Dashboard with statistics and overview
- 🎁 Complete CRUD operations for bonuses
- 🔍 Advanced filtering and search
- 📱 Responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🔔 Toast notifications
- ⚡ Fast and optimized

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment (optional):

Create a `.env` file if you need to change the API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features Overview

### Dashboard
- View total bonuses, active bonuses, and categories
- Quick navigation to categories
- Statistics cards
- Quick action buttons

### Bonuses Management
- View all bonuses in a grid layout
- Filter by category, status, and search
- Create new bonuses with detailed form
- Edit existing bonuses
- Delete bonuses with confirmation
- Toggle bonus active/inactive status

### Bonus Properties
- **Name** - Display name
- **Key** - Unique identifier
- **Category** - Bonus category (10 types)
- **Description** - Detailed description
- **Value** - Bonus value (flexible type)
- **Count** - Number of uses
- **Rarity** - Common, Rare, Epic, Legendary
- **Status** - Active/Inactive

## Categories

The system supports 10 action bar categories:

1. 🎁 **Prize Bag** - Random rewards
2. 🛡️ **Stop Loss** - Loss protection
3. ⚔️ **Double Edged Trades** - High risk/reward trades
4. ❤️ **Health Pumps** - Health restoration
5. 🧪 **TradeliXer** - Trade enhancers
6. ♻️ **Trade Recovery** - Loss recovery
7. ⚡ **Action Bar** - Action bar bonuses
8. ⭐ **XP Stack** - Experience points
9. 👁️ **Peek Meter** - Visibility bonuses
10. ⏱️ **Trade Delay** - Timing bonuses

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.jsx       # Main layout
│   │   ├── BonusCard.jsx    # Bonus display card
│   │   └── BonusForm.jsx    # Create/Edit form
│   ├── pages/
│   │   ├── Dashboard.jsx    # Dashboard page
│   │   ├── BonusesPage.jsx  # All bonuses
│   │   ├── CreateBonus.jsx  # Create bonus
│   │   └── EditBonus.jsx    # Edit bonus
│   ├── services/
│   │   └── api.js           # API service
│   ├── constants/
│   │   └── actionbar.js     # Constants
│   ├── App.js               # Root component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── tailwind.config.js
├── package.json
└── README.md
```

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the primary color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### API Configuration

The app uses a proxy in development. For production, set the API URL in `.env`:

```
REACT_APP_API_URL=https://your-api-domain.com/api
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

