export default function (http) {
  return {
    queryVideoList: (params) => {
      return http.request('/api/videos', {
        params,
      })
    },
    upload: (data) => {
      return http.request('/serve/video/upload', {
        data,
        method: 'post',
        contentType: 'multipart/form-data',
      })
    },
  }
}
