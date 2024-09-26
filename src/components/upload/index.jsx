import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Tabs, Upload, Input } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import Icon from '@/components/icon'
import Apis from '@/api'

import './index.scss'

const { Dragger } = Upload

export default forwardRef(function Upload(_, ref) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('1')
  const [fileList, setFileList] = useState([])

  const onChange = (key) => {
    setTab(key)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        open: handleOpen,
        close: handleClose,
      }
    },
    []
  )

  const uploadProps = {
    showUploadList: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
    multiple: true,
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', fileList[0])
    Apis.video.upload(formData)
  }

  return (
    <Modal
      classNames={{ content: 'custom-modal upload-modal' }}
      width={'48%'}
      title="Upload Video"
      okText="Upload"
      centered
      open={open}
      onCancel={handleClose}
      onOk={handleUpload}
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
          <Dragger {...uploadProps}>
            {fileList.length === 0 ? (
              <div className="upload-tips-warpper">
                <div className="upload-tips">Drag the video file here or click to browse the local file</div>
                <div className="upload-tips-sub">Ultrices odio tempus adipiscing ornare euismod posuere vitae etiam tempor.</div>
                <div className="upload-tips-sub">Please upload no more than 2 gigabytes of video</div>
              </div>
            ) : (
              <OverlayScrollbarsComponent className="preview-list-warpper" defer>
                <div className="preview-list">
                  {fileList.map((file) => (
                    <div key={file.uid} className="preview-item">
                      <Icon name="FileIcon" />
                      <div className="file-info">
                        <div className="file-info__name">{file.name}</div>
                        <div className="file-info__size">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                      </div>
                    </div>
                  ))}
                </div>
              </OverlayScrollbarsComponent>
            )}
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
