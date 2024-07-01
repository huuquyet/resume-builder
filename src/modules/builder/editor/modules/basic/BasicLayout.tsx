import { type SyntheticEvent, useState } from 'react'
import { useBasicDetails } from 'src/stores/basic'
import BasicHeader from './components/BasicHeader'
import BasicPanel from './components/BasicPanel'

const tabTitles = ['Contacts', 'Links', 'About']

const BasicLayout = () => {
  const [activeTab, setActiveTab] = useState(0)
  const basicTabs = useBasicDetails((state) => state.values)
  const onChangeText = useBasicDetails.getState().reset

  const changeActiveTab = (event: SyntheticEvent, activeTab: number) => {
    setActiveTab(activeTab)
  }

  return (
    <>
      <BasicHeader activeTab={activeTab} changeActiveTab={changeActiveTab} tabTitles={tabTitles} />
      <BasicPanel activeTab={activeTab} basicTabs={basicTabs} onChangeText={onChangeText} />
    </>
  )
}

export default BasicLayout
