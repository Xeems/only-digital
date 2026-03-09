export interface TimelineEvent {
  year: number
  text: string
}

export interface TimelinePeriod {
  id: number
  group?: string | undefined
  start: number
  end: number
  events: TimelineEvent[]
}