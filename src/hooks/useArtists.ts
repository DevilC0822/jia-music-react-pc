import { useEffect, useState } from 'react'
import artistsApi from '@/service/artists'
import songApi from '@/service/song'
import { artistsShow, timestampToTime } from '@/utils'
import type * as T from '@/types'
import * as artistsType from '@/service/artists/types'

// 歌手
const useArtists = (needInit = false) => {
  const [topArtists, setTopArtists] = useState<T.ISong[]>()

  const getTopArtists = (limit: number | undefined = 5, offset: number | undefined = 0) => {
    artistsApi
      .getTopArtists({
        limit,
        offset,
      })
      .then(res => {
        const result: T.IArtists[] = []
        res.artists.forEach((i: any) => {
          result.push({
            id: i.id,
            artistsName: i.name,
            picUrl: i.img1v1Url,
          })
        })
        setTopArtists(result)
      })
  }

  const getArtistsDetail = (id: string) => {
    return new Promise(resolve => {
      artistsApi
        .getArtistsDetail({
          id,
        })
        .then(res => {
          console.log(res)
          const result: T.IArtistsDetail = {}
          result.id = res.data.artist.id
          result.artistsName = res.data.artist.name
          result.picUrl = res.data.artist.cover
          result.artistsDesc = res.data.artist.briefDesc
          result.tags = res.data.identify.imageDesc.split('、')
          result.musicSize = res.data.artist.musicSize
          result.mvSize = res.data.artist.mvSize
          result.rank = res.data.artist.rank.rank
          resolve(result)
        })
    })
  }
  const getArtistsAllSong = (param: artistsType.IArtistsAllSong) => {
    return new Promise(resolve => {
      artistsApi.getArtistsAllSong(param).then(res1 => {
        const ids = res1.songs?.map((i: { id: string }) => i.id).join(',')
        songApi.getSongDetail({ ids }).then(res2 => {
          const data: T.ISong[] = res2.songs?.map((i: any) => ({
            songName: i.name,
            songAlias: i.alia && i.alia[0],
            id: i.id,
            albumName: i.al && i.al.name,
            picUrl: i.al && i.al.picUrl,
            albumId: i.al && i.al.id,
            songArtists: artistsShow(i.ar),
            fee: i.fee,
          }))
          resolve(data)
        })
      })
    })
  }

  useEffect(() => {
    if (needInit) {
      getTopArtists(6)
    }
  }, [])

  return {
    topArtists,
    getArtistsDetail,
    getArtistsAllSong,
  }
}

export default useArtists
