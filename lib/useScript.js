import { useEffect, useState } from 'react'

// we need a function that accepts the script src and couple of other parameters

const useScript = (params) => {
  const { url, theme, issueTerm, repo, ref } = params

  const [status, setStatus] = useState(url ? 'loading' : 'idle')

  // run the useEffect when the url of the script changes
  useEffect(() => {
    if (!url) {
      setStatus('idle')
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('theme', theme)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('repo', repo)

    ref.current.appendChild(script)

    const setAttributeStatus = (event) => {
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
  }, [url])
  return status
}

export default useScript
