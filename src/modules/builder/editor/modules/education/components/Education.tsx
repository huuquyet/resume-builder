import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { type ChangeEvent, type FC, useCallback } from 'react'
import { SwitchWidget } from 'src/helpers/common/atoms/Switch'
import { DATE_PICKER_FORMAT } from 'src/helpers/constants'
import { useEducations } from 'src/stores/education'
import type { IEducationItem } from 'src/stores/education.interface'

interface IEducationProps {
  educationInfo: IEducationItem
  currentIndex: number
}

const Education: FC<IEducationProps> = ({ educationInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentExpInfo = { ...educationInfo }
      switch (name) {
        case 'academyName':
          currentExpInfo.institution = value
          break
        case 'degree':
          currentExpInfo.studyType = value
          break
        case 'area':
          currentExpInfo.area = value
          break
        case 'grade':
          currentExpInfo.score = value
          break
        case 'startDate':
          currentExpInfo.startDate = value
          break
        case 'isStudyingHere':
          currentExpInfo.isStudyingHere = value
          break
        case 'endDate':
          currentExpInfo.endDate = value
          break

        default:
          break
      }
      useEducations.getState().updateEducation(currentIndex, currentExpInfo)
    },
    [currentIndex, educationInfo]
  )

  return (
    <>
      <TextField
        label="School or College name"
        variant="filled"
        value={educationInfo.institution}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('academyName', value)
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Degree"
        variant="filled"
        value={educationInfo.studyType}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('degree', value)
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Area"
        variant="filled"
        value={educationInfo.area}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('area', value)
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Grade"
        variant="filled"
        value={educationInfo.score}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          onChangeHandler('grade', value)
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Start date"
        value={educationInfo.startDate}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate)
        }}
        inputFormat={DATE_PICKER_FORMAT}
        renderInput={(params) => (
          <TextField {...params} variant="filled" autoComplete="off" fullWidth required />
        )}
      />
      <SwitchWidget
        label={'I currently study here'}
        value={educationInfo.isStudyingHere ?? false}
        onChange={(newValue: boolean) => {
          onChangeHandler('isStudyingHere', newValue)
        }}
      />
      <DatePicker
        label="End date"
        value={educationInfo.isStudyingHere ? null : educationInfo.endDate}
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
        disabled={educationInfo.isStudyingHere}
      />
    </>
  )
}

export default Education
