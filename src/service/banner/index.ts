import service from '@/service'
import type * as T from './types'

// 获取首页banner
const getBanner = (params: T.IBanner) => {
  return service.post('/banner', params)
}

export default {
  getBanner,
}
