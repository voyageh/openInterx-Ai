import { useState, useRef, useEffect } from 'react'
import { Tag, Checkbox, Button, Row, Col, Skeleton, Divider } from 'antd'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import OverlayScrollbarsComponent from '@/components/OverlayScrollbarsComponent'
import Icon from '@/components/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import InfiniteScroll from 'react-infinite-scroll-component'

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
    img.src = 'kkk.svg'
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
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
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
      {/* <OverlayScrollbarsComponent
        className="video-list-wrapper__content"
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
      >
        <Checkbox.Group value={checkedList} onChange={onSelectVideo}>
          <Row className="video-card">
            {Array.from({
              length: 11,
            }).map((_, i) => (
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
                <div className="video-cover" style={{ background: 'url(1.png) lightgray 50% / cover no-repeat' }}>
                  <div className="video-cover__mask text">04:59</div>
                  <Checkbox className="checkbox-video cover-checkbox" value={i} />
                </div>
                <div className="video-name ellipsis-2-lines">Video name Video name Video name Video name</div>
                <div className="video-date">Aug 12 2024</div>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </OverlayScrollbarsComponent> */}
      <OverlayScrollbarsComponent contentId="scrollableDiv" className="video-list-wrapper__content">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <Checkbox.Group value={checkedList} onChange={onSelectVideo}>
            <Row className="video-card">
              {data.map((_, i) => (
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
                  <div className="video-cover" style={{ background: 'url(1.png) lightgray 50% / cover no-repeat' }}>
                    <div className="video-cover__mask text">04:59</div>
                    <Checkbox className="checkbox-video cover-checkbox" value={i} />
                  </div>
                  <div className="video-name ellipsis-2-lines">Video name Video name Video name Video name</div>
                  <div className="video-date">Aug 12 2024</div>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </InfiniteScroll>
      </OverlayScrollbarsComponent>
      {checkedList.length > 0 && (
        <div className="video-list-wrapper__action">
          <Button className="btn start-btn">Start Conversation</Button>
          <Button className="btn del-btn">Delete</Button>
        </div>
      )}
    </div>
  )
}
