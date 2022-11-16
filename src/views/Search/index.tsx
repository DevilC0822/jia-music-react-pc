import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import searchApi from '@/service/search'
import { List, Avatar, Spin, Toast, Tag } from '@douyinfe/semi-ui'
import InfiniteScroll from 'react-infinite-scroller'
import useSongId from '@/hooks/useSongId'
import { artistsShow } from '@/utils'
import styles from './index.module.css'
import type * as T from '@/types/song'

// 天然闭包环境
let offset = 0
let limit = 30
const loginStatus = false

function Search() {
  const params = useParams()
  const { getSongDetail } = useSongId()
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

  const search = async (limit = 30, offset = 0) => {
    if (limit + offset > 80 && !loginStatus) {
      return Toast.warning('未登录, 无法加载更多')
    }
    setLading(true)
    const idsRes = await searchApi.search({
      keywords: params.keywords as string,
      limit,
      offset,
    })
    const ids = idsRes.result.songs.map((item: { id: string }) => item.id).join(',')
    const songDetailRes = await getSongDetail(ids)
    console.log(songDetailRes)
    const songInfo: T.ISong[] = []
    ;(songDetailRes as any).songs.map((item: any) => {
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
    setHasMore(idsRes.result.hasMore)
    setLading(false)
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
        loadMore={() => search((limit += 5), (offset += 5))}
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
