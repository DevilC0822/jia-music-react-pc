import { useEffect, useState } from 'react'
import { Slider, Button, Tooltip, Popover } from '@douyinfe/semi-ui'
import {
  IconHeartStroked,
  IconLikeHeart,
  IconBackward,
  IconFastForward,
  IconPlay,
  IconPause,
  IconMusic,
  IconMute,
  IconVolume1,
  IconRefresh2,
  IconSync,
} from '@douyinfe/semi-icons'
import { formatTime } from '@/utils'
import songApi from '@/service/song'
import styles from './index.module.css'
import { ISong } from '@/types'

const playingStatus = false

interface IProps {
  id: number
  playQueue: ISong[]
}

function Player(props: IProps) {
  const { id, playQueue } = props
  const [currentPlayingTime, setCurrentPlayingTime] = useState(10)
  const [volume, setVolume] = useState(50)
  const [playMode, setPlayMode] = useState<'listLoop' | 'singleLoop'>('listLoop')
  const [playingInfo, setPlayingInfo] = useState({
    songDuration: 200,
    songName: '海阔天空',
    isMyLike: true,
  })

  const init = () => {
    setPlayingInfo({
      ...playingInfo,
      isMyLike: (JSON.parse(window.localStorage.getItem('likeSongIds')!) ?? []).find((i: number) => i === id),
    })
    songApi.getSongDetail({ ids: String(id) }).then(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    init()
  }, [id])
  return (
    <>
      <div className={styles.playingPercent}>
        <Slider
          value={currentPlayingTime}
          onChange={value => {
            setCurrentPlayingTime(value as number)
          }}
          max={playingInfo.songDuration}
          tipFormatter={v => formatTime(v as number)}
        />
      </div>
      <div className={styles.PlayerBox}>
        <div style={{ width: 300, textAlign: 'right' }}>
          {!playingInfo.isMyLike && (
            <Button theme="borderless" type="tertiary" icon={<IconHeartStroked style={{ fontSize: 24 }} />}></Button>
          )}
          {playingInfo.isMyLike && (
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconLikeHeart style={{ fontSize: 24, color: 'red' }} />}
            ></Button>
          )}
        </div>
        <div className={styles.operateLeft}>
          <Button theme="borderless" type="tertiary" icon={<IconBackward style={{ fontSize: 24 }} />}></Button>
          {!playingStatus && (
            <Button theme="borderless" type="tertiary" icon={<IconPlay style={{ fontSize: 32 }} />}></Button>
          )}
          {playingStatus && (
            <Button theme="borderless" type="tertiary" icon={<IconPause style={{ fontSize: 32 }} />}></Button>
          )}
          <Button theme="borderless" type="tertiary" icon={<IconFastForward style={{ fontSize: 24 }} />}></Button>
        </div>
        <div className={styles.operateRight}>
          <Popover
            content={
              playQueue.length > 0 && (
                <div style={{ padding: 10 }}>
                  {playQueue.map(i => (
                    <p key={i.id}>{i.songName}</p>
                  ))}
                </div>
              )
            }
          >
            <Button theme="borderless" type="tertiary" icon={<IconMusic style={{ fontSize: 16 }} />}></Button>
          </Popover>

          {playMode === 'singleLoop' && (
            <Tooltip content={'单曲循环'}>
              <Button
                theme="borderless"
                type="tertiary"
                onClick={() => {
                  setPlayMode('listLoop')
                }}
                icon={<IconRefresh2 style={{ fontSize: 16 }} />}
              ></Button>
            </Tooltip>
          )}
          {playMode === 'listLoop' && (
            <Tooltip content={'列表循环'}>
              <Button
                theme="borderless"
                type="tertiary"
                onClick={() => {
                  setPlayMode('singleLoop')
                }}
                icon={<IconSync style={{ fontSize: 16 }} />}
              ></Button>
            </Tooltip>
          )}
          {volume === 0 && (
            <Button theme="borderless" type="tertiary" icon={<IconMute style={{ fontSize: 16 }} />}></Button>
          )}
          {volume !== 0 && (
            <Button
              theme="borderless"
              type="tertiary"
              onClick={() => {
                setVolume(0)
              }}
              icon={<IconVolume1 style={{ fontSize: 16 }} />}
            ></Button>
          )}
          <div className={styles.volumeBox}>
            <Slider
              value={volume}
              onChange={value => {
                setVolume(value as number)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Player
