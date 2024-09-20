import { createAlova } from 'alova'
import reactHook from 'alova/react'
import adapterFetch from 'alova/fetch'
import { message } from 'antd'

export const alova = createAlova({
  baseURL: 'https://apifoxmock.com/m1/5110074-4772873-default',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
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
