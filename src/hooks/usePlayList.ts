import { useEffect, useState } from 'react'
// import { UserContext } from '@/layout'
import playListApi from '@/service/playList'
import type * as T from '@/types'
import type * as playListType from '@/service/playList/types'

const usePlayList = (needInit = false) => {
  // react-activation 库现存bug 在使用KeepAlive的同时，拿不到最新的 connect 状态 https://github.com/CJY0208/react-activation/issues/229
  // const { loginStatus } = useContext(UserContext)
  const [recommendPlayList, setRecommendPlayList] = useState<T.IPlayList[]>()
  const [todayRecommendPlayList, setTodayRecommendPlayList] = useState<T.IPlayList[]>()

  // const getPlayListDetail = (id: string) => {}
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
          playCount: i.playcount,
        })
      })
      setTodayRecommendPlayList(result)
    })
  }

  const getPlayListCategory = () => {
    return new Promise(resolve => {
      playListApi.getPlayListCategory().then(res => {
        resolve(res)
      })
    })
  }

  const getPlayListByCategory = (hotPlayListCategory: playListType.IPlayListCategory) => {
    return new Promise(resolve => {
      playListApi.getPlayListByCategory(hotPlayListCategory).then(res => {
        const data: T.IPlayList[] = res.playlists.map((i: any) => ({
          playListName: i.name,
          id: i.id,
          picUrl: `${i.coverImgUrl}?param=300y300`,
          playCount: i.playCount,
        }))
        resolve({
          data,
          more: res.more,
        })
      })
    })
  }

  useEffect(() => {
    if (needInit) {
      getRecommendPlayList(10)
      if (JSON.parse(window.localStorage.getItem('loginStatus')!)) {
        getTodayRecommendPlayList()
      }
    }
  }, [])

  // useEffect(() => {
  //   if (loginStatus) {
  //     getTodayRecommendPlayList()
  //   }
  // }, [loginStatus])
  return {
    recommendPlayList,
    todayRecommendPlayList,
    getPlayListCategory,
    getPlayListByCategory,
  }
}

export default usePlayList
