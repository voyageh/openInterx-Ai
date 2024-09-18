import { useState, useRef, useEffect } from 'react'
import { Tag, Checkbox, Button } from 'antd'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import Icon from '@/components/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import List2 from './list'

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

  const onSelectVideo = (v) => {
    setCheckedList(v)
  }

  const onSelectAll = (e) => {
    setCheckedList(e.target.checked ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [])
  }

  const [listType, setListType] = useState('')
  const switchList = () => {
    setListType(listType === '' ? 'list' : '')
  }

  const [data, setData] = useState([])

  const loadMoreData = () => {
    fetch('https://apifoxmock.com/m1/5110074-4772873-default/api/videos?page=1&pageSize=100')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data.list])
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

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
          <Button className="sort-btn" icon={<Icon name={listType ? 'CardIcon' : 'ListIcon'} />} type="text" onClick={switchList} />
        </div>
      </div>
      <List2 data={data} type={listType} />
      {checkedList.length > 0 && (
        <div className="video-list-wrapper__action">
          <Button className="btn start-btn">Start Conversation</Button>
          <Button className="btn del-btn">Delete</Button>
        </div>
      )}
    </div>
  )
}
