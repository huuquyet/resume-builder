import dayjs, { type Dayjs } from 'dayjs'

export const dateParser = (dateValue: string | Dayjs | null, outputFormat = 'MMM YYYY') => {
  if (dateValue === null) return
  const dayjsDate = dayjs(dateValue)
  return dayjsDate.format(outputFormat)
}
