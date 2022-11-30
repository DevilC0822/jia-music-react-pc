import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import searchApi from '@/service/search'
import { List, Avatar, Toast, Tag } from '@douyinfe/semi-ui'
import InfiniteScroll from 'react-infinite-scroller'
import useLogin from '@/hooks/useLogin'
import { artistsShow } from '@/utils'
import styles from './index.module.css'
import type * as T from '@/types'
import { UserContext } from '@/layout'

// 天然闭包环境
let limit = 30

function Search() {
  const { loginStatus } = useContext(UserContext)
  const params = useParams()
  const [songList, setSongList] = useState<T.ISong[]>([])
  const [loading, setLading] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const FeeRender = (Props: { feeVal: number | undefined }) => {
    const { feeVal } = Props
    if (feeVal === 0) {
      return (
        <Tag style={{ marginLeft: 10 }} color="light-green">
          免费或无版权
        </Tag>
      )
    }
    if (feeVal === 1) {
      return (
        <Tag style={{ marginLeft: 10 }} color="red">
          VIP 歌曲
        </Tag>
      )
    }
    if (feeVal === 4) {
      return (
        <Tag style={{ marginLeft: 10 }} color="purple">
          购买专辑
        </Tag>
      )
    }
    if (feeVal === 8) {
      return (
        <Tag style={{ marginLeft: 10 }} color="teal">
          非会员可免费播放低音质，会员可播放高音质及下载
        </Tag>
      )
    }
    return <></>
  }

  const search = (limit = 30, offset = 0) => {
    if (limit + offset > 80 && !loginStatus) {
      return Toast.warning('未登录, 无法加载更多')
    }
    setLading(true)
    searchApi
      .search({
        keywords: params.keywords as string,
        limit,
        offset,
      })
      .then(res => {
        if (res.code !== 200) {
          Toast.error(res.message)
          setLading(false)
          return
        }
        const songInfo: T.ISong[] = []
        ;(res as any).result.songs.map((item: any) => {
          const result: T.ISong = {}
          result.songName = item.name
          result.songAlias = item.alia && item.alia[0]
          result.songId = item.id
          result.albumName = item.al && item.al.name
          result.picUrl = item.al && item.al.picUrl
          result.albumId = item.al && item.al.id
          result.songArtists = artistsShow(item.ar)
          result.fee = item.fee
          songInfo.push(result)
        })
        setSongList(songInfo)
        setHasMore(res.result.songCount > limit)
        setLading(false)
      })
  }

  useEffect(() => {
    search()
  }, [params.keywords])

  return (
    <>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        threshold={20}
        loadMore={() => search((limit += 5), 0)}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          className={styles.ListBox}
          loading={loading}
          dataSource={songList}
          renderItem={item => (
            <List.Item
              key={item.songId}
              header={
                <Avatar shape="square" src={item.picUrl}>
                  SE
                </Avatar>
              }
              main={
                <div>
                  <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                    {item.songName}
                    {item.songAlias && (
                      <Tag style={{ marginLeft: 10 }} color="light-blue">
                        {item.songAlias}
                      </Tag>
                    )}
                  </div>
                  <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                    {item.songArtists}
                    <FeeRender feeVal={item.fee}></FeeRender>
                  </div>
                </div>
              }
            />
          )}
        />
        {/*{loading && (*/}
        {/*  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, margin: 'auto', textAlign: 'center' }}>*/}
        {/*    <Spin />*/}
        {/*  </div>*/}
        {/*)}*/}
      </InfiniteScroll>
    </>
  )
}

export default Search
