import classes from './Trump.module.css'

type TrumpProps = {
  y: number
  velocity: number
  x?: number
}

const Trump = ({ y, velocity, x = 50 }: TrumpProps) => {
  return (
    <div
      className={classes['trump-bird']}
      style={{
        top: y,
        left: x,
        transform: `rotate(${Math.min(velocity * 3, 90)}deg)`,
      }}
    >
      <div className={classes['trump-hair']}></div>
      <div className={classes['trump-face']}>
        <div className={classes['trump-eye']}></div>
        <div className={classes['trump-mouth']}></div>
      </div>
      <div className={classes['trump-body']}></div>
      <div className={classes['trump-wing']}></div>
    </div>
  )
}

export default Trump
