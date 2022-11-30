export interface ISong {
  [propsName: string]: any
  songName?: string
  songId?: string
  songAlias?: string
  songArtists?: string
  picUrl?: string
  albumName?: string
  albumId?: string
  fee?: number
}

export interface IPlayList {
  [propsName: string]: any
  playListId?: string
  playListName?: string
  playListDesc?: string
  picUrl?: string
  playCount?: number
  createTime?: string
  creator?: string
}
