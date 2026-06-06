import clsx from 'clsx'
import { RainbowColor } from '../../hooks/useGame'
import classes from './Pillar.module.css'

type PillarProps = {
  x: number
  topHeight: number
  gap: number
  gameHeight: number
  type: 'both' | 'top' | 'bottom'
  color?: RainbowColor
  width?: number
  horizontalOffset?: number
  opacity?: number
  isDeflagrating?: boolean
}

const Pillar = ({ x, topHeight, gap, gameHeight, type, color, width, horizontalOffset, opacity, isDeflagrating }: PillarProps) => {
  const effectiveX = x + (horizontalOffset || 0)
  const pillarWidth = width || 60
  const capWidth = pillarWidth + 14
  const capLeft = -7

  return (
    <>
      {/* Top Pillar */}
      {(type === 'both' || type === 'top') && (
        <div
          className={clsx(classes.pillar, classes.top, isDeflagrating && classes.deflagrating)}
          style={{
            left: effectiveX,
            top: 0,
            height: topHeight,
            background: isDeflagrating ? '#1a1a1a' : (color || undefined),
            width: pillarWidth,
            opacity: opacity ?? 1,
          }}
        >
          <div className={classes['pillar-glow']} />
          <div
            className={classes['pillar-cap']}
            style={{ width: capWidth, left: capLeft }}
          >
            <span className={classes['heart-emblem']}>❤</span>
          </div>
        </div>
      )}
      {/* Bottom Pillar */}
      {(type === 'both' || type === 'bottom') && (
        <div
          className={clsx(classes.pillar, classes.bottom, isDeflagrating && classes.deflagrating)}
          style={{
            left: effectiveX,
            top: topHeight + gap,
            height: gameHeight - topHeight - gap,
            background: isDeflagrating ? '#1a1a1a' : (color || undefined),
            width: pillarWidth,
            opacity: opacity ?? 1,
          }}
        >
          <div className={classes['pillar-glow']} />
          <div
            className={classes['pillar-cap']}
            style={{ width: capWidth, left: capLeft }}
          >
            <span className={classes['heart-emblem']}>❤</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Pillar
