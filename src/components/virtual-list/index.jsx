import { useEffect, useRef, Fragment, memo } from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import 'overlayscrollbars/overlayscrollbars.css'
import './index.scss'

const VirtualList = ({ data = [], estimateSize, wrapper, itemContent }) => {
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
  })
  const { getVirtualItems, getTotalSize, measureElement } = useVirtualizer({
    count: data.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => estimateSize,
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

  const Wrapper = wrapper || 'div'

  const childrenContent = getVirtualItems().map((item) => {
    if (!itemContent) return null
    return (
      <Fragment key={item.key}>
        {itemContent({
          'data-index': item.index,
          measureElement,
          rowData: data[item.index],
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${item.start}px)`,
          },
        })}
      </Fragment>
    )
  })

  return (
    <div data-overlayscrollbars-initialize="" ref={rootRef} className="virtual-list">
      <div ref={viewportRef}>
        <Wrapper
          style={{
            height: `${getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {childrenContent}
        </Wrapper>
      </div>
    </div>
  )
}

export default memo(VirtualList)
