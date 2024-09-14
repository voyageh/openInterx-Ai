import { useEffect, useRef } from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'

export default function OverlayScrollbarsComponent2({ contentId, children, ...other }) {
  const rootRef = useRef(null)
  const [initialize] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: { autoHide: 'leave', autoHideDelay: 200 },
    },
  })

  useEffect(() => {
    const { current: root } = rootRef

    if (root) {
      initialize({
        target: root,
        elements: {
          viewport: root.firstElementChild,
        },
      })
    }
  }, [initialize])

  return (
    <div ref={rootRef} data-overlayscrollbars-initialize="" {...other}>
      <div id={contentId} data-overlayscrollbars-contents="" className="overlayscrollbars-content">
        {children}
      </div>
    </div>
  )
}
