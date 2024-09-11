import { createBrowserRouter } from 'react-router-dom'
import Root from '@/pages/root'
import ErrorPage from '@/pages/error-page'
import MyVideo, { loader } from '@/pages/my-video'
import SampleVideo from '@/pages/sample-video'
import Login from '@/pages/login'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SampleVideo />,
      },
      {
        path: '/my-video',
        element: <MyVideo />,
        loader: loader,
      },
      {
        path: '/sample-video',
        element: <SampleVideo />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
