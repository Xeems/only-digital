export interface TimelineEvent {
  year: number
  text: string
}

export interface TimelinePeriod {
  id: number
  group: string
  start: number
  end: number
  events: TimelineEvent[]
}