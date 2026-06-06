import clsx from 'clsx'
import type { RainbowColor } from '../../hooks/useGame'
import classes from './Witch.module.css'

type WitchProps = {
  hatColor?: RainbowColor
  isWaving?: boolean
}

const Witch = ({ hatColor, isWaving }: WitchProps) => {
  return (
    <div
      className={clsx(classes['witch-container'], isWaving && classes.waving)}
      style={{ '--hat-color': hatColor } as React.CSSProperties}
    >
      <div className={classes['witch-hat']}></div>
      <div className={classes['witch-face']}>
        <div className={classes['witch-eye']}></div>
      </div>
      <div className={classes['witch-body']}>
        <div className={classes['witch-pride-cloak']}></div>
      </div>
      <div className={classes['witch-broom']}></div>
      <div className={classes['witch-magic-wand']}></div>
    </div>
  )
}

export default Witch
