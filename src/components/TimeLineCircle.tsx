import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TimelinePeriod } from "../types/timeline.types"

interface Props {
  periods: TimelinePeriod[]
  activeIndex: number
  onChange: (index: number) => void
}

export default function TimelineCircle({
  periods,
  activeIndex,
  onChange
}: Props) {

  const circleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const step = 360 / periods.length

  const handleChange = (index: number) => {

    if (!circleRef.current) return

    
    gsap.to(circleRef.current, {
      rotate: -step * index,
      duration: 1
    })

    gsap.from(labelRef.current, {
      opacity: 0,
      delay: 0.9,
      duration: 0.2,
    })
    
    onChange(index)
  }

  useEffect(() => {
    handleChange(activeIndex)
  },[activeIndex])

  return (
    <div className="timeline_circle" ref={circleRef}>
      {periods.map((p, i) => {

        const angle = step * i - 70
        const rotation = -step * activeIndex
        const radius = 265

        const x = radius * Math.cos((angle * Math.PI) / 180)
        const y = radius * Math.sin((angle * Math.PI) / 180)

        return (
          <button
              key={p.id}
              className={`timeline_dot ${i === activeIndex ? "active" : ""}`}
              style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg) `
              }}
              onClick={() => handleChange(i)}
          >
            <span>{i + 1}</span>
            {activeIndex === i && <span className="period_label" ref={labelRef}>{periods[i].group}</span>}
          </button>
        )
      })}
    </div>
  )
}