import { useEffect, useRef } from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import 'overlayscrollbars/overlayscrollbars.css'

export const Virtualized = ({ children, total, ...props }) => {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const [initialize] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        autoHide: 'leave',
        autoHideDelay: 200,
      },
    },
    events: {
      scroll: (e) => {
        console.log(e.state())
        console.log(e.elements().scrollOffsetElement.scrollTop)
      },
    },
  })
  const rowVirtualizer = useVirtualizer({
    count: total,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 100,
  })

  useEffect(() => {
    const { current: root } = rootRef
    const { current: viewport } = viewportRef

    if (root && viewport) {
      initialize({
        target: root,
        elements: {
          viewport,
        },
      })
    }
  }, [initialize])

  return (
    <div data-overlayscrollbars-initialize="" ref={rootRef} {...props}>
      <div ref={viewportRef}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className='video-card'
            >
              {children(virtualRow.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Virtualized
