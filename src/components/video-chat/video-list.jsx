import { useState, useRef, useEffect } from 'react'
import { Tag, Checkbox, Button, Row, Col, Skeleton, Divider } from 'antd'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import Icon from '@/components/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import List from '@/components/virtual-list'
import { chunkArray } from '@/utils/array'
import kk from '@/assets/images/kkk.svg?url'

import 'swiper/css'
import './style/video-list.scss'

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

export default function VideoList({ playVieo }) {
  const [selectedTag, setSelectedTags] = useState('All')
  const handleChange = (tag, checked) => {
    const nextSelectedTag = checked ? tag : 'All'
    setSelectedTags(nextSelectedTag)
  }

  const [checkedList, setCheckedList] = useState([]) //选中视频
  const indeterminate = checkedList.length > 0 && checkedList.length < 11

  const onDragStart = (e) => {
    const dragPreview = document.createElement('div')
    dragPreview.classList.add('drag-preview')
    const img = document.createElement('img')
    img.src = kk
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

  const onSelectVideo = (v) => {
    setCheckedList(v)
  }

  const onSelectAll = (e) => {
    setCheckedList(e.target.checked ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [])
  }

  const switchList = () => {
    console.log('switchList')
  }

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://apifoxmock.com/m1/5110074-4772873-default/api/videos?page=1&pageSize=100')
      .then((res) => res.json())
      .then((body) => {
        const list = body.data.list
        setData([...data, ...chunkArray(list, 3)])

        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  const rootRef = useRef(null)
  const [initialize] = useOverlayScrollbars({ defer: true })

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
          All Videos 28 total
        </Checkbox>
        <div>
          <Button className="sort-btn" icon={<Icon name={'ArrowDown'} />} iconPosition="end" type="text">
            Upload Date
          </Button>
          <Button className="sort-btn" icon={<Icon name={'ListIcon'} />} type="text" onClick={switchList} />
        </div>
      </div>
      <List className="overlayscrollbars video-list-wrapper__content" total={data.length}>
        {(index) =>
          data[index].map((item, i) => (
            <Col
              key={i}
              className="video-item"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 8 }}
              draggable
              onDragStart={onDragStart}
            >
              <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
                <div className="video-cover__mask text">{item.date}</div>
                <Checkbox className="checkbox-video cover-checkbox" onChange={onSelectVideo} />
              </div>
              <div className="video-name ellipsis-2-lines">{item.name}</div>
              <div className="video-date">Aug 12 2024</div>
            </Col>
          ))
        }
      </List>
      {checkedList.length > 0 && (
        <div className="video-list-wrapper__action">
          <Button className="btn start-btn">Start Conversation</Button>
          <Button className="btn del-btn">Delete</Button>
        </div>
      )}
    </div>
  )
}
