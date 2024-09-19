import { useEffect, useState, memo } from 'react'
import { Tag, Checkbox, Button } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Icon from '@/components/icon'
import { useResizeDetector } from 'react-resize-detector'
import VirtualList from '@/components/virtual-list'
import { chunkArray } from '@/utils/array'
import { usePagination, useRequest } from 'alova/client'
import { queryVideoList } from '@/api/video'

import 'swiper/css'
import './style/list.scss'

const CheckboxGroup = Checkbox.Group

const tagsData = [
  'All',
  'Football',
  'Baseball',
  'Swimming',
  'Badminton',
  'Badminton1',
  'Badminton2',
  'Badminton3',
  'Badminton4',
  'Badminton5',
  'Badminton6',
  'Badminton7',
]

const List = (props) => {
  const [selectedTag, setSelectedTags] = useState('All')
  const handleChange = (tag, checked) => {
    const nextSelectedTag = checked ? tag : 'All'
    setSelectedTags(nextSelectedTag)
  }

  const [listType, setListType] = useState('')
  const switchList = () => {
    setListType(listType === '' ? 'list' : '')
  }

  const [checkedList, setCheckedList] = useState([]) //选中视频
  const indeterminate = checkedList.length > 0 && checkedList.length < 11

  const onSelectVideo = (v) => {
    setCheckedList(v)
  }

  const onSelectAll = (e) => {
    setCheckedList(e.target.checked ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [])
  }

  const { width, ref: listRef } = useResizeDetector()
  const [list, setList] = useState([])
  const { loading, data, total } = usePagination(
    (page, pageSize) =>
      queryVideoList({
        page,
        pageSize,
      }),
    {
      initialData: {
        total: 0,
        list: [],
      },
      initialPage: 1,
      initialPageSize: 100,
      append: true,
      preloadPreviousPage: false,
      preloadNextPage: false,
    }
  )

  useEffect(() => {
    let size = 3
    switch (true) {
      case listType === 'list':
        size = 1
        break
      case width < 576:
        size = 1 // XS
        break
      case width >= 576 && width < 992:
        size = 2 // SM
        break
      case width >= 992 && width < 1400:
        size = 3 // LG
        break
      case width >= 1400 && width < 1600:
        size = 4 // XXL
        break
      case width >= 1600:
        size = 5 // 大于1600
        break
    }
    setList(chunkArray(data, size))
  }, [data, width, listType])

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

  return (
    <div className="video-list-wrapper">
      <div className="video-list-wrapper__filter">
        <Swiper
          slidesPerView="auto"
          freeMode={true}
          navigation={{
            prevEl: '.icon-left',
            nextEl: '.icon-right',
            disabledClass: 'hide',
          }}
          modules={[Navigation]}
        >
          {tagsData.map((tag) => (
            <SwiperSlide key={tag} style={{ width: 'auto' }}>
              <Tag.CheckableTag checked={tag === selectedTag} onChange={(checked) => handleChange(tag, checked)}>
                {tag}
              </Tag.CheckableTag>
            </SwiperSlide>
          ))}
          <div className="icon-left">
            <Icon name="LeftIcon" />
          </div>
          <div className="icon-right">
            <Icon name="RightIcon" />
          </div>
        </Swiper>
      </div>
      <div className="video-list-wrapper__sort">
        <Checkbox className="checkbox-video" indeterminate={indeterminate} onChange={onSelectAll}>
          All Videos {total} total
        </Checkbox>
        <div>
          {checkedList.length > 0 && (
            <Button className="btn del-button" icon={<Icon name={'DeleteIcon'} />} iconPosition="end" type="text">
              Delete
            </Button>
          )}
          <Button className="btn sort-btn" icon={<Icon name={'ArrowDown'} />} iconPosition="end" type="text">
            Upload Date
          </Button>
          <Button className="btn change-btn" icon={<Icon name={listType ? 'CardIcon' : 'ListIcon'} />} type="text" onClick={switchList} />
        </div>
      </div>
      <div ref={listRef} className="video-list-wrapper__content">
        <VirtualList
          data={list}
          estimateSize={200}
          wrapper={({ children, ...rest }) => (
            <CheckboxGroup {...rest} value={checkedList} onChange={onSelectVideo}>
              {children}
            </CheckboxGroup>
          )}
          itemContent={({ rowData, measureElement, ...rest }) => (
            <div ref={measureElement} {...rest} className={`video-list ${listType}`}>
              {rowData.map((item, i) => (
                <div key={i} className="video-item" draggable onDragStart={onDragStart}>
                  <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
                    <div className="video-cover__mask text">{item.date}</div>
                    <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
                  </div>
                  <div className="video-name ellipsis-2-lines">{item.name}</div>
                  {listType === 'list' && <div className="text">{item.date}</div>}
                  <div className="video-date">Aug 12 2024</div>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      {checkedList.length > 0 && (
        <div className="video-list-wrapper__action">
          <Button className="btn start-btn">Start a new conversation</Button>
        </div>
      )}
    </div>
  )
}
export default List
