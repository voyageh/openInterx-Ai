import { useEffect, useState, memo } from 'react'
import { Checkbox } from 'antd'
import { useResizeDetector } from 'react-resize-detector'
import VirtualList from '@/components/virtual-list'
import { chunkArray } from '@/utils/array'

const CheckboxGroup = Checkbox.Group

const List = (props) => {
  const { data = [], type = 'list' } = props
  const { width, ref } = useResizeDetector()
  const [list, setList] = useState([])

  useEffect(() => {
    let size = 3
    switch (true) {
      case type === 'list':
        size = 1
        break
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
  }, [data, width, type])

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

  const wrapper = ({ style, children }) => (
    <CheckboxGroup style={style} value={checkedList} onChange={onSelectVideo}>
      {children}
    </CheckboxGroup>
  )

  const VideoCard = ({ rowData, measureElement, ...other }) => {
    return (
      <div ref={measureElement} {...other} className="video-card">
        {rowData.map((item, i) => (
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
  }

  const VideoList = ({ rowData, measureElement, ...other }) => {
    return (
      <div ref={measureElement} {...other} className={`video-list ${type}`}>
        {rowData.map((item, i) => (
          <div key={i} className="video-item" draggable onDragStart={onDragStart}>
            <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
              <div className="video-cover__mask text">{item.date}</div>
              <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
            </div>
            <div className="video-name ellipsis-2-lines">{item.name}</div>
            {type === 'list' && <div className="text">{item.date}</div>}
            <div className="video-date">Aug 12 2024</div>
          </div>
        ))}
      </div>
    )
  }  

  return (
    <div ref={ref} className="video-list-wrapper__content">
      <VirtualList data={list} estimateSize={200} wrapper={wrapper}>
        {VideoList}
      </VirtualList>
    </div>
  )
}

export default List
