import service from '@/service'
import type * as T from './types'

// 获取推荐歌单
export const getRecommendPlayList = (params: { limit?: number }) => {
  return service.post('/personalized', params, {
    needLoadingBar: true,
  })
}

// 获取每日推荐歌单(需登录)
export const getTodayRecommendPlayList = () => {
  return service.post('/recommend/resource')
}

// 获取歌单分类
export const getPlayListCategory = () => {
  return service.post('/playlist/catlist')
}

// 获取网友精选碟歌单
export const getPlayListByCategory = (params: T.IPlayListCategory) => {
  return service.post('/top/playlist', params, {
    needLoadingBar: true,
  })
}

export default {
  getRecommendPlayList,
  getTodayRecommendPlayList,
  getPlayListCategory,
  getPlayListByCategory,
}
