import service from '@/service'
import type * as T from './types'

// 获取热门歌手
export const getTopArtists = (params: T.IGetTopArtists | undefined) => {
  return service.post('/top/artists', params)
}

export default {
  getTopArtists,
}
