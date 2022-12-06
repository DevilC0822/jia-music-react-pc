import { useContext, useEffect, useState } from 'react'
import usePlayList from '@/hooks/usePlayList'
import useSong from '@/hooks/useSong'
import useArtists from '@/hooks/useArtists'
// import Banner from './components/Banner'
import CustomShowList from '@/components/CustomShowList'
import type * as T from '@/types'

function Home() {
  const { recommendPlayList, todayRecommendPlayList } = usePlayList(true)
  const { recommendNewSong, todayRecommendSong } = useSong(true)
  const { topArtists } = useArtists()

  return (
    <>
      {/*<Banner/>*/}
      {todayRecommendSong && (
        <CustomShowList type={'song'} dataSource={todayRecommendSong?.slice(0, 10) ?? []} title={'今日推荐歌曲'} />
      )}
      {todayRecommendPlayList && (
        <CustomShowList
          type={'playList'}
          dataSource={todayRecommendPlayList?.slice(0, 5) ?? []}
          title={'今日推荐歌单'}
        />
      )}
      <CustomShowList type={'song'} dataSource={recommendNewSong ?? []} title={'推荐新歌曲'} />
      <CustomShowList type={'playList'} dataSource={recommendPlayList ?? []} title={'推荐歌单'} />
      <CustomShowList type={'artists'} dataSource={topArtists ?? []} title={'热门歌手'} />
    </>
  )
}

export default Home
