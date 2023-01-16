import service from '@/service'
import type * as T from './types'

// 获取热门歌手
export const getTopArtists = (params: T.IGetTopArtists | undefined) => {
  return service.post('/top/artists', params)
}

// 获取歌手详情
export const getArtistsDetail = (params: { id: string }) => {
  return service.post('/artist/detail', params)
}

// 获取相似歌手
export const getSimiArtists = (params: { id: string }) => {
  return service.post('/simi/artist', params)
}

// 获取歌手全部歌曲
export const getArtistsAllSong = (params: T.IArtistsAllSong) => {
  return service.post('/artist/songs', params, {
    needLoadingBar: true,
  })
}

export default {
  getTopArtists,
  getArtistsDetail,
  getSimiArtists,
  getArtistsAllSong,
}
