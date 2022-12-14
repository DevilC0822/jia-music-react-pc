import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Tag, Button, Tooltip } from '@douyinfe/semi-ui'
import { IconSong, IconDisc, IconLikeHeart } from '@douyinfe/semi-icons'
import CustomShowList from '@/components/CustomShowList'
import useArtists from '@/hooks/useArtists'
import type * as T from '@/types'
import type * as artistsType from '@/service/artists/types'
import styles from './index.module.css'

function Artists() {
  const params = useParams()
  const { getArtistsDetail, getArtistsAllSong } = useArtists()
  const [loading, setLoading] = useState(false)
  const [artistsInfo, setArtistsInfo] = useState<T.IArtistsDetail>()
  const [artistsSong, setArtistsSong] = useState<T.ISong[]>([])
  const [getAllParam, setGetAllParam] = useState<artistsType.IArtistsAllSong>({
    id: params.id!,
    offset: 0,
    limit: 10,
  })

  const subscribePlayList = () => {
    if (artistsInfo?.subscribed) {
      console.log('取消订阅')
      return
    }
    console.log('订阅歌单')
  }
  const loadMore = () => {
    setGetAllParam({
      ...getAllParam,
      offset: getAllParam.offset! + 10,
    })
  }

  const init = async () => {
    const resPlayDetail = await getArtistsDetail(params.id!)
    setArtistsInfo(resPlayDetail as T.IArtistsDetail)
  }
  useEffect(() => {
    init().then()
  }, [])
  useEffect(() => {
    setLoading(true)
    getArtistsAllSong(getAllParam)
      .then(res => {
        setArtistsSong(() => {
          if (artistsSong.length !== 0) {
            return [...artistsSong, ...(res as T.ISong[])].reduce((tempArr: T.ISong[], item) => {
              if (tempArr?.findIndex(i => i.id === item.id) === -1) {
                tempArr.push(item)
              }
              return tempArr
            }, [])
          }
          return res as T.ISong[]
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [getAllParam])
  return (
    <>
      {artistsInfo?.picUrl && (
        <div className={styles.headerBox}>
          <div style={{ position: 'relative', marginRight: 20 }}>
            <img
              className={styles.headerImg}
              src={`${artistsInfo?.picUrl}?param=300y300`}
              alt={`${artistsInfo?.playListName}歌手展示图`}
            />
          </div>
          <div>
            <p className={styles.name}>{artistsInfo.artistsName}</p>
            <div className={styles.tagBox}>
              {artistsInfo?.tags?.map(i => (
                <Tag style={{ marginRight: 10 }} color={'light-blue'} key={i as string}>
                  {i}
                </Tag>
              ))}
            </div>
            {artistsInfo?.rank && <p style={{ fontSize: 14, marginTop: 20 }}>歌手当前排名第 {artistsInfo.rank} </p>}
            <div className={styles.timeBox}>
              <Tooltip content={'歌手歌曲数'}>
                <Button disabled icon={<IconSong />} theme="solid" style={{ marginRight: 10 }}>
                  {artistsInfo?.musicSize ?? 0}
                </Button>
              </Tooltip>
              <Tooltip content={'歌手mv数'}>
                <Button disabled icon={<IconDisc />} theme="solid" style={{ marginRight: 10 }}>
                  {artistsInfo?.mvSize ?? 0}
                </Button>
              </Tooltip>
            </div>
            <p className={styles.desc}>{artistsInfo.artistsDesc}</p>
            <div className={styles.operateBox}>
              <Button disabled theme="solid" style={{ marginRight: 10 }}>
                播放
              </Button>
              {/*<Button*/}
              {/*  icon={<IconLikeHeart style={{ color: `${artistsInfo.subscribed ? '#e91e63' : '#fff'}` }} />}*/}
              {/*  theme="solid"*/}
              {/*  style={{ marginRight: 10 }}*/}
              {/*  onClick={subscribePlayList}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      )}
      {artistsSong.length > 0 && <CustomShowList type={'song'} dataSource={artistsSong ?? []} title={''} />}
      {artistsSong.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            disabled={artistsSong.length >= artistsInfo?.songNum!}
            loading={loading}
            type={'primary'}
            onClick={loadMore}
          >
            加载更多
          </Button>
        </div>
      )}
    </>
  )
}

export default Artists
