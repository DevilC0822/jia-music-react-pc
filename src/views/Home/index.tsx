import { useContext, useEffect, useState } from 'react'
import usePlayList from '@/hooks/usePlayList'
// import Banner from './components/Banner'
import CustomShowList from '@/components/CustomShowList'
import type * as T from '@/types'
import { UserContext } from '@/layout'

function Home() {
  const { loginStatus } = useContext(UserContext)
  const { recommendPlayList, todayRecommendPlayList } = usePlayList()

  return (
    <>
      {/*<Banner/>*/}
      {loginStatus && (
        <>
          {todayRecommendPlayList && (
            <CustomShowList type={'playList'} dataSource={todayRecommendPlayList?.slice(0, 10) ?? []} title={'今日推荐歌单'} />
          )}
        </>
      )}
      <CustomShowList type={'playList'} dataSource={recommendPlayList ?? []} title={'推荐歌单'} />
    </>
  )
}

export default Home
