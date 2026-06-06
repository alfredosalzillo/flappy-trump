# AGENTS.md

Welcome to the **Flappy Trump** project. This is a Flappy Bird-inspired game where Trump must escape from the pride month woke rainbow witch. This project is a submission for the [June Solstice Game Jam](https://dev.to/devteam/join-the-june-solstice-game-jam-1000-in-prizes-3jla).

## Setup commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Lint and format: `npx biome check --apply .`

## Project Context

- **Theme:** Trump vs. Rainbow Witch (Flappy Bird style). Trump tries to make the world gray and defeat diversity, while the Pride Witch uses Diversity Spires to stop him.
- **Stack:** React, TypeScript, Vite, Biome.
- **Assets:** Game assets are located in `src/assets/`.

## Code style

- **Patterns:** Follow existing patterns in `src/App.tsx` and `src/main.tsx`.
- **Formatting:** Strictly use **Biome**. Do NOT add ESLint or Prettier configurations.
- **State Management:** Use React hooks for game state (score, positions, collisions).
- **TypeScript:** Ensure components are modular, follow TypeScript best practices, and prefer **types** over interfaces.
- **CSS Modules:** Use CSS Modules for all component-specific styles (`*.module.css`). Import them as `classes` (e.g., `import classes from './Component.module.css'`). Use `clsx` library for conditional classes or combining multiple classes.
- **Exports:** Each component directory should have an `index.ts` that re-exports the default component as default.

## Game Elements

- **Trump:** The protagonist. A sad bird on a mission to drain the world of color. Logic in `src/components/Trump/`.
- **Pride Witch:** The antagonist. Guardian of diversity. Logic in `src/components/Witch/`.
- **Obstacles:** "Diversity Spires" cast by the witch. Each color has a unique power representing aspects of diversity. They turn black and deflagrate when passed.

## Game Physics

- Calibrate gravity and jump mechanics for a classic "Flappy Bird" feel.

## Boundaries

- **Always do:**
  - Keep game logic primarily within the `src/` directory.
  - Use Biome for all linting/formatting tasks.
  - Verify changes by running the development server.
- **Never do:**
  - Do not introduce new linting or formatting tools (ESLint, Prettier).
  - Do not modify assets in `src/assets/` unless explicitly requested.
