# Gym Scoreboard UI

A beautiful, interactive scoreboard for tracking gym attendance between two people.

## Features

- ✅ **Interactive Score Cards** - Increment/decrement scores with smooth animations
- ✅ **Auto-Save** - Scores automatically persist in browser localStorage
- ✅ **CSV Export/Import** - Save and load scores as CSV files
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Modern UI** - Glassmorphism design with gradient backgrounds

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Pure CSS** - Custom styling (no CSS frameworks)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Track Scores**: Use the up/down arrows to track attendance
2. **Auto-Save**: Scores automatically save to browser storage
3. **Export Data**: Click "Save to CSV" to download your progress
4. **Import Data**: Click "Load from CSV" to restore previous scores

## File Structure

```
scoreboard-ui/
├── src/
│   ├── App.jsx          # Main scoreboard component
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── public/
│   └── vite.svg         # Vite logo
├── package.json         # Dependencies
└── README.md           # This file
```
