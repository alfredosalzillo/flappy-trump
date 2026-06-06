*This is a submission for the [June Solstice Game Jam](https://dev.to/challenges/june-game-jam-2026-06-03)*

## What I Built
**Flappy Trump: Color Drain** is a Flappy Bird-inspired game where the protagonist, Trump, is on a mission to drain the world of its color and vibrancy. Standing in his way is the **Pride Witch**, a guardian of diversity who casts **Diversity Spires**—magical rainbow pillars—to block his path. 

The game relates to the challenge themes in multiple ways:
- **Pride Month:** The antagonist is the Pride Witch, and the obstacles are "Diversity Spires" based on the colors of the pride flag.
- **Solstice:** The game explores the transition between light (diversity) and darkness (the gray world Trump seeks to create).
- **Ode to Alan Turing:** As a tribute to the father of modern computing and his LGBTQ+ legacy, the game's score is displayed exclusively in **binary**.

## Video Demo
{% embed https://alfredosalzillo.me/flappy-trump/demo.mp4 %}
<!-- Share a video demo of your game in action. Embed here or add as a cover video. We strongly encourage you to include a voiceover describing your game and showing off additional context you'd like the judge to know about. -->

## Demo
You can play the live demo here:
**[🎮 Play Flappy Trump: Color Drain](https://alfredosalzillo.me/flappy-trump/)**

## Code
You can find the full source code for the game here:
{% github alfredosalzillo/flappy-trump %}

## How I Built It
The game was built using a modern React stack with **Vite** and **TypeScript**. 

### Technical Approach:
- **Game Engine:** I implemented a custom game loop using `requestAnimationFrame` and `useReducer` to manage the complex game state. This ensures smooth animations and predictable state transitions.
- **Dynamic Obstacles:** Each "Diversity Spire" color has a unique magical power that affects gameplay:
    - **Red**: Wider pillars.
    - **Orange**: Vibrating pillars.
    - **Yellow**: Moving gaps.
    - **Green**: Expanding/contracting gaps.
    - **Blue**: Slow-motion field.
    - **Indigo**: Pulsing visibility.
    - **Violet**: Gravity flux.
- **Styling:** I used CSS Modules for component-scoped styling and `clsx` for managing conditional classes.
- **Optimization:** **Biome** was used for lightning-fast linting and formatting, keeping the codebase clean and consistent.

## Prize Category
I am submitting this project for the **Best Ode to Alan Turing** category. 
- The score is displayed in **binary** as a direct reference to Turing's foundational work in computer science.
- The game's theme of protecting diversity vs. a "gray world" echoes the historical struggle for acceptance that Turing himself faced as a gay man in a rigid society.

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Thanks for participating! -->