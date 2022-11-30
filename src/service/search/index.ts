import service from '@/service'
import type * as T from './types'

// 搜索歌曲
export const search = (params: T.ISearch) => {
  return service.post('/cloudsearch', params, {
    needLoadingBar: true
  })
}

// 默认搜索关键词
export const getDefaultSearchKeywords = () => {
  return service.post('/search/default')
}

// 热搜列表(详细)
export const hotSearchKeywordsList = () => {
  return service.post('/search/hot/detail')
}

export default {
  search,
  getDefaultSearchKeywords,
  hotSearchKeywordsList,
}
