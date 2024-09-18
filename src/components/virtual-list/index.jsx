import { useEffect, useRef, Fragment, memo } from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useVirtualizer } from '@tanstack/react-virtual'

import 'overlayscrollbars/overlayscrollbars.css'
import './index.scss'

/**
 * 虚拟列表
 *
 * @param {Object} props - The component props.
 * @param {number} props.count - The name to display.
 * @param {(index: number) => number} props.estimateSize - The age to display.
 * @param {React.ReactNode} props.wrapper - The age to display.
 * @param {React.ReactNode} props.children - The children to render for each item.
 * @returns {JSX.Element} The rendered component.
 */
export default function VirtualList({ children, count, estimateSize, className, components }) {
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
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => viewportRef.current,
    estimateSize,
  })
  const List = components.List || Fragment
  const ItemComponent = components.Item
  const Items = memo((props) => {
    const measureElement = virtualizer.measureElement
    return (
      <ItemComponent measureElement={measureElement} {...props}>
        {children}
      </ItemComponent>
    )
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
    <div data-overlayscrollbars-initialize="" ref={rootRef} className="virtual-list">
      <div ref={viewportRef}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <List>{virtualizer.getVirtualItems().map((virtualRow) => Items(virtualRow))}</List>
        </div>
      </div>
    </div>
  )
}
