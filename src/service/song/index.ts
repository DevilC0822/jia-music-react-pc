import service from '@/service'
// import type * as T from './types'

// 搜索歌曲
export const getSongDetail = (params: { ids: string }) => {
  return service.post('/song/detail', params)
}

export default {
  getSongDetail,
}
