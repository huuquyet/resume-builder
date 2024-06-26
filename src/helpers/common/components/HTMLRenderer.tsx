import parseHtmlStringToHtml, { domToReact } from 'html-react-parser'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './richtext/jodit.module.css'

export const HTMLRenderer = ({ htmlString }: { htmlString: string }) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      replace: (domNode: any) => {
        if (domNode.attribs?.href && domNode.name === 'a') {
          return <Link href={domNode.attribs.href}>{domToReact(domNode.children)}</Link>
        }
        if (domNode.name === 'script') {
          return <></>
        }
      },
    })
  }, [htmlString])
  return <div className={`${styles.richtextRuntimeWrapper} text-xs`}>{parsedElement}</div>
}
