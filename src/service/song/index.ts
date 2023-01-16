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

// 获取喜欢的音乐列表
export const getLikeSongList = (params: { uid: string }) => {
  return service.post('/likelist')
}

// 获取喜欢的音乐列表
export const likeSong = (params: { id: string; like?: boolean }) => {
  return service.post('/like')
}

export default {
  getSongDetail,
  getRecommendNewSong,
  getTodayRecommendSong,
  getLikeSongList,
  likeSong,
}
