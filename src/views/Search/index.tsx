import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import searchApi from '@/service/search'
import { List, Avatar, Toast, Tag, Button } from '@douyinfe/semi-ui'
import { artistsShow } from '@/utils'
import styles from './index.module.css'
import type * as T from '@/types'
import { UserContext } from '@/layout'

function Search() {
  const { loginStatus } = useContext(UserContext)
  const params = useParams()
  const [songList, setSongList] = useState<T.ISong[]>([])
  const [loading, setLading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [searchParams, setSearchParams] = useState({
    keywords: params.keywords,
    limit: 10,
    offset: 0,
  })

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

  const search = () => {
    if (searchParams.limit + searchParams.offset > 80 && !loginStatus) {
      return Toast.warning('未登录, 无法加载更多')
    }
    setLading(true)
    searchApi
      .search({
        keywords: params.keywords as string,
        limit: searchParams.limit,
        offset: searchParams.offset,
      })
      .then(res => {
        if (res.code !== 200) {
          Toast.error(res.message)
          setLading(false)
          return
        }
        const handleSongList: T.ISong[] = []
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
          handleSongList.push(result)
        })
        setSongList(() => {
          if (songList.length !== 0) {
            return [...songList, ...handleSongList].reduce((tempArr: T.ISong[], item) => {
              if (tempArr?.findIndex(i => i.songId === item.songId) === -1) {
                tempArr.push(item)
              }
              return tempArr
            }, [])
          }
          return handleSongList
        })
        setHasMore(res.result.songCount > searchParams.limit)
        setLading(false)
      })
  }

  const loadMore = () => {
    setSearchParams({
      ...searchParams,
      offset: searchParams.offset + 10,
    })
  }

  useEffect(() => {
    search()
  }, [searchParams])
  useEffect(() => {
    setSongList([])
    setSearchParams({
      ...searchParams,
      keywords: params.keywords,
    })
  }, [params.keywords])

  return (
    <div className={styles.searchPage}>
      <List
        className={styles.ListBox}
        loading={loading}
        dataSource={songList}
        renderItem={item => (
          <List.Item
            key={item.songId}
            header={
              <Avatar shape="square" src={`${item.picUrl}?param=50y50`}>
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
      {songList.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button disabled={!hasMore} loading={loading} type={'primary'} onClick={loadMore}>
            加载更多
          </Button>
        </div>
      )}
    </div>
  )
}

export default Search
