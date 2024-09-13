import { useState, useRef, useEffect } from 'react'
import { Tag, Checkbox, Button, Row, Col } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import Icon from '@/components/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

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

  const onDragStart = (e) => {
    const data = { name: 'video-name' }
    e.dataTransfer.setData('application/json', JSON.stringify(data))
  }

  const [checkedList, setCheckedList] = useState([])
  const indeterminate = checkedList.length > 0 && checkedList.length < 11

  const onSelectVideo = (v) => {
    setCheckedList(v)
  }

  const onSelectAll = (e) => {
    setCheckedList(e.target.checked ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [])
  }

  return (
    <div className="video-list-wrapper">
      <div className="video-list-wrapper__filter">
        <Swiper
          slidesPerView="auto"
          freeMode={true}
          spaceBetween={10}
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
          <Button className="sort-btn" icon={<Icon name={'ListIcon'} />} type="text" />
        </div>
      </div>
      <OverlayScrollbarsComponent
        defer
        options={{ overflow: { x: 'hidden' }, scrollbars: { autoHide: 'leave', autoHideDelay: 200 } }}
        className="video-list-wrapper__content"
      >
        <Checkbox.Group value={checkedList} onChange={onSelectVideo}>
          <Row className="video-list">
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
                <div className="video-name">Video name Video name Video name Video name</div>
                <div className="video-date">Aug 12 2024</div>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
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
