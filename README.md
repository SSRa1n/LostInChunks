# LostInChunks

LostInChunks is a React + TypeScript web app for exploring Minecraft-inspired pathfinding.
It generates a maze-like course with obstacles and renders the grid visually so you can
experiment with routes from a start point to a destination.

The project is built with Vite and keeps the implementation lightweight so it is easy to
iterate on maze generation, obstacle placement, and pathfinding logic.

## Features

- Generates a randomized maze grid with obstacles.
- Renders the maze in the browser using React components.
- Uses a Minecraft-inspired visual style with block textures.
- Built with React, TypeScript, and Vite for fast local development.

## Tech Stack

- React
- TypeScript
- Vite

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - type-check the app and create a production build
- `npm run lint` - run ESLint across the project
- `npm run preview` - preview the production build locally

## Project Structure

- `src/App.tsx` - main app component
- `src/lib/generate_maze.tsx` - maze generation logic
- `src/lib/render_maze.tsx` - maze rendering component
- `src/main.tsx` - application entry point
- `src/index.css` - global styles

## Notes

The current implementation focuses on maze generation and rendering. If you extend the
project further, a natural next step is adding explicit start/end points, path cost scoring,
and a shortest-path or least-cost route visualizer.

