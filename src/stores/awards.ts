import { produce } from 'immer'
import resumeData from 'src/helpers/constants/resume-data.json'
import { StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAwardItem, IAwardsStore } from './awards.interface'

const addAward =
  (set: StoreApi<IAwardsStore>['setState']) =>
  ({ title, awarder, date, summary, id }: IAwardItem) =>
    set(
      produce((state: IAwardsStore) => {
        state.awards.push({
          title,
          awarder,
          date,
          summary,
          id,
        })
      })
    )

const removeAward = (set: StoreApi<IAwardsStore>['setState']) => (index: number) =>
  set((state) => ({
    awards: state.awards.slice(0, index).concat(state.awards.slice(index + 1)),
  }))

const setAllAwards = (set: StoreApi<IAwardsStore>['setState']) => (values: IAwardItem[]) => {
  set({
    awards: values,
  })
}

const getAllAwards = (get: StoreApi<IAwardsStore>['getState']) => (index: number) => {
  return get().awards[index]
}

const onMoveUp = (set: StoreApi<IAwardsStore>['setState']) => (index: number) => {
  set(
    produce((state: IAwardsStore) => {
      if (index > 0) {
        const currentAward = state.awards[index]
        state.awards[index] = state.awards[index - 1]
        state.awards[index - 1] = currentAward
      }
    })
  )
}
const onMoveDown = (set: StoreApi<IAwardsStore>['setState']) => (index: number) => {
  set(
    produce((state: IAwardsStore) => {
      const totalExp = state.awards.length
      if (index < totalExp - 1) {
        const currentAward = state.awards[index]
        state.awards[index] = state.awards[index + 1]
        state.awards[index + 1] = currentAward
      }
    })
  )
}

const updateAward =
  (set: StoreApi<IAwardsStore>['setState']) => (index: number, updatedInfo: IAwardItem) => {
    set(
      produce((state: IAwardsStore) => {
        state.awards[index] = updatedInfo
      })
    )
  }

export const useAwards = create<IAwardsStore>()(
  persist(
    (set, get) => ({
      awards: resumeData.awards,
      add: addAward(set),
      get: getAllAwards(get),
      remove: removeAward(set),
      reset: setAllAwards(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateAward: updateAward(set),
    }),
    { name: 'awards' }
  )
)
