
export default function (http) {
  return {
    queryVideoList: (params) => {            
      return http.request('/api/videos', {
        params,
      })
    },
  }
}
