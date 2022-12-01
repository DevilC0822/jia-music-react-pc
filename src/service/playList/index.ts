import service from '@/service'
// import type * as T from './types'

// 获取推荐歌单
export const getRecommendPlayList = (params: { limit?: number }) => {
  return service.post('/personalized', params)
}

// 获取每日推荐歌单(需登录)
export const getTodayRecommendPlayList = () => {
  return service.post('/recommend/resource')
}

export default {
  getRecommendPlayList,
  getTodayRecommendPlayList,
}
