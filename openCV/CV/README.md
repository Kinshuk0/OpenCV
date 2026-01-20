# Hand Tracker - Real-Time Hand Landmark Detection

A React + TypeScript application for real-time hand tracking using MediaPipe's Hand Landmarker with wave superposition visualizations.

## Features

- **Real-time Hand Detection**: Detects up to 2 hands simultaneously using MediaPipe
- **21 Hand Landmarks**: Tracks all 21 MediaPipe hand landmarks per hand
- **Wave Visualization**: Generates animated waves from index finger positions
- **Wave Superposition**: Visualizes interference patterns when both hands are detected
- **Handedness Detection**: Distinguishes between left (green) and right (magenta) hands
- **Global State Management**: Zustand store for accessing hand coordinates across components

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite 7 | Build Tool |
| MediaPipe Tasks Vision | Hand Landmark Detection |
| Zustand | State Management |
| Tailwind CSS | Styling |

## Project Structure

```
CV/
├── src/
│   ├── components/
│   │   ├── HandLandmarker.tsx   # Camera + MediaPipe detection
│   │   ├── HandMapper.tsx       # Wave visualization per hand
│   │   ├── WaveSuperposition.tsx # Combined wave interference
│   │   ├── HandDisplay.tsx      # Debug display (optional)
│   │   └── Camera.tsx           # Base camera component
│   ├── store/
│   │   └── handStore.ts         # Zustand global state
│   ├── App.tsx                  # Main application
│   └── main.tsx                 # Entry point
├── package.json
└── vite.config.ts
```

## Installation

```bash
cd CV
bun install
# or
npm install
```

## Usage

```bash
bun dev
# or
npm run dev
```

Open `http://localhost:5173` in your browser.

### Controls

1. Click **"Start Hand Detection"** to enable camera and hand tracking
2. Position your hands in front of the camera
3. Observe:
   - Left panel: Live camera feed with landmark overlay
   - Right panel: Wave visualizations based on index finger positions
4. Click **"Stop Detection"** to end the session

## Hand Landmarks Reference

MediaPipe detects 21 landmarks per hand:

| Index | Landmark |
|-------|----------|
| 0 | Wrist |
| 1-4 | Thumb (CMC, MCP, IP, TIP) |
| 5-8 | Index Finger |
| 9-12 | Middle Finger |
| 13-16 | Ring Finger |
| 17-20 | Pinky |

## Store API

Access hand data from any component:

```typescript
import { useHandStore, handUtils } from './store/handStore'

// Hook usage
const { leftHand, rightHand, isDetecting } = useHandStore()

// Utility functions
const fingerTips = handUtils.getFingerTips('Left')
const handPosition = handUtils.getHandPosition('Right')
```

## Configuration

Modify detection parameters in `HandLandmarker.tsx`:

```typescript
const landmarker = await HandLandmarker.createFromOptions(vision, {
  numHands: 2,
  minHandDetectionConfidence: 0.5,
  minHandPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5
})
```

## Requirements

- Modern browser with WebGL support
- Camera access permission
- macOS / Windows / Linux

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun lint` | Run ESLint |

## License

MIT
