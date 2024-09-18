import { useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd'
import { useResizeDetector } from 'react-resize-detector'
import VirtualList from '@/components/virtual-list'
import { chunkArray } from '@/utils/array'

const CheckboxGroup = Checkbox.Group

/**
 * @enum {string}
 */
const AgeType = {
  CHILD: 'child',
  TEEN: 'teen',
  ADULT: 'adult',
  SENIOR: 'senior',
}

/**
 * 视频列表
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - 数据
 * @param {"list" | "card"} props.type - 列表类型
 */
export default function List(props) {
  const { data = [], type = 'card' } = props
  const { width, ref } = useResizeDetector()
  const [list, setList] = useState([])

  useEffect(() => {
    let size = 3
    switch (true) {
      case width < 576:
        size = 1 // XS
        break
      case width >= 576 && width < 768:
        size = 2 // SM
        break
      case width >= 768 && width < 992:
        size = 3 // MD
        break
      case width >= 992 && width < 1200:
        size = 4 // LG
        break
      case width >= 1200 && width < 1400:
        size = 5 // XL
        break
      case width >= 1400 && width < 1600:
        size = 6 // XXL
        break
      case width >= 1600:
        size = 7 // 大于1600
        break
    }
    setList(chunkArray(data, size))
  }, [width, data, type])

  const onDragStart = (e) => {
    const dragPreview = document.createElement('div')
    dragPreview.classList.add('drag-preview')
    const img = document.createElement('img')
    img.src = '1.png'
    dragPreview.appendChild(img)
    const span = document.createElement('span')
    span.classList.add('count')
    span.innerText = '1'
    dragPreview.appendChild(span)

    document.body.appendChild(dragPreview)
    e.dataTransfer.setDragImage(dragPreview, 30, 30)

    setTimeout(() => {
      document.body.removeChild(dragPreview)
    }, 0)
  }

  const [checkedList, setCheckedList] = useState([]) //选中视频
  const onSelectVideo = (v) => {
    setCheckedList(v)
  }

  const wrapper = ({ children }) => (
    <CheckboxGroup value={checkedList} onChange={onSelectVideo}>
      {children}
    </CheckboxGroup>
  )

  const VideoCard = (index) =>
    list[index].map((item, i) => (
      <div key={i} className="video-item" draggable onDragStart={onDragStart}>
        <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
          <div className="video-cover__mask text">{item.date}</div>
          <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
        </div>
        <div className="video-name ellipsis-2-lines">{item.name}</div>
        <div className="video-date">Aug 12 2024</div>
      </div>
    ))

  const videoList = {
    Wrapper: wrapper,
    Item: ({ index, measureElement, ...other }) => {
      return (
        <div ref={measureElement} {...other} className="video-card">
          {list[index].map((item, i) => (
            <div key={i} className="video-item" draggable onDragStart={onDragStart}>
              <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
                <div className="video-cover__mask text">{item.date}</div>
                <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
              </div>
              <div className="video-name ellipsis-2-lines">{item.name}</div>
              <div className="video-date">Aug 12 2024</div>
            </div>
          ))}
        </div>
      )
    },
  }

  return (
    <div ref={ref} className="video-list-wrapper__content">
      <VirtualList className="video-card" count={list.length} estimateSize={() => 200} components={videoList} />
    </div>
  )
}
