export interface ISong {
  [propsName: string]: any
  songName?: string
  id?: string
  songAlias?: string
  songArtists?: string
  picUrl?: string
  albumName?: string
  albumId?: string
  fee?: number
}

export interface IArtists {
  [propsName: string]: any
  artistsName?: string
  id?: string
  picUrl?: string
}

export interface IPlayList {
  [propsName: string]: any
  id?: string
  playListName?: string
  playListDesc?: string
  picUrl?: string
  playCount?: number
  createTime?: string
  creator?: string
}

export interface IPlayListDetail extends IPlayList {
  song?: ISong[]
  tags?: String[]
  createTime?: string
  updateTime?: string
  creatorObj?: { nickName?: string; id?: string }
  subscribed?: boolean
  songNum?: number
}
