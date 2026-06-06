import { useEffect, useReducer, useRef } from 'react'

// Game Constants
export const GRAVITY = 0.5
export const JUMP_STRENGTH = -8
export const PIPE_SPEED = 3
export const PIPE_WIDTH = 60
export const PIPE_GAP = 200
export const TRUMP_SIZE = 40
export const TRUMP_X = 100
export const GAME_HEIGHT = 500
export const GAME_WIDTH = 800
export const SPAWN_INTERVAL_MIN = 1300
export const SPAWN_INTERVAL_MAX = 2600
export enum RainbowColor {
  RED = '#ff0000',
  ORANGE = '#ff8c00',
  YELLOW = '#ffff00',
  GREEN = '#008000',
  BLUE = '#0000ff',
  INDIGO = '#4b0082',
  VIOLET = '#ee82ee',
}

export const RAINBOW_COLORS = [
  RainbowColor.RED,
  RainbowColor.ORANGE,
  RainbowColor.YELLOW,
  RainbowColor.GREEN,
  RainbowColor.BLUE,
  RainbowColor.INDIGO,
  RainbowColor.VIOLET,
]

export type Pipe = {
  id: number
  x: number
  topHeight: number
  passed: boolean
  isDeflagrating: boolean
  type: 'both' | 'top' | 'bottom'
  color: RainbowColor
  width: number
  horizontalOffset?: number
  opacity?: number
  gap: number
  powerType: string
}

type GameState = {
  gameStarted: boolean
  gameOver: boolean
  score: number
  trumpY: number
  velocity: number
  pipes: Pipe[]
  isWitchWaving: boolean
  witchHatColor: RainbowColor
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'JUMP' }
  | { type: 'UPDATE'; payload: { now: number; spawnDelay: number } }
  | { type: 'GAME_OVER' }
  | { type: 'SPAWN_PIPE'; payload: { pipe: Pipe; hatColor: RainbowColor } }

const initialState: GameState = {
  gameStarted: false,
  gameOver: false,
  score: 0,
  trumpY: 250,
  velocity: 0,
  pipes: [],
  isWitchWaving: false,
  witchHatColor: RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameStarted: true,
      }
    case 'JUMP':
      if (!state.gameStarted) {
        return { ...initialState, gameStarted: true }
      }
      if (state.gameOver) return state
      return {
        ...state,
        velocity: JUMP_STRENGTH,
      }
    case 'GAME_OVER':
      return {
        ...state,
        gameOver: true,
      }
    case 'UPDATE': {
      if (!state.gameStarted || state.gameOver) return state

      // Update Trump position
      let nextTrumpY = state.trumpY + state.velocity
      let nextGameOver: boolean = state.gameOver
      if (nextTrumpY < 0 || nextTrumpY > GAME_HEIGHT - TRUMP_SIZE) {
        nextGameOver = true
        nextTrumpY = state.trumpY
      }

      // Update Pipes
      let nextScore = state.score
      let currentGravity = GRAVITY
      let currentPipeSpeed = PIPE_SPEED

      // Process proximity power (Blue - Slow Motion)
      const bluePillar = state.pipes.find(
        (p) => p.color === RainbowColor.BLUE && Math.abs(p.x - TRUMP_X) < 150,
      )
      if (bluePillar) {
        currentGravity *= 0.8
        currentPipeSpeed *= 0.8
      }

      const nextPipes = state.pipes
        .map((pipe) => {
          const nextX = pipe.x - currentPipeSpeed
          let nextTopHeight = pipe.topHeight
          let nextGap = pipe.gap
          let nextHorizontalOffset = pipe.horizontalOffset
          let nextOpacity = pipe.opacity

          // Yellow - Moving Gap
          if (pipe.color === RainbowColor.YELLOW) {
            nextTopHeight += Math.sin(Date.now() / 500) * 2
          }
          // Green - Growth Spire (Changing gap)
          if (pipe.color === RainbowColor.GREEN) {
            nextGap = PIPE_GAP + Math.sin(Date.now() / 1000) * 30
          }
          // Orange - Vibrating Spire
          if (pipe.color === RainbowColor.ORANGE) {
            nextHorizontalOffset = Math.sin(Date.now() / 50) * 5
          }
          // Indigo - Invisibility Pulse
          if (pipe.color === RainbowColor.INDIGO) {
            nextOpacity = 0.6 + Math.sin(Date.now() / 300) * 0.4
          }
          // Violet - Gravity Flux
          if (pipe.color === RainbowColor.VIOLET && Math.abs(pipe.x - TRUMP_X) < 40) {
            // We'll handle gravity flux by temporarily modifying velocity if needed,
            // but for now let's just make it a visual pulse or a quick gravity kick.
            // Actually, let's just modify currentGravity for this frame.
            currentGravity *= 1.5
          }

          return {
            ...pipe,
            x: nextX,
            topHeight: nextTopHeight,
            gap: nextGap,
            horizontalOffset: nextHorizontalOffset,
            opacity: nextOpacity,
          }
        })
        .filter((pipe) => pipe.x + pipe.width > 0)

      for (const pipe of nextPipes) {
        const hasTopPipe = pipe.type === 'both' || pipe.type === 'top'
        const hasBottomPipe = pipe.type === 'both' || pipe.type === 'bottom'
        const effectiveX = pipe.x + (pipe.horizontalOffset || 0)

        if (
          TRUMP_X < effectiveX + pipe.width &&
          TRUMP_X + TRUMP_SIZE > effectiveX &&
          ((hasTopPipe && nextTrumpY < pipe.topHeight) ||
            (hasBottomPipe && nextTrumpY + TRUMP_SIZE > pipe.topHeight + pipe.gap))
        ) {
          nextGameOver = true
        }

        if (pipe.isDeflagrating) {
          // After 3 seconds of being passed, we can remove it or just let it be handled by the filter
          // But let's actually handle the "remove" via the filter if x + width < -100 or something
        }

        if (!pipe.passed && effectiveX + pipe.width < TRUMP_X) {
          pipe.passed = true
          pipe.isDeflagrating = true
          nextScore += 1
        }
      }

      const nextVelocity = state.velocity + currentGravity

      // Witch waving logic
      let nextWitchWaving = state.isWitchWaving
      if (nextWitchWaving) {
        nextWitchWaving = Math.random() > 0.015
      }

      return {
        ...state,
        trumpY: nextTrumpY,
        velocity: nextVelocity,
        gameOver: nextGameOver,
        pipes: nextPipes,
        score: nextScore,
        isWitchWaving: nextWitchWaving,
      }
    }
    case 'SPAWN_PIPE': {
      return {
        ...state,
        pipes: [...state.pipes, action.payload.pipe],
        isWitchWaving: true,
        witchHatColor: action.payload.hatColor,
      }
    }
    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const gameLoopRef = useRef<number>(null)
  const lastPipeSpawnRef = useRef<number>(0)
  const nextSpawnDelayRef = useRef<number>(0)
  const witchHatColorRef = useRef(state.witchHatColor)

  useEffect(() => {
    witchHatColorRef.current = state.witchHatColor
  }, [state.witchHatColor])

  const startGame = () => {
    dispatch({ type: 'START_GAME' })
    lastPipeSpawnRef.current = Date.now()
    nextSpawnDelayRef.current =
      Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN) + SPAWN_INTERVAL_MIN
  }

  const jump = () => {
    dispatch({ type: 'JUMP' })
  }

  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return

    const update = () => {
      const now = Date.now()
      dispatch({ type: 'UPDATE', payload: { now, spawnDelay: nextSpawnDelayRef.current } })

      if (now - lastPipeSpawnRef.current > nextSpawnDelayRef.current) {
        const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50
        const typeRand = Math.random()
        let type: 'both' | 'top' | 'bottom' = 'both'
        if (typeRand < 0.33) type = 'top'
        else if (typeRand < 0.66) type = 'bottom'

        const currentHatColor = witchHatColorRef.current

        dispatch({
          type: 'SPAWN_PIPE',
          payload: {
            pipe: {
              id: Date.now(),
              x: GAME_WIDTH - 1,
              topHeight,
              passed: false,
              isDeflagrating: false,
              type,
              color: currentHatColor,
              width: currentHatColor === RainbowColor.RED ? PIPE_WIDTH * 1.5 : PIPE_WIDTH,
              gap: PIPE_GAP,
              powerType: currentHatColor,
            },
            hatColor: RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)],
          },
        })

        lastPipeSpawnRef.current = now
        nextSpawnDelayRef.current =
          Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN) + SPAWN_INTERVAL_MIN
      }

      gameLoopRef.current = requestAnimationFrame(update)
    }

    gameLoopRef.current = requestAnimationFrame(update)
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
    }
  }, [state.gameStarted, state.gameOver])

  return {
    ...state,
    startGame,
    jump,
  }
}
