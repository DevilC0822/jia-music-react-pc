import { useEffect, useState } from 'react'
// import { UserContext } from '@/layout'
import playListApi from '@/service/playList'
import { artistsShow, timestampToTime } from '@/utils'
import type * as T from '@/types'
import type * as playListType from '@/service/playList/types'

const usePlayList = (needInit = false) => {
  // react-activation 库现存bug 在使用KeepAlive的同时，拿不到最新的 connect 状态 https://github.com/CJY0208/react-activation/issues/229
  // const { loginStatus } = useContext(UserContext)
  const [recommendPlayList, setRecommendPlayList] = useState<T.IPlayList[]>()
  const [todayRecommendPlayList, setTodayRecommendPlayList] = useState<T.IPlayList[]>()

  const getPlayListDetail = (id: string) => {
    return new Promise(resolve => {
      playListApi
        .getPlayListDetail({
          id,
        })
        .then(res => {
          const result: T.IPlayListDetail = {}
          result.id = res.playlist.id
          result.playListName = res.playlist.name
          result.tags = res.playlist.tags
          result.picUrl = res.playlist.coverImgUrl
          result.playListDesc = res.playlist.description
          result.playCount = res.playlist.playCount
          result.createTime = timestampToTime(res.playlist.createTime)
          result.updateTime = timestampToTime(res.playlist.updateTime)
          result.creatorObj = {
            nickName: res.playlist.creator.nickname,
            id: res.playlist.creator.id,
          }
          result.songNum = res.playlist.trackIds.length
          result.subscribed = res.playlist.subscribed
          result.allSongIds = res.playlist.trackIds.map((i: { id: number }) => i.id + '')
          resolve(result)
        })
    })
  }
  const getAllSongByPlayList = (param: playListType.IAllSongByPlayList) => {
    return new Promise(resolve => {
      playListApi.getAllSongByPlayList(param).then(res => {
        const data: T.IPlayList[] = res.songs?.map((i: any) => ({
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
  }
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
    getPlayListDetail,
    getAllSongByPlayList,
  }
}

export default usePlayList
