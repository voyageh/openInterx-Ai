import Http from '@/utils/http'

const http = new Http('/api')

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
