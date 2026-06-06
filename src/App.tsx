import clsx from 'clsx'
import { useEffect } from 'react'
import classes from './App.module.css'
import Cloud from './components/Cloud'
import Pillar from './components/Pillar'
import Trump from './components/Trump'
import Witch from './components/Witch'
import { GAME_HEIGHT, TRUMP_X, useGame } from './hooks/useGame'

function App() {
  const {
    gameStarted,
    gameOver,
    score,
    trumpY,
    velocity,
    pipes,
    isWitchWaving,
    witchHatColor,
    isPaused,
    startGame,
    jump,
    togglePause,
  } = useGame()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        jump()
      } else if (e.key.toLowerCase() === 'p') {
        togglePause()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [jump, togglePause])

  return (
    <div
      className={classes['game-container']}
      onClick={jump}
      style={{ '--trump-x': `${TRUMP_X + 20}px` } as React.CSSProperties}
    >
      <div className={classes['sky-background']} />
      <div className={classes['score-board']}>
        <div className={classes['binary-score']}>{score.toString(2).padStart(8, '0')}</div>
      </div>

      {gameStarted && !gameOver && (
        <button
          type="button"
          className={classes['pause-button']}
          onClick={(e) => {
            e.stopPropagation()
            togglePause()
          }}
        >
          {isPaused ? '▶' : '||'}
        </button>
      )}

      {isPaused && (
        <div className={classes['pause-overlay']}>
          <h1>PAUSED</h1>
          <p>Press 'P' or click the button to Resume</p>
        </div>
      )}

      <Cloud top={15} speed={25} opacity={0.6} scale={0.8} isGray />
      <Cloud top={30} speed={40} opacity={0.4} scale={1.2} isGray />
      <Cloud top={50} speed={30} opacity={0.5} scale={0.9} isGray />
      <Cloud top={70} speed={50} opacity={0.3} scale={1.1} isGray />

      {!gameStarted && (
        <div className={classes['start-screen']}>
          <h1>Flappy Trump: Color Drain</h1>
          <p>Trump is on a mission to turn the world gray and defeat diversity.</p>
          <p>
            The Pride Witch is casting <strong>Diversity Spires</strong> to stop him!
          </p>
          <p>Every spire he passes loses its color and deflagrates.</p>
          <button type="button" onClick={startGame}>
            Start Mission
          </button>
          <p style={{ marginTop: '10px' }}>Press Space or Click to Jump</p>
        </div>
      )}

      {gameOver && (
        <div className={clsx(classes['game-over'], gameOver && classes.active)}>
          <h1>Mission Failed</h1>
          <p>Diversity prevailed this time.</p>
          <p>Final Score: {score.toString(2).padStart(8, '0')}</p>
          <button type="button" onClick={startGame}>
            Try Again
          </button>
        </div>
      )}

      <Trump y={trumpY} velocity={velocity} x={TRUMP_X} />

      <div className={classes['witch-group']}>
        <Witch hatColor={witchHatColor} isWaving={isWitchWaving} />
      </div>

      {pipes.map((pipe) => (
        <Pillar
          key={pipe.id}
          x={pipe.x}
          topHeight={pipe.topHeight}
          gap={pipe.gap}
          gameHeight={GAME_HEIGHT}
          type={pipe.type}
          color={pipe.color}
          width={pipe.width}
          horizontalOffset={pipe.horizontalOffset}
          opacity={pipe.opacity}
          isDeflagrating={pipe.isDeflagrating}
        />
      ))}
    </div>
  )
}

export default App
