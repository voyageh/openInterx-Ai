import { useLoaderData } from 'react-router-dom'
import VideoChat from '@/components/video-chat'
import { useEffect, useState } from 'react'

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || ''
  console.log('loader', q, type)

  return {}
}

export default function MyVideo() {
  const [searchParams, setSearchParams] = useState({})
  return <VideoChat />
}
