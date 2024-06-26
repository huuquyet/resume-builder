import type { Dayjs } from 'dayjs'

export interface IExperienceItem {
  id: string
  name: string
  position: string
  url: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  years: string
  summary: string
  highlights: string[]
  isWorkingHere: boolean
}

export interface IExperienceStore {
  experiences: IExperienceItem[]
  add: (newExperience: IExperienceItem) => void
  get: (index: number) => IExperienceItem
  remove: (index: number) => void
  reset: (values: IExperienceItem[]) => void
  onmoveup: (index: number) => void
  onmovedown: (index: number) => void
  updateExperience: (index: number, updatedInfo: IExperienceItem) => void
}
