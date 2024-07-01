import type { Dayjs } from 'dayjs'

export interface IEducationItem {
  institution: string
  url: string
  studyType: string
  area: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  isStudyingHere: boolean
  score: string
  courses: string[]
  id: string
}

export interface IEducationStore {
  academics: IEducationItem[]
  add: (newEducation: IEducationItem) => void
  get: (index: number) => IEducationItem
  remove: (index: number) => void
  reset: (values: IEducationItem[]) => void
  onmoveup: (index: number) => void
  onmovedown: (index: number) => void
  updateEducation: (index: number, updatedInfo: IEducationItem) => void
}
