import { useLoaderData } from 'react-router-dom'
import VideoChat from '@/components/video-chat'
export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || ''
  console.log('loader', q, type)

  return {}
}

export default function MyVideo() {
  // const start = Date.now()
  // while (Date.now() - start < 2000) {
  //   // 这里是阻塞的空循环
  // }
  return <VideoChat />
}
