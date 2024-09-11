import { useState } from 'react'
import { Tag, Checkbox, Row, Col, Button } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { ArrowDownOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Icon from '@/components/icon'
import './style/search-list.scss'

const tagsData = ['All', 'Football', 'Baseball', 'Swimming', 'Badminton']
export default function VideoList() {
  const [selectedTag, setSelectedTags] = useState('All')
  const handleChange = (tag, checked) => {
    const nextSelectedTag = checked ? tag : 'All'
    setSelectedTags(nextSelectedTag)
  }

  return (
    <div className="video-list">
      <div className="video-list__sort">
        <Checkbox>全部视频 共28个</Checkbox>
        <div className="sort">
          <Button icon={<ArrowDownOutlined />} iconPosition="end" type="text">
            Upload Date
          </Button>
          <Button icon={<UnorderedListOutlined />} type="text" />
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
            <Col span={24} key={i}>
              <div className="list-item">
                <div className="video-cover" style={{ background: 'url(1.png) lightgray 50% / cover no-repeat' }}>
                  <div className="video-cover__mask text">04:59</div>
                </div>
                <div className="video-info">
                  <div>
                    <div className="video-name">Video name Video name Video name Video name Video name Video name Video name</div>
                    <div className="video-date">Aug 12 2024</div>
                  </div>
                  <div>
                    <Button icon={<Icon name="NewChatIcon" />} type="text" />
                    <Button icon={<Icon name="DownloadIcon" />} type="text" />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </OverlayScrollbarsComponent>
    </div>
  )
}
