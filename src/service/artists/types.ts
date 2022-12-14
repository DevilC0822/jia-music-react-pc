export interface IGetTopArtists {
  limit?: number // 返回数量 , 默认为 30
  offset?: number // 偏移数量 用于分页
}
export interface IArtistsAllSong {
  id: string
  limit?: number // 返回数量 , 默认为 30
  offset?: number // 偏移数量 用于分页
  order?: string // 'hot' ,'time' 按照热门或者时间排序
}
