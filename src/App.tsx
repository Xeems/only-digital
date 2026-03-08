import Timeline from "./components/TimeLine"
import { timelineData } from "./lib/timelineData"

export default function App() {
  return (
      <Timeline data={timelineData} />
  )
}