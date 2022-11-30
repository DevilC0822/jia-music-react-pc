import {useContext, useEffect, useState} from 'react'
import usePlayList from '@/hooks/usePlayList'
import CustomShowList from '@/components/CustomShowList'
import type * as T from '@/types'
import { UserContext } from '@/layout'

function Home() {
  const { recommendPlayList } = usePlayList()
  console.log(recommendPlayList)

  return (
    <>
      <CustomShowList type={'playList'} dataSource={recommendPlayList ?? []} title={'推荐歌单'} />
    </>
  )
}

export default Home
