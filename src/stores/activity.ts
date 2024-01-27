import { produce } from 'immer'
import resumeData from 'src/helpers/constants/resume-data.json'
import { StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IActivity, IActivityStore } from './activity.interface'

const setAllAwards = (set: StoreApi<IActivityStore>['setState']) => (activityItem: IActivity) => {
  set({
    activities: activityItem,
  })
}

const updateAchievements =
  (set: StoreApi<IActivityStore>['setState']) => (achievements: string) => {
    set(
      produce((state: IActivityStore) => {
        state.activities.achievements = achievements
      })
    )
  }

const updateInvolvements =
  (set: StoreApi<IActivityStore>['setState']) => (involvements: string) => {
    set(
      produce((state: IActivityStore) => {
        state.activities.involvements = involvements
      })
    )
  }

export const useActivity = create<IActivityStore>()(
  persist(
    (set, get) => ({
      activities: resumeData.activities,

      get: () => get().activities,
      reset: setAllAwards(set),
      updateAchievements: updateAchievements(set),
      updateInvolvements: updateInvolvements(set),
    }),
    { name: 'activities' }
  )
)
