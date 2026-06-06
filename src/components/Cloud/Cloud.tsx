import classes from './Cloud.module.css'

type CloudProps = {
  top: number
  speed: number
  opacity: number
  scale: number
  isGray?: boolean
}

const Cloud = ({ top, speed, opacity, scale, isGray }: CloudProps) => {
  return (
    <div
      className={classes.cloud}
      style={{
        top: `${top}%`,
        opacity,
        transform: `scale(${scale})`,
        '--cloud-speed': `${speed}s`,
        filter: isGray ? 'grayscale(100%) brightness(0.7)' : 'none',
      } as React.CSSProperties}
    >
      <div className={classes['cloud-part-main']} />
      <div className={classes['cloud-part-top']} />
      <div className={classes['cloud-part-left']} />
      <div className={classes['cloud-part-right']} />
    </div>
  )
}

export default Cloud
