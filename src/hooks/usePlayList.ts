import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/layout'
import playListApi from '@/service/playList'
import type * as T from '@/types'

const usePlayList = () => {
  const { loginStatus } = useContext(UserContext)
  const [recommendPlayList, setRecommendPlayList] = useState<T.IPlayList[]>()
  const [todayRecommendPlayList, setTodayRecommendPlayList] = useState<T.IPlayList[]>()

  const getPlayListDetail = (id: string) => {}
  // 获取推荐歌单
  const getRecommendPlayList = (limit: number | undefined = 5) => {
    playListApi
      .getRecommendPlayList({
        limit,
      })
      .then(res => {
        const result: T.IPlayList[] = []
        res.result.forEach((i: any) => {
          result.push({
            id: i.id,
            playListName: i.name,
            picUrl: i.picUrl,
            playCount: i.playCount,
          })
        })
        setRecommendPlayList(result)
      })
  }
  // 获取每日推荐歌单(需登录)
  const getTodayRecommendPlayList = () => {
    playListApi.getTodayRecommendPlayList().then(res => {
      const result: T.IPlayList[] = []
      res.recommend.forEach((i: any) => {
        result.push({
          id: i.id,
          playListName: i.name,
          picUrl: i.picUrl,
          playCount: i.playCount,
        })
      })
      setTodayRecommendPlayList(result)
    })
  }

  useEffect(() => {
    getRecommendPlayList(10)
  }, [])

  useEffect(() => {
    if (loginStatus) {
      getTodayRecommendPlayList()
    }
  }, [loginStatus])
  return {
    recommendPlayList,
    todayRecommendPlayList,
  }
}

export default usePlayList
