import { useRef, useReducer, useCallback, useEffect, useState, memo, useMemo } from 'react'
import { Input, Select, Button, AutoComplete, Tag, Checkbox, Modal, Tooltip, Skeleton, Col } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Icon from '@/components/icon'
import { useResizeDetector } from 'react-resize-detector'
import VirtualList from '@/components/virtual-list'
import { useQuery } from '@tanstack/react-query'
import { useUniversalStore } from '@/store/universal'
import Upload from '@/components/upload'
import VideoModal from '@/components/video-player/modal'
import Apis from '@/api'

import 'swiper/css'
import './style/video-list.scss'

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

const calcSize = (width, type) => {
  let size = 3
  switch (true) {
    case width < 330 || type === 'list':
      size = 1
      break
    case width < 660:
      size = 2
      break
    case width < 990:
      size = 3
      break
    default:
      size = 4
  }
  return size
}

const initialState = {
  value: '',
  options: [],
  selectedTag: 'All',
  width: 0,
  size: 3,
  span: 0,
  checkedList: [],
  listType: '',
  showDel: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return { ...state, value: action.payload }
    case 'setOptions':
      return { ...state, options: action.payload }
    case 'setSelectedTags':
      return { ...state, selectedTag: action.payload }
    case 'setWidth':
      return { ...state, ...action.payload }
    case 'setCheckedList':
      return { ...state, checkedList: action.payload }
    case 'setListType':
      let listType = state.listType === '' ? 'list' : ''
      const size = calcSize(state.width, listType)
      const span = 24 / size
      return { ...state, listType, size, span }
    case 'setShowDel':
      return { ...state, showDel: action.payload }
    default:
      return state
  }
}

const VideoList = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const uploadRef = useRef(null)
  const videoRef = useRef(null)

  const handleSearch = (value) => {
    dispatch({ type: 'setOptions', payload: [] })
  }
  const onSelect = (v) => {}

  const onChange = (v) => {
    dispatch({ type: 'setValue', payload: v })
  }

  const openUploadModal = () => {
    uploadRef.current.open()
  }

  const handleSelectTag = (tag, checked) => {
    const nextSelectedTag = checked ? tag : 'All'
    dispatch({ type: 'setSelectedTags', payload: nextSelectedTag })
  }

  const selectLen = state.checkedList.length

  const indeterminate = selectLen > 0 && selectLen < 11

  const onSelectVideo = (v) => {
    dispatch({ type: 'setCheckedList', payload: v })
  }

  const onSelectAll = (e) => {
    dispatch({
      type: 'setCheckedList',
      payload: e.target.checked ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [],
    })
  }

  const switchList = () => {
    dispatch({ type: 'setListType' })
  }

  const { isFetching, data } = useQuery({
    queryKey: ['video'],
    queryFn: () => Apis.video.queryVideoList({ page: 1, pageSize: 100 }),
    initialData: {
      list: [],
      total: 0,
    },
    initialDataUpdatedAt: 0,
    staleTime: 60 * 1000,
  })

  const onResize = useCallback(({ width }) => {
    console.log(width)

    const size = calcSize(width, state.listType)
    const span = 24 / size
    dispatch({ type: 'setWidth', payload: { width, size, span } })
  }, [])

  const { ref: listRef } = useResizeDetector({
    handleHeight: false,
    onResize,
  })

  const setDrag = useUniversalStore((state) => state.setDrag)

  const onDragStart = (e) => {
    const dragPreview = document.createElement('div')
    dragPreview.classList.add('drag-preview')
    const img = document.createElement('img')
    img.src = '1.png'
    dragPreview.appendChild(img)
    const span = document.createElement('span')
    span.classList.add('count')
    span.innerText = state.checkedList.length || 1
    dragPreview.appendChild(span)

    document.body.appendChild(dragPreview)
    e.dataTransfer.setDragImage(dragPreview, 30, 30)
    e.dataTransfer.setData('application/json', JSON.stringify(data))
    setDrag('start')

    setTimeout(() => {
      document.body.removeChild(dragPreview)
    }, 0)
  }

  const onDragEnd = (e) => {
    e.preventDefault()
    setDrag('')
  }

  const openDelModal = () => {
    dispatch({ type: 'setShowDel', payload: true })
  }

  const closeDelModal = () => {
    dispatch({ type: 'setShowDel', payload: false })
  }

  return (
    <div className="video-list">
      <div className="video-list__search">
        <div className={`search-input ${state.value ? '' : 'fix'}`}>
          <AutoComplete
            popupClassName="input-sug-popup"
            value={state.value}
            options={state.options}
            onSearch={handleSearch}
            onChange={onChange}
            onSelect={onSelect}
            allowClear={{ clearIcon: <Icon name="CloseIcon" /> }}
          >
            <Input placeholder="Search key clips" prefix={<Icon name="SearchIcon" />} />
          </AutoComplete>
          {!state.value && (
            <Select defaultValue="1">
              <Select.Option value="1">KeyClips</Select.Option>
              <Select.Option value="2">Global</Select.Option>
            </Select>
          )}
        </div>
        <Tooltip title="upload">
          <Button className="upload-btn" icon={<Icon name="AddVideo" />} type="text" onClick={openUploadModal} />
        </Tooltip>
      </div>
      <div className="video-list__filter">
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
              <Tag.CheckableTag checked={tag === state.selectedTag} onChange={(checked) => handleSelectTag(tag, checked)}>
                {tag}
              </Tag.CheckableTag>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="icon-left">
          <div>
            <Tooltip title="Previous" placement="bottom">
              <Button icon={<Icon name="LeftIcon" />} type="text" />
            </Tooltip>
          </div>
        </div>
        <div className="icon-right">
          <div>
            <Tooltip title="Next" placement="bottom">
              <Button icon={<Icon name="RightIcon" />} type="text" />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="video-list__sort">
        <Checkbox className="checkbox-video" indeterminate={indeterminate} onChange={onSelectAll}>
          All Videos {data.total} total {selectLen > 0 && <span>{selectLen} selected</span>}
        </Checkbox>
        <div>
          {selectLen > 0 && (
            <Button className="btn del-button" icon={<Icon name={'DeleteIcon'} />} iconPosition="end" type="text" onClick={openDelModal}>
              Delete
            </Button>
          )}
          <Button className="btn sort-btn" icon={<Icon name={'ArrowDown'} />} iconPosition="end" type="text">
            Upload Date
          </Button>
          <Button className="btn change-btn" icon={<Icon name={state.listType ? 'CardIcon' : 'ListIcon'} />} type="text" onClick={switchList} />
        </div>
      </div>
      <div className="video-list__content" ref={listRef}>
        <VirtualList
          size={state.size}
          loading={isFetching}
          data={data.list}
          estimateSize={220}
          rowClass={`video-row ${state.listType}`}
          wrapper={({ children, ...rest }) => (
            <CheckboxGroup {...rest} value={state.checkedList} onChange={onSelectVideo}>
              {children}
            </CheckboxGroup>
          )}
          itemContent={(item) => (
            <Col className="video-item" span={state.span} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
                <div className="video-cover__mask text">{item.duration}</div>
                <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
              </div>
              <div className="video-name ellipsis-2-lines">{item.name}</div>
              {state.listType === 'list' && <div className="text">{item.duration}</div>}
              <div className="video-date">{item.date}</div>
            </Col>
          )}
          loader={() => (
            <Col className="video-item" span={state.span}>
              <Skeleton.Avatar className="video-cover" active shape="square" />
              <Skeleton active title={false} />
            </Col>
          )}
          empty={
            <>
              <p className="text">There are no videos in the library yet, upload your video now!</p>
              <Button type="primary" onClick={openUploadModal}>
                Upload Video
              </Button>
            </>
          }
        />
      </div>

      <Upload ref={uploadRef} />

      <VideoModal ref={videoRef} />

      {selectLen > 0 && (
        <div className="video-list__action">
          <Button className="btn start-btn">Start a new conversation</Button>
        </div>
      )}

      <Modal
        classNames={{ content: 'custom-modal delete-modal' }}
        width={'30%'}
        title="Delete videos？"
        okText="Delete"
        okButtonProps={{ danger: true }}
        open={state.showDel}
        onCancel={closeDelModal}
        centered
      >
        <p>Once deleted, the video will be permanently removed and cannot be recovered.</p>
      </Modal>
    </div>
  )
}

export default VideoList
