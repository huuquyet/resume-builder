import resumeData from 'src/helpers/constants/resume-data.json'
import { StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface'

const onChangeText =
  (set: StoreApi<IBasicDetailsStore>['setState']) => (values: IBasicDetailsItem) =>
    set({ values })

export const useBasicDetails = create<IBasicDetailsStore>()(
  persist(
    (set) => ({
      values: resumeData.basics,
      reset: onChangeText(set),
    }),
    { name: 'basic' }
  )
)
