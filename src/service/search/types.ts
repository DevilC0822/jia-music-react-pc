export interface ISearch {
  keywords: string
  limit?: number // 返回数量 , 默认为 30
  offset?: number // 偏移数量 用于分页
  type?: number // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
}
