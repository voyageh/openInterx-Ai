import { useState, useRef } from 'react'
import { Tag, Checkbox, Row, Col, Button } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { ArrowDownOutlined, UnorderedListOutlined } from '@ant-design/icons'
import './style/video-list.scss'

const tagsData = ['All', 'Football', 'Baseball', 'Swimming', 'Badminton']
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

  return (
    <div className="video-list">
      <div className="video-list__filter">
        {tagsData.map((tag) => (
          <Tag.CheckableTag key={tag} checked={tag === selectedTag} onChange={(checked) => handleChange(tag, checked)}>
            {tag}
          </Tag.CheckableTag>
        ))}
      </div>
      <div className="video-list__sort">
        <Checkbox className="all-box">All Videos 28 total</Checkbox>
        <div>
          <Button className="sort-btn" icon={<ArrowDownOutlined />} iconPosition="end" type="text">
            Upload Date
          </Button>
          <Button className="sort-btn" icon={<UnorderedListOutlined />} type="text" />
        </div>
      </div>
      <OverlayScrollbarsComponent
        defer
        options={{ overflow: { x: 'hidden' }, scrollbars: { autoHide: 'leave', autoHideDelay: 200 } }}
        className="video-list__content"
      >
        <Row gutter={16}>
          {Array.from({
            length: 17,
          }).map((_, i) => (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }} xxl={{ span: 6 }} key={i}>
              <div className="list-item" onClick={() => playVieo()} draggable onDragStart={onDragStart}>
                <div className="video-cover" style={{ background: 'url(1.png) lightgray 50% / cover no-repeat' }}>
                  <div className="video-cover__mask text">04:59</div>
                </div>
                <div className="video-name">Video name Video name Video name Video name</div>
                <div className="video-date">Aug 12 2024</div>
              </div>
            </Col>
          ))}
        </Row>
      </OverlayScrollbarsComponent>
    </div>
  )
}
