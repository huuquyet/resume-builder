import { ChangeEvent, useCallback, useRef, useState } from 'react'
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills'
import { NavBarActions, NavBarMenu, StyledButton } from './atoms'

import exportFromJSON from 'export-from-json'
import Image from 'next/image'
import Link from 'next/link'
import UserAPI from 'src/helpers/api/user'
import { Toast } from 'src/helpers/common/atoms/Toast'
import { AVAILABLE_TEMPLATES } from 'src/helpers/constants'
import DEFAULT_RESUME_JSON from 'src/helpers/constants/resume-data.json'
import { useAuthContext } from 'src/helpers/context/AuthContext'
import { useActivity } from 'src/stores/activity'
import { useAwards } from 'src/stores/awards'
import { useBasicDetails } from 'src/stores/basic'
import { useEducations } from 'src/stores/education'
import { useExperiences } from 'src/stores/experience'
import { useVoluteeringStore } from 'src/stores/volunteering'
import { NavMenuItem } from './components/MenuItem'
import { PrintResume } from './components/PrintResume'
import { TemplateSelect } from './components/TemplateSelect'
import { ThemeSelect } from './components/ThemeSelect'

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length

const NavBarLayout = () => {
  const [openToast, setOpenToast] = useState(false)
  const fileInputRef = useRef(null)
  const { user, setUser } = useAuthContext()
  const [messageSave, setMessageSave] = useState('Resume data was successfully saved.')

  const exportResumeData = useCallback(() => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
    }
    const fileName = `${updatedResumeJson.basics.name}_${new Date().toLocaleString()}`
    const exportType = exportFromJSON.types.json
    exportFromJSON({
      data: updatedResumeJson,
      fileName,
      exportType,
    })
  }, [])

  const handleSaveResume = useCallback(async () => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
    }

    if (user) {
      const { data, status } = await UserAPI.updateUserResume(user.id, updatedResumeJson)
      if (status !== 200) {
        setMessageSave('Data update failed.')
      }
    } else {
      setMessageSave('To save data, please log in to your account.')
    }

    setOpenToast(true)
  }, [user])

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files?.[0]
    if (!fileObj) {
      return
    }

    const reader = new FileReader()

    reader.readAsText(fileObj)

    event.target.value = '' // To read the same file

    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        const uploadedResumeJSON = JSON.parse(e.target?.result)
        const {
          basics = {},
          skills = {},
          work = [],
          education = [],
          activities = {
            involvements: '',
            achievements: '',
          },
          volunteer = [],
          awards = [],
        } = uploadedResumeJSON
        const {
          languages = [],
          frameworks = [],
          libraries = [],
          databases = [],
          technologies = [],
          practices = [],
          tools = [],
        } = skills
        useBasicDetails.getState().reset(basics)
        useLanguages.getState().reset(languages)
        useFrameworks.getState().reset(frameworks)
        useLibraries.getState().reset(libraries)
        useDatabases.getState().reset(databases)
        useTechnologies.getState().reset(technologies)
        usePractices.getState().reset(practices)
        useTools.getState().reset(tools)
        useExperiences.getState().reset(work)
        useEducations.getState().reset(education)
        useVoluteeringStore.getState().reset(volunteer)
        useAwards.getState().reset(awards)
        useActivity.getState().reset(activities)
        setOpenToast(true)
      }
    }
  }, [])

  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/">
        <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
      </Link>
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem
            caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
            popoverChildren={<TemplateSelect />}
          />
          <NavMenuItem caption="Colours" popoverChildren={<ThemeSelect />} />
        </NavBarMenu>
        <NavBarActions>
          <StyledButton variant="text" onClick={handleSaveResume}>
            Save
          </StyledButton>
          {/* <StyledButton variant="text" onClick={handleSaveResume}>
            Publish
          </StyledButton> */}
          <PrintResume />
        </NavBarActions>
      </div>
      <Toast
        open={openToast}
        onClose={() => {
          setOpenToast(false)
        }}
        content={messageSave}
      />
    </nav>
  )
}

export default NavBarLayout
