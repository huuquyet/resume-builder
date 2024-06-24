import { produce } from 'immer'
import resumeData from 'src/helpers/constants/resume-data.json'
import { type StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IExperienceItem, IExperienceStore } from './experience.interface'

const addExperience =
  (set: StoreApi<IExperienceStore>['setState']) =>
  ({
    name,
    position,
    startDate,
    isWorkingHere,
    endDate,
    years,
    summary,
    id,
    url = '',
    highlights = [],
  }: IExperienceItem) =>
    set(
      produce((state: IExperienceStore) => {
        state.experiences.push({
          id,
          name,
          position,
          startDate,
          isWorkingHere,
          endDate,
          summary,
          url,
          years,
          highlights,
        })
      })
    )

const removeExperience = (set: StoreApi<IExperienceStore>['setState']) => (index: number) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }))

const setExperience =
  (set: StoreApi<IExperienceStore>['setState']) => (values: IExperienceItem[]) => {
    set({
      experiences: values,
    })
  }

const updateExperience =
  (set: StoreApi<IExperienceStore>['setState']) =>
  (index: number, updatedInfo: IExperienceItem) => {
    set(
      produce((state: IExperienceStore) => {
        state.experiences[index] = updatedInfo
      })
    )
  }

const getExperience = (get: StoreApi<IExperienceStore>['getState']) => (index: number) => {
  return get().experiences[index]
}

const onMoveUp = (set: StoreApi<IExperienceStore>['setState']) => (index: number) => {
  set(
    produce((state: IExperienceStore) => {
      if (index > 0) {
        const currentExperience = state.experiences[index]
        state.experiences[index] = state.experiences[index - 1]
        state.experiences[index - 1] = currentExperience
      }
    })
  )
}

const onMoveDown = (set: StoreApi<IExperienceStore>['setState']) => (index: number) => {
  set(
    produce((state: IExperienceStore) => {
      const totalExp = state.experiences.length
      if (index < totalExp - 1) {
        const currentExperience = state.experiences[index]
        state.experiences[index] = state.experiences[index + 1]
        state.experiences[index + 1] = currentExperience
      }
    })
  )
}

export const useExperiences = create<IExperienceStore>()(
  persist(
    (set, get) => ({
      experiences: resumeData.work,
      add: addExperience(set),
      get: getExperience(get),
      remove: removeExperience(set),
      reset: setExperience(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateExperience: updateExperience(set),
    }),
    { name: 'experience' }
  )
)
