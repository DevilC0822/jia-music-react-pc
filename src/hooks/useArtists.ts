import { useEffect, useState } from 'react'
import artistsAi from '@/service/artists'
import type * as T from '@/types'

// 歌手
const useArtists = () => {
  const [topArtists, setTopArtists] = useState<T.ISong[]>()

  const getTopArtists = (limit: number | undefined = 5, offset: number | undefined = 0) => {
    artistsAi.getTopArtists({
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


  useEffect(() => {
    getTopArtists(6)
  }, [])


  return {
    topArtists,
  }
}

export default useArtists
