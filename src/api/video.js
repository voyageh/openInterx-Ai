export default function (http) {
  return {
    queryVideoList: (params) => {
      return http.request('/api/videos', {
        params,
        baseURL: 'https://apifoxmock.com/m1/5110074-4772873-default',
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
