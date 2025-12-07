# 🎮 Ionuț's Pixel CV - Interactive Retro Experience

A modern, interactive CV built with React, featuring retro 80s arcade gaming aesthetics with cutting-edge animations and effects!

## ✨ Features

### 🎯 Gaming Experience
- **Score & Level System**: Earn points by exploring the CV
- **Konami Code Easter Egg**: ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA for rainbow effects and 10,000 points!
- **Achievement System**: Unlock achievements as you interact with the page
- **Interactive Elements**: Clickable ghosts, Pedro the raccoon, and hidden LEGO easter egg

### 🎨 Visual Effects
- **CRT Screen Effect**: Authentic retro monitor feel with RGB separation
- **Scan Lines**: Animated CRT scan lines
- **Particle Background**: Dynamic matrix-style particle network
- **Framer Motion Animations**: Smooth, professional animations throughout
- **Glitch Effects**: Periodic glitch animations on title
- **Retro Arcade Music**: Background 8-bit music with volume control

### 🚀 Modern Tech Stack
- **React 18**: Latest React features with hooks
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Professional animations
- **TypeScript Particles**: Interactive particle effects
- **Lucide React**: Modern icon library

## 🎮 Easter Eggs

1. **Konami Code**: Press ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA for a surprise!
2. **Ghost Hunter**: Click on the floating Pac-Man ghosts (50 points each)
3. **Pedro the Raccoon**: Click Pedro in the bottom right corner (100 points)
4. **LEGO Button**: Click the yellow button on the gamepad (500 points + modal)
5. **Pac-Man Game**: Click the start button on the gamepad to play Google's Pac-Man
6. **CV Explorer**: View all sections to unlock the explorer achievement (+500 bonus)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will automatically open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
mySuperSecretCV/
├── src/
│   ├── components/           # React components
│   │   ├── AchievementPopup.jsx
│   │   ├── CVSection.jsx
│   │   ├── Experience.jsx
│   │   ├── GameStats.jsx
│   │   ├── Header.jsx
│   │   ├── InteractiveElements.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navigation.jsx
│   │   └── ParticleBackground.jsx
│   ├── hooks/                # Custom React hooks
│   │   └── useGameSystem.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index-react.html          # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # This file
```

## 🎨 Customization

### Colors
The main color scheme uses:
- Matrix Green: `#0f0` / `rgb(0, 255, 0)`
- Gold: `#FFD700`
- Black: `#000`

You can customize these in `tailwind.config.js`.

### Animations
All animations are configured in:
- `tailwind.config.js` for Tailwind animations
- `src/index.css` for custom CSS animations
- Components use Framer Motion for React-based animations

### Content
Update your experience, skills, and achievements in `src/App.jsx` and `src/components/Experience.jsx`.

## 🎯 Scoring System

- Navigation clicks: 10 points
- Section views: 25 points each
- Ghost clicks: 50 points each
- Pedro clicks: 100 points
- LEGO button: 500 points
- Gamepad clicks: 50 points
- Konami Code: 3,000 points (Level 4!)
- Complete exploration: 500 bonus points

Level up every 1,000 points!

## 📱 Responsive Design

Fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3001
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clean build and try again
rm -rf dist
npm run build
```

## 📄 License

Personal CV - All rights reserved © 2025 Ionuț Pietrar

## 🎮 Have Fun!

This CV is designed to be an interactive experience. Explore, click around, and try to find all the easter eggs!

**Hint**: The Konami code is hidden in the Achievements section... 👀
