import { useTheme } from 'next-themes'
import { ScriptProps } from 'next/script'
import { RefObject, useEffect, useState } from 'react'

type UtterancProps = {
  repo: string
  issueTerm: string
  ref: Exclude<RefObject<HTMLElement>, null>
}

const useComment = (params: ScriptProps & UtterancProps) => {
  const { src, issueTerm, repo, ref } = params
  const { theme } = useTheme()

  const [status, setStatus] = useState(src ? 'loading' : 'idle')


  useEffect(() => {
    if (!src) {
      setStatus('idle')
      return
    }
    let script = document.createElement('script')
    script.src = src
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute(
      'theme',
      theme === 'light' ? 'github-light' : 'github-dark'
    )
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('repo', repo)

    ref.current?.appendChild(script)

    const setAttributeStatus = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }

    script.addEventListener('load', setAttributeStatus)
    script.addEventListener('error', setAttributeStatus)

    return () => {
      // useEffect clean up
      if (script) {
        script.removeEventListener('load', setAttributeStatus)
        script.removeEventListener('error', setAttributeStatus)
      }
    }
  }, [src])
  return status
}

export default useComment
