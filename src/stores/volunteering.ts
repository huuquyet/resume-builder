import { produce } from 'immer'
import resumeData from 'src/helpers/constants/resume-data.json'
import { StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IVolunteeringItem, IVolunteeringStore } from './volunteering.interface'

const addVolunteering =
  (set: StoreApi<IVolunteeringStore>['setState']) =>
  ({
    organization,
    position,
    startDate,
    isVolunteeringNow,
    endDate,
    summary,
    id,
    url = '',
    highlights = [],
  }: IVolunteeringItem) =>
    set(
      produce((state: IVolunteeringStore) => {
        state.volunteeredExps.push({
          id,
          organization,
          position,
          startDate,
          isVolunteeringNow,
          endDate,
          summary,
          url,
          highlights,
        })
      })
    )

const removeVolunteeringExp = (set: StoreApi<IVolunteeringStore>['setState']) => (index: number) =>
  set((state) => ({
    volunteeredExps: state.volunteeredExps
      .slice(0, index)
      .concat(state.volunteeredExps.slice(index + 1)),
  }))

const setVolunteeringExps =
  (set: StoreApi<IVolunteeringStore>['setState']) => (values: IVolunteeringItem[]) => {
    set({
      volunteeredExps: values,
    })
  }

const updatedVolunteeringExp =
  (set: StoreApi<IVolunteeringStore>['setState']) =>
  (index: number, updatedInfo: IVolunteeringItem) => {
    set(
      produce((state: IVolunteeringStore) => {
        state.volunteeredExps[index] = updatedInfo
      })
    )
  }

const getVolunteeringExp = (get: StoreApi<IVolunteeringStore>['getState']) => (index: number) => {
  return get().volunteeredExps[index]
}

const onMoveUp = (set: StoreApi<IVolunteeringStore>['setState']) => (index: number) => {
  set(
    produce((state: IVolunteeringStore) => {
      if (index > 0) {
        const currentExperience = state.volunteeredExps[index]
        state.volunteeredExps[index] = state.volunteeredExps[index - 1]
        state.volunteeredExps[index - 1] = currentExperience
      }
    })
  )
}

const onMoveDown = (set: StoreApi<IVolunteeringStore>['setState']) => (index: number) => {
  set(
    produce((state: IVolunteeringStore) => {
      const totalExp = state.volunteeredExps.length
      if (index < totalExp - 1) {
        const currentExperience = state.volunteeredExps[index]
        state.volunteeredExps[index] = state.volunteeredExps[index + 1]
        state.volunteeredExps[index + 1] = currentExperience
      }
    })
  )
}

export const useVoluteeringStore = create<IVolunteeringStore>()(
  persist(
    (set, get) => ({
      volunteeredExps: resumeData.volunteer,
      add: addVolunteering(set),
      get: getVolunteeringExp(get),
      remove: removeVolunteeringExp(set),
      reset: setVolunteeringExps(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updatedVolunteeringExp: updatedVolunteeringExp(set),
    }),
    { name: 'volunteering' }
  )
)
