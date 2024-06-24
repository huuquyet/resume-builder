import { type ReactNode, useMemo } from 'react'
import type { IAwardItem } from 'src/stores/awards.interface'
import type { IEducationItem } from 'src/stores/education.interface'
import type { IExperienceItem } from 'src/stores/experience.interface'
import type { ISkillItem } from 'src/stores/skill.interface'
import type { IVolunteeringItem } from 'src/stores/volunteering.interface'

export const SectionValidator = ({
  value,
  children,
}: {
  value:
    | string
    | IExperienceItem[]
    | IEducationItem[]
    | IAwardItem[]
    | IVolunteeringItem[]
    | ISkillItem[]
  children: ReactNode
}) => {
  const isValid = useMemo(() => {
    return (value || '').length > 0
  }, [value])

  if (!isValid) {
    return null
  }

  return <>{children}</>
}
