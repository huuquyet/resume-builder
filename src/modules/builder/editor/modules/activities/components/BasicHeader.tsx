import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import type { SyntheticEvent } from 'react'
import type { IActivityTab, IAllActivityTabs } from '../ActivitiesLayout'

const BasicHeader = ({
  activeTab,
  changeActiveTab,
  tabs,
}: {
  activeTab: IActivityTab
  changeActiveTab: (event: SyntheticEvent, key: string) => void
  tabs: IAllActivityTabs
}) => {
  return (
    <Tabs value={activeTab.key} onChange={changeActiveTab} variant="fullWidth">
      {Object.keys(tabs).map((tab) => (
        <Tab
          key={tab}
          label={tabs[tab].label}
          value={tab}
          sx={{
            color: 'rgb(46 64 82)',
            textTransform: 'none',
            fontSize: '1rem',
          }}
        />
      ))}
    </Tabs>
  )
}

export default BasicHeader
