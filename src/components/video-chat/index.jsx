import { useState, useRef, lazy, startTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input, Select, Button, AutoComplete } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Icon from '@/components/icon'
import ChatWindow from '@/components/chat'
import Upload from '@/components/upload'
import VideoModal from '@/components/video-player/modal'

import './style/index.scss'

const { Option } = Select
const VideoList = lazy(() => import('./video-list'))
const SearchList = lazy(() => import('./search-list'))
export default function MyVideo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [value, setValue] = useState(q)
  const [options, setOptions] = useState([])
  const uploadRef = useRef(null)
  const [flag, setFlag] = useState(false)
  const videoRef = useRef(null)

  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : [
            {
              value,
            },
            {
              value: value + value,
            },
            {
              value: value + value + value,
            },
          ]
    )
  }
  const onSelect = (data) => {
    startTransition(() => {
      setFlag(true)
    })
  }

  const onChange = (data) => {
    setValue(data)
  }

  const playVieo = () => {
    videoRef.current.open('https://www.youtube.com/watch?v=jNgP6d9HraI')
  }

  return (
    <div className="video-wrapper">
      <div className="video-wrapper__list">
        <div className="video-wrapper__list__search">
          <div className={`search-input ${value ? '' : 'fix'}`}>
            <AutoComplete
              popupClassName="input-sug-popup"
              value={value}
              options={options}
              onSearch={handleSearch}
              onChange={onChange}
              onSelect={onSelect}
              allowClear={{ clearIcon: <CloseOutlined /> }}
            >
              <Input placeholder="Search key clips" prefix={<Icon name="SearchIcon" className="search-icon" />} />
            </AutoComplete>
            {!value && (
              <Select defaultValue="1">
                <Option value="1">KeyClips</Option>
                <Option value="2">Global</Option>
              </Select>
            )}
          </div>
          <Button icon={<Icon name="AddVideo" />} type="text" onClick={() => uploadRef.current.open()} />
          <Upload ref={uploadRef} />
        </div>
        <div className="video-wrapper__list__content">{flag ? <SearchList playVieo={playVieo} /> : <VideoList playVieo={playVieo} />}</div>
        <VideoModal ref={videoRef} />
      </div>
      <div className="video-wrapper__chat">
        <ChatWindow />
      </div>
    </div>
  )
}
