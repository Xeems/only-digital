import {  useState } from "react"
import { TimelinePeriod } from "../types/timeline.types"
import TimelineCircle from "./TimeLineCircle"
import TimelineSlider from "./TimeLineSlider"
import '../styles.scss'
import { toTwoDigits } from "../lib/utils"
import  ArrowRightIcon  from "../images/chevron-right.svg"
import  ArrowLeftIcon  from "../images/chevron-left.svg"
import TimeLineYears from "./TimeLineYears"

interface Props {
  data: TimelinePeriod[]
}

export default function Timeline({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activePeriod = data[activeIndex]

  return (
    <div className="timeline">
      <div className="header_container">
        <div className="gradient"/>
        <h1>Исторические <br/> даты</h1>
      </div>

      <hr className="horizontal"/>
      <hr className="vertical"/>
      <TimeLineYears activePeriod={activePeriod}/>

      <TimelineCircle
        periods={data}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />

      <div className="navigation_slider_container">
        <div className="timeline_periods_navigation">
          <span className="timeline_periods_count">{toTwoDigits(activeIndex + 1)} / {toTwoDigits(data.length)}</span> 
          <div >
            <button disabled={activeIndex === 0} onClick={() => {setActiveIndex((i) => i - 1 )}}><ArrowLeftIcon/></button>
            <button disabled={activeIndex === data.length - 1} onClick={() => {setActiveIndex((i) => i + 1 )}}><ArrowRightIcon/></button>
          </div>
        </div>
        <TimelineSlider events={activePeriod.events} /> 
      </div>
    </div>
  )
}