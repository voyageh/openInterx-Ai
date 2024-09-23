export default function (http) {
  return {
    login: (params) => {
      return http.request('/auth/customer/login', {
        params,
      })
    },
    loginout: (params) => {
      return http.request('/auth/customer/loginOut', {
        params,
      })
    },
  }
}
