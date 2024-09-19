import { useState } from 'react'
import { Button, Input, Empty } from 'antd'
import Icon from '@/components/icon'
import ChatItem from './chat-item'
import { useUniversalStore } from '@/store/universal'
import './style/index.scss'

const msg = [
  {
    text: 'How many houses are there in the picture?',
    isMine: true,
  },
  {
    text: 'There are three houses in the picture.',
    isMine: false,
  },
  {
    text: 'Find a video about footballFind a video about footballFind a video about footballFind a video about footballFind a video about footballFind a video about football',
    isMine: true,
  },
]
export default function ChatWindow() {
  const [show, setShow] = useState(false)
  const [selecteds, setSelecteds] = useState([])
  const [drag, setDrag] = useUniversalStore((state) => [state.drag, state.setDrag])

  const onDragLeave = (e) => {
    e.preventDefault()
    console.log('leave')
    setDrag('start')
  }
  const onDragOver = (e) => {
    e.preventDefault()
    setDrag('enter')
  }

  const onDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/json')
    const obj = JSON.parse(data)
    setSelecteds([...selecteds, {}])
    setDrag('')
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="selected-video">
          <div className="selected-video__count" onClick={() => setShow(!show)}>
            <span className="text">{selecteds.length} videos</span> <Icon name="DownIcon" />
          </div>
          <div className={`selected-video__list ${show ? 'show' : ''}`}>
            {selecteds.map((item, index) => (
              <div className="selected-video__list__item" key={index}>
                <div className="cover" style={{ background: 'url(2.png) lightgray 50% / cover no-repeat' }} />
                <div className="name ellipsis-2-lines">Video name Video name Video name Video nameVideo name</div>
              </div>
            ))}
            {selecteds.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </div>
        </div>
        <div className="chat-title">
          <Input variant="borderless" defaultValue="Unnamed session" />
        </div>
        <div className="chat-icon">
          <Button icon={<Icon name="NewChatIcon" />} type="text" />
        </div>
      </div>
      <div className="chat-content">
        {msg.map((item, index) => (
          <ChatItem key={index} {...item} />
        ))}
      </div>
      <div className="chat-footer">
        <Input
          className="chat-input"
          placeholder="Paste video link here to upload quickly"
          prefix={<Icon name="Attachment" className="attachment-icon" />}
          suffix={<Icon name="SendIcon" className="send-icon" />}
        />
      </div>
      <div className={`chat-drag ${drag}`} onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
        <div className="drag-text">Drag the video here</div>
        <div className="drag-tips">Please drag the video into this area. A new conversation will begin once the drag is complete</div>
      </div>
    </div>
  )
}
