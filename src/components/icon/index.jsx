import clsx from 'clsx'
import Logo from '@/assets/images/root/logo.svg'
import MyVideo from '@/assets/images/root/my-video.svg'
import SampleVideo from '@/assets/images/root/sample-video.svg'
import LightIcon from '@/assets/images/root/light.svg'
import DarkIcon from '@/assets/images/root/dark.svg'
import SearchIcon from '@/assets/images/search.svg'
import AddVideo from '@/assets/images/add-video.svg'
import DownArrowIcon from '@/assets/images/chat/arrow-down.svg'
import UpArrowIcon from '@/assets/images/chat/arrow-up.svg'
import NewChatIcon from '@/assets/images/chat/new-chat.svg'
import SendIcon from '@/assets/images/chat/send.svg'
import DownloadIcon from '@/assets/images/download.svg'
import Attachment from '@/assets/images/attachment.svg'
import './index.scss'

export const Icon = ({ name, className, ...props }) => {
  const icons = {
    Logo,
    DownArrowIcon,
    UpArrowIcon,
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
  }
  const Icon = icons[name]
  return (
    <span className={clsx('icon-wrapper', className)} {...props}>
      <Icon />
    </span>
  )
}
export default Icon
