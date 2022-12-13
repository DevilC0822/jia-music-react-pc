export interface IPlayListCategory {
  cat?: string
  limit?: number // 返回数量 , 默认为 30
  offset?: number // 偏移数量 用于分页
  order?: string // 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
}

export interface IPlayListDetail {
  id: string
  s?: number // 歌单最近的 s 个收藏者,默认为 8
}

export interface IAllSongByPlayList {
  id: string
  limit?: number // 返回数量 , 默认为 30
  offset?: number // 偏移数量 用于分页
}
