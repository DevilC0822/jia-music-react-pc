import { useEffect, useState } from 'react'
import playListApi from '@/service/playList'
import type * as T from '@/types'

const usePlayList = () => {
  const [recommendPlayList, setRecommendPlayList] = useState<T.IPlayList[]>()

  const getPlayListDetail = (id: string) => {

  }
  // 获取歌曲详细信息
  const getRecommendPlayList = (limit: number | undefined = 5) => {
    playListApi
      .getRecommendPlayList({
        limit,
      })
      .then(res => {
        const result: T.IPlayList[] = []
        res.result.forEach((i: any) => {
          result.push({
            playListId: i.id,
            playListName: i.name,
            picUrl: i.picUrl,
            playCount: i.playCount,
          })
        })
        setRecommendPlayList(result)
      })
  }

  useEffect(() => {
    getRecommendPlayList(10)
  }, [])
  return {
    recommendPlayList,
    getRecommendPlayList,
  }
}

export default usePlayList
