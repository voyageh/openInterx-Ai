export default function (http) {
  return {
    login: (params) => {
      return http.request('/auth/customer/login', {
        params,
      })
    },
    getUser: () => {
      return http.request('/auth/customer/getCustomerInfo')
    },
    loginout: (params) => {
      return http.request('/auth/customer/loginOut', {
        params,
      })
    },
  }
}
