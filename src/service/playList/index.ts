import service from '@/service'
// import type * as T from './types'

// 搜索歌单
export const getRecommendPlayList = (params: { limit?: number }) => {
  return service.post('/personalized', params)
}

export default {
  getRecommendPlayList,
}
