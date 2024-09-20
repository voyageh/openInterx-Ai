import { alova } from '.'
export const queryVideoList = (params) => {
  return alova.Get('/api/videos', {
    params,
  })
}
