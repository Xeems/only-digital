import { gsap } from "gsap"
import { useEffect, useRef } from 'react'
import { TimelinePeriod } from '../types/timeline.types'

export default function TimeLineYears({activePeriod} : {activePeriod :TimelinePeriod}) {
    const startRef = useRef<HTMLSpanElement>(null)
    const endRef = useRef<HTMLSpanElement>(null)
    const start = activePeriod.start
    const end = activePeriod.end

    useEffect(() => {

    if (!startRef.current || !endRef.current) return

    const obj = {
      start: Number(startRef.current.textContent),
      end: Number(endRef.current.textContent)
    }
    gsap.to(obj, {
      start,
      end,
      duration: 0.8,
      ease: "power2.out",

      onUpdate: () => {
        if (startRef.current)
          startRef.current.textContent = Math.round(obj.start).toString()

        if (endRef.current)
          endRef.current.textContent = Math.round(obj.end).toString()
      }
    })

  }, [start, end])

  return (
    <div className="timeline_years">
        <span className="years_start" ref={startRef}/>
        <span className="years_end" ref={endRef}/>
    </div>
  )
}


