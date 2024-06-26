import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import type { SyntheticEvent } from 'react'
import type React from 'react'

const BasicHeader = ({
  activeTab,
  changeActiveTab,
  tabTitles,
}: {
  activeTab: number
  changeActiveTab: (event: SyntheticEvent, activeTab: number) => void
  tabTitles: string[]
}) => {
  return (
    <Tabs value={activeTab} onChange={changeActiveTab} variant="fullWidth">
      {tabTitles.map((title: string, index: number) => (
        <Tab
          key={index}
          label={title}
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
