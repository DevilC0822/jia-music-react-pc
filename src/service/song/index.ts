import service from '@/service'
// import type * as T from './types'

// 获取歌曲详情
export const getSongDetail = (params: { ids: string }) => {
  return service.post('/song/detail', params)
}

// 获取推荐歌曲
export const getRecommendNewSong = (params: { limit?: number }) => {
  return service.post('/personalized/newsong', params)
}

// 获取每日推荐歌曲(需登录)
export const getTodayRecommendSong = () => {
  return service.post('/recommend/songs')
}

export default {
  getSongDetail,
  getRecommendNewSong,
  getTodayRecommendSong,
}
