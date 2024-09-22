import { useEffect, useRef, memo, useMemo, Fragment } from 'react'
import { Empty } from 'antd'
import EmptyIcon from '@/assets/images/empty.svg'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import 'overlayscrollbars/overlayscrollbars.css'

import './index.scss'

const VirtualList = ({ data = [], size = 1, loading, estimateSize, wrapper, rowClass, itemContent, loader, empty }) => {
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
    count: loading ? 10 : Math.ceil(data.length / size),
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

  const childContent = useMemo(() => {
    if (!itemContent) return null
    const renderItem = loading ? loader : itemContent
    return getVirtualItems().map((row) => (
      <div
        key={row.key}
        data-index={row.index}
        ref={measureElement}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${row.start}px)`,
        }}
        className={rowClass}
      >
        {size === 1
          ? renderItem(data[row.index])
          : Array.from({ length: size }).map((_, i) => {
              const itemData = data[size * row.index + i]
              return loading ? <Fragment key={i}>{renderItem()}</Fragment> : itemData && <Fragment key={itemData.id}>{renderItem(itemData)}</Fragment>
            })}
      </div>
    ))
  }, [getVirtualItems(), data, size, rowClass])

  const EmptyDes = empty || 'No data'

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
          {childContent}
        </Wrapper>
        {!loading && data.length === 0 && (
          <div className="virtual-list__emty">
            <Empty image={<EmptyIcon />} description={EmptyDes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(VirtualList)
