import { useLoaderData } from 'react-router-dom'
import VideoChat from '@/components/video-chat'
import { useEffect,useState } from 'react'

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || ''
  console.log('loader', q, type)

  return fetch('https://apifoxmock.com/m1/5110074-4772873-default/api/video/my')
}

export default function MyVideo() {
  const [searchParams, setSearchParams] = useState({})
  console.log(1234);
  

  return <VideoChat />
}
