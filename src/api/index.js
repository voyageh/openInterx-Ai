import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import reactHook from 'alova/react'
import { createApis, withConfigType } from './createApis'
import { message } from 'antd'

export const alovaInstance = createAlova({
  baseURL: '/api',
  statesHook: reactHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: (method) => {},
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        message.open({
          type: 'error',
          content: response.statusText,
        })
        return
      }

      const json = await response.json()
      if (json.code !== 0) {
        message.open({
          type: 'error',
          content: json.message,
        })
      }
      return json.data
    },
  },
})

export const $$userConfigMap = withConfigType({})

/**
 * @type { Apis }
 */
const Apis = createApis(alovaInstance, $$userConfigMap)

export default Apis
