import { RichtextEditor } from 'src/helpers/common/components/richtext'

const About = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any
  onChangeHandler: (value: any, key: string) => void
}) => {
  return (
    <>
      <RichtextEditor
        label="About me"
        value={basicTabs.summary}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'summary')
        }}
        name="summary"
      />
      <RichtextEditor
        label="Career objective"
        value={basicTabs.objective}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'objective')
        }}
        name="objective"
      />
    </>
  )
}

export default About
