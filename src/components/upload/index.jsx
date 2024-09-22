import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Tabs, Upload, Button, Input } from 'antd'
import Icon from '@/components/icon'
import './index.scss'

const { Dragger } = Upload

export default forwardRef(function Upload(_, ref) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('1')

  const onChange = (key) => {
    setTab(key)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setOpen(true),
        close: () => setOpen(false),
      }
    },
    []
  )

  return (
    <Modal
      classNames={{ content: 'custom-modal upload-modal' }}
      width={'42%'}
      title="Upload Video"
      okText="Upload"
      centered
      open={open}
      onCancel={() => setOpen(false)}
    >
      <Tabs
        activeKey={tab}
        centered
        onChange={onChange}
        items={[
          { label: 'Local Upload', key: '1' },
          { label: 'Upload via URL', key: '2' },
        ]}
      />
      <div className="upload-content">
        {tab === '1' ? (
          <Dragger>
            <div className="upload-text">Drag the video file here or click to browse the local file</div>
            <div className="upload-tips">Ultrices odio tempus adipiscing ornare euismod posuere vitae etiam tempor.</div>
            <div className="upload-tips">Please upload no more than 2 gigabytes of video</div>
          </Dragger>
        ) : (
          <div>
            <Input className="url-input" size="large" placeholder="Paste your url link here" prefix={<Icon name="UrlIcon" />} />
            <span className="upload-tips">If there was an error downloading the video, please try again. Each analysis time varies from 1-10s</span>
          </div>
        )}
      </div>
    </Modal>
  )
})
