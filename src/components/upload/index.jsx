import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Tabs, Upload, Button, Input } from 'antd'
import urlIcon from '@/assets/images/url.svg'
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
      classNames={{ header: 'upload-modal-header', body: 'upload-modal-body', footer: 'upload-modal-footer' }}
      width={780}
      title="Upload Video"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="back">Cancel</Button>,
        <Button key="submit" className="upload-btn">
          Upload
        </Button>,
      ]}
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
            <Input placeholder="Paste your url link here" prefix={<img src={urlIcon} />} />
            <span className="upload-tips">If there was an error downloading the video, please try again. Each analysis time varies from 1-10s</span>
          </div>
        )}
      </div>
    </Modal>
  )
})
