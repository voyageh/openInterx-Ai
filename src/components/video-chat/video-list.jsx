import { useEffect, useState, useRef, useReducer } from 'react'
import { Input, Select, Button, AutoComplete, Tag, Checkbox, Modal, Tooltip } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Icon from '@/components/icon'
import { useResizeDetector } from 'react-resize-detector'
import VirtualList from '@/components/virtual-list'
import { chunkArray } from '@/utils/array'
import { usePagination } from 'alova/client'
import { queryVideoList } from '@/api222/video'
import { useUniversalStore } from '@/store/universal'
import Upload from '@/components/upload'
import VideoModal from '@/components/video-player/modal'

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

const initialState = {
  value: '',
  options: [],
  selectedTag: 'All',
  list: [],
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
    case 'setList':
      return { ...state, list: action.payload }
    case 'setCheckedList':
      return { ...state, checkedList: action.payload }
    case 'setListType':
      return { ...state, listType: state.listType === '' ? 'list' : '' }
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
  
  const handleChange = (tag, checked) => {
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

  const { width, ref: listRef } = useResizeDetector()
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
      case state.listType === 'list' || width < 380:
        size = 1
        break
      case width < 700:
        size = 2
        break
      case width < 1600:
        size = 3
        break
      case width >= 1600:
        size = 4
        break
    }
    dispatch({ type: 'setList', payload: chunkArray(data, size) })
  }, [data, width, state.listType])

  
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
            <Input placeholder="Search key clips" prefix={<Icon name="SearchIcon" className="search-icon" />} />
          </AutoComplete>
          {!state.value && (
            <Select defaultValue="1">
              <Select.Option value="1">KeyClips</Select.Option>
              <Select.Option value="2">Global</Select.Option>
            </Select>
          )}
        </div>
        <Tooltip title="upload">
          <Button className="upload-btn" icon={<Icon name="AddVideo" />} type="text" onClick={() => uploadRef.current.open()} />
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
              <Tag.CheckableTag checked={tag === state.selectedTag} onChange={(checked) => handleChange(tag, checked)}>
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
      <div className="video-list__sort">
        <Checkbox className="checkbox-video" indeterminate={indeterminate} onChange={onSelectAll}>
          All Videos {total} total {selectLen > 0 && <span>{selectLen} selected</span>}
        </Checkbox>
        <div>
          {selectLen > 0 && (
            <Button className="btn del-button" icon={<Icon name={'DeleteIcon'} />} iconPosition="end" type="text">
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
          data={state.list}
          estimateSize={200}
          wrapper={({ children, ...rest }) => (
            <CheckboxGroup {...rest} value={state.checkedList} onChange={onSelectVideo}>
              {children}
            </CheckboxGroup>
          )}
          itemContent={({ rowData, measureElement, ...rest }) => (
            <div ref={measureElement} {...rest} className={`video-row ${state.listType}`}>
              {rowData.map((item, i) => (
                <div key={i} className="video-item" draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
                  <div className="video-cover" style={{ backgroundImage: `url(${item.cover})` }}>
                    <div className="video-cover__mask text">{item.date}</div>
                    <Checkbox className="checkbox-video cover-checkbox" value={item.id} />
                  </div>
                  <div className="video-name ellipsis-2-lines">{item.name}</div>
                  {state.listType === 'list' && <div className="text">{item.date}</div>}
                  <div className="video-date">Aug 12 2024</div>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      <Upload ref={uploadRef} />

      <VideoModal ref={videoRef} />

      {selectLen > 0 && (
        <div className="video-list__action">
          <Button className="btn start-btn">Start a new conversation</Button>
        </div>
      )}

      <Modal title="Delete videos？" open={state.showDel} centered>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  )
}
export default VideoList
