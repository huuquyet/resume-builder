import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { type ChangeEvent, type FC, useCallback } from 'react'
import { SwitchWidget } from 'src/helpers/common/atoms/Switch'
import { RichtextEditor } from 'src/helpers/common/components/richtext'
import { DATE_PICKER_FORMAT } from 'src/helpers/constants'
import { useExperiences } from 'src/stores/experience'
import type { IExperienceItem } from 'src/stores/experience.interface'

interface IExperienceProps {
  experienceInfo: IExperienceItem
  currentIndex: number
}

const Experience: FC<IExperienceProps> = ({ experienceInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentExpInfo = { ...experienceInfo }
      const updateExperience = useExperiences.getState().updateExperience
      switch (name) {
        case 'companyName':
          currentExpInfo.name = value
          break
        case 'position':
          currentExpInfo.position = value
          break
        case 'startDate':
          currentExpInfo.startDate = value
          break
        case 'isWorkingHere':
          currentExpInfo.isWorkingHere = value
          break
        case 'endDate':
          currentExpInfo.endDate = value
          break
        case 'years':
          currentExpInfo.years = value
          break
        case 'summary':
          currentExpInfo.summary = value
          break
        default:
          break
      }
      updateExperience(currentIndex, currentExpInfo)
    },
    [currentIndex, experienceInfo]
  )

  const onSummaryChange = useCallback(
    (htmlOutput: string) => {
      onChangeHandler('summary', htmlOutput)
    },
    [onChangeHandler]
  )

  return (
    <>
      <TextField
        label="Comapany name"
        variant="filled"
        value={experienceInfo.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('companyName', value)
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Position"
        variant="filled"
        value={experienceInfo.position}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('position', value)
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Start date"
        value={experienceInfo.startDate}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate)
        }}
        inputFormat={DATE_PICKER_FORMAT}
        renderInput={(params) => (
          <TextField {...params} variant="filled" autoComplete="off" fullWidth required />
        )}
      />
      <SwitchWidget
        label={'I currently work here'}
        value={experienceInfo.isWorkingHere ?? false}
        onChange={(newValue: boolean) => {
          onChangeHandler('isWorkingHere', newValue)
        }}
      />
      <DatePicker
        label="End date"
        value={experienceInfo.isWorkingHere ? null : experienceInfo.endDate}
        onChange={(newDate) => {
          onChangeHandler('endDate', newDate)
        }}
        inputFormat={DATE_PICKER_FORMAT}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            autoComplete="off"
            fullWidth
            required
            sx={{ marginBottom: '26px' }}
          />
        )}
        disabled={experienceInfo.isWorkingHere}
      />
      <TextField
        label="Years"
        variant="filled"
        value={experienceInfo.years}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('years', value)
        }}
        autoComplete="off"
        fullWidth
        sx={{ marginBottom: '26px' }}
      />
      <RichtextEditor
        label="Few points on this work experience"
        value={experienceInfo.summary}
        onChange={onSummaryChange}
        name="summary"
      />
    </>
  )
}

export default Experience
