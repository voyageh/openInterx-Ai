import Http from '@/utils/http'

const http = new Http('https://apifoxmock.com/m1/5110074-4772873-default')

const context = require.context('./', false, /\.js$/)
let services = null

services = context
  .keys()
  .filter((key) => key !== './index.js')
  .reduce(
    (result, key) => ({
      ...result,
      [key.match(/([^/]+)\.js$/)[1]]: context(key).default(http),
    }),
    {}
  )

export default services
