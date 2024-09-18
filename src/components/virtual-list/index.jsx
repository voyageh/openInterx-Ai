import { useEffect, useRef, createElement } from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import 'overlayscrollbars/overlayscrollbars.css'
import './index.scss'

/**
 * 虚拟列表
 *
 * @param {Object} props
 * @param {number} props.count - 列表总数
 * @param {number} props.estimateSize - 每一项的高度
 * @param {React.ReactNode} props.wrapper - 所有listItem的父节点
 * @param {React.ReactNode} props.children - ListItem
 */
const VirtualList = ({ children, data = [], estimateSize, wrapper }) => {
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

  const ListItem = getVirtualItems().map((item) =>
    createElement(children, {
      key: item.key,
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
    })
  )  

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
          {ListItem}
        </Wrapper>
      </div>
    </div>
  )
}

export default VirtualList
