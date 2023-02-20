import { useContext, useEffect, useState } from 'react'
import { artistsShow } from '@/utils'
import songApi from '@/service/song'
import type * as T from '@/types'
import { UserContext } from '@/layout'
import useLogin from '@/hooks/useLogin'

const useSong = (needInit = false) => {
  // const { loginStatus } = useContext(UserContext)
  const { updateLoginStatus } = useLogin()
  const [recommendNewSong, setRecommendNewSong] = useState<T.ISong[]>()
  const [todayRecommendSong, setTodayRecommendSong] = useState<T.ISong[]>()
  // 获取歌曲详细信息
  const getSongDetail = (ids: string) => {
    return new Promise(resolve => {
      songApi
        .getSongDetail({
          ids,
        })
        .then(res => {
          resolve(res)
        })
    })
  }
  const getSongUrl = (id: string, level = 'standard') => {
    return new Promise(resolve => {
      songApi
        .getSongUrl({
          id,
          level,
        })
        .then(res => {
          resolve(res)
        })
    })
  }

  const getRecommendNewSong = (limit: number | undefined = 5) => {
    songApi
      .getRecommendNewSong({
        limit,
      })
      .then(res => {
        const result: T.ISong[] = []
        res.result.forEach((i: any) => {
          result.push({
            id: i.id,
            songName: i.name,
            picUrl: i.picUrl,
            songArtists: artistsShow(i.song.artists),
          })
        })
        setRecommendNewSong(result)
      })
  }

  const getTodayRecommendSong = () => {
    songApi.getTodayRecommendSong().then(res => {
      const result: T.ISong[] = []
      res.data.dailySongs.forEach((i: any) => {
        result.push({
          id: i.al.id,
          songName: i.al.name,
          picUrl: i.al.picUrl,
          songArtists: artistsShow(i.ar),
        })
      })
      setTodayRecommendSong(result)
    })
  }

  useEffect(() => {
    if (needInit) {
      getRecommendNewSong()
      if (JSON.parse(window.localStorage.getItem('loginStatus')!)) {
        getTodayRecommendSong()
      }
    }
  }, [])

  // useEffect(() => {
  //   if (loginStatus) {
  //     getTodayRecommendSong()
  //   }
  // }, [loginStatus])

  return {
    recommendNewSong,
    todayRecommendSong,
    getSongDetail,
    getSongUrl,
  }
}

export default useSong
