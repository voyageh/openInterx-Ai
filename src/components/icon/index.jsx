import { forwardRef } from 'react'
import clsx from 'clsx'
import Logo from '@/assets/images/root/logo.svg'
import MyVideo from '@/assets/images/root/my-video.svg'
import SampleVideo from '@/assets/images/root/sample-video.svg'
import LightIcon from '@/assets/images/root/light.svg'
import DarkIcon from '@/assets/images/root/dark.svg'
import SearchIcon from '@/assets/images/search.svg'
import AddVideo from '@/assets/images/add-video.svg'
import DownIcon from '@/assets/images/chat/down.svg'
import UpIcon from '@/assets/images/chat/up.svg'
import NewChatIcon from '@/assets/images/chat/new-chat.svg'
import SendIcon from '@/assets/images/chat/send.svg'
import DownloadIcon from '@/assets/images/download.svg'
import Attachment from '@/assets/images/chat/attachment.svg'
import UrlIcon from '@/assets/images/upload/url.svg'
import ArrowDown from '@/assets/images/arrow-down.svg'
import ArrowUp from '@/assets/images/arrow-up.svg'
import ListIcon from '@/assets/images/list.svg'
import CardIcon from '@/assets/images/card.svg'
import RightIcon from '@/assets/images/right.svg'
import LeftIcon from '@/assets/images/left.svg'

import './index.scss'

export const Icon = forwardRef(({ name, className, ...props }, ref) => {
  const icons = {
    Logo,
    DownIcon,
    UpIcon,
    NewChatIcon,
    SendIcon,
    DownloadIcon,
    MyVideo,
    SampleVideo,
    SearchIcon,
    AddVideo,
    Attachment,
    light: DarkIcon,
    dark: LightIcon,
    UrlIcon,
    ArrowDown,
    ArrowUp,
    ListIcon,
    CardIcon,
    RightIcon,
    LeftIcon,
  }
  const Icon = icons[name]
  return (
    <span ref={ref} className={clsx('icon-wrapper', className)} {...props}>
      <Icon />
    </span>
  )
})
export default Icon
