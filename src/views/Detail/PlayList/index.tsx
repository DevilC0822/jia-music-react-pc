import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Tag, Button } from '@douyinfe/semi-ui'
import { IconTickCircle, IconSync, IconLikeHeart } from '@douyinfe/semi-icons'
import CustomShowList from '@/components/CustomShowList'
import PlayCount from '@/components/PlayCount'
import usePlayList from '@/hooks/usePlayList'
import type * as T from '@/types'
import type * as playListType from '@/service/playList/types'
import styles from './index.module.css'

function PlayList() {
  const params = useParams()
  const { getPlayListDetail, getAllSongByPlayList } = usePlayList()
  const [loading, setLoading] = useState(false)
  const [playListInfo, setPlayListInfo] = useState<T.IPlayListDetail>()
  const [playListSong, setPlayListSong] = useState<T.ISong[]>([])
  const [getAllParam, setGetAllParam] = useState<playListType.IAllSongByPlayList>({
    id: params.id!,
    offset: 0,
    limit: 10,
  })

  const subscribePlayList = () => {
    if (playListInfo?.subscribed) {
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
    const resPlayDetail = await getPlayListDetail(params.id!)
    setPlayListInfo(resPlayDetail as T.IPlayListDetail)
  }
  useEffect(() => {
    init().then()
  }, [])
  useEffect(() => {
    setLoading(true)
    getAllSongByPlayList(getAllParam)
      .then(res => {
        setPlayListSong(() => {
          if (playListSong.length !== 0) {
            return [...playListSong, ...(res as T.ISong[])].reduce((tempArr: T.ISong[], item) => {
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
      {playListInfo?.picUrl && (
        <div className={styles.headerBox}>
          <div style={{ position: 'relative', marginRight: 20 }}>
            <img
              className={styles.headerImg}
              src={`${playListInfo?.picUrl}?param=300y300`}
              alt={`${playListInfo?.playListName}歌单展示图`}
            />
            <PlayCount playCount={playListInfo.playCount!} />
          </div>
          <div>
            <p className={styles.name}>{playListInfo.playListName}</p>
            <div className={styles.tagBox}>
              {playListInfo?.tags!.map(i => (
                <Tag style={{ marginRight: 10 }} color={'light-blue'} key={i as string}>
                  {i}
                </Tag>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: 14 }}>由 {playListInfo?.creatorObj?.nickName} 创建</p>
            <div className={styles.timeBox}>
              <Button disabled icon={<IconTickCircle />} theme="solid" style={{ marginRight: 10 }}>
                {playListInfo.createTime}
              </Button>
              <Button disabled icon={<IconSync />} theme="solid" style={{ marginRight: 10 }}>
                {playListInfo.updateTime}
              </Button>
            </div>
            <p className={styles.desc}>{playListInfo.playListDesc}</p>
            <div className={styles.operateBox}>
              <Button theme="solid" style={{ marginRight: 10 }}>
                播放
              </Button>
              <Button
                icon={<IconLikeHeart style={{ color: `${playListInfo.subscribed ? '#e91e63' : '#fff'}` }} />}
                theme="solid"
                style={{ marginRight: 10 }}
                onClick={subscribePlayList}
              />
            </div>
          </div>
        </div>
      )}
      {playListSong.length > 0 && <CustomShowList type={'song'} dataSource={playListSong ?? []} title={''} />}
      {playListSong.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            disabled={playListSong.length >= playListInfo?.songNum!}
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

export default PlayList
