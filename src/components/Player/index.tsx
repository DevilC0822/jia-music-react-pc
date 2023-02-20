import React, { useEffect, useRef, useState } from 'react'
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
import useSong from '@/hooks/useSong'
import styles from './index.module.css'
import { ISong } from '@/types'

interface IProps {
  id: string
  playQueue: ISong[]
}

function Player(props: IProps) {
  const { id, playQueue } = props
  const [currentPlayingTime, setCurrentPlayingTime] = useState(10)
  const [volume, setVolume] = useState(50)
  const [playingStatus, setPlayingStatus] = useState(false)
  const [playMode, setPlayMode] = useState<'listLoop' | 'singleLoop'>('listLoop')
  const [playingInfo, setPlayingInfo] = useState({
    songDuration: 1000,
    songName: '海阔天空',
    isMyLike: true,
    songUrl: '',
    totalTime: '',
  })
  const myAudio = useRef<HTMLAudioElement>(null)
  const { getSongDetail, getSongUrl } = useSong()

  const init = async () => {
    const songDetail: any = await getSongDetail(id)
    const songUrl: any = await getSongUrl(id)
    setPlayingInfo({
      ...playingInfo,
      isMyLike: (JSON.parse(window.localStorage.getItem('likeSongIds')!) ?? []).find((i: number) => i === Number(id)),
      songName: songDetail.songs[0].al.name,
      songUrl: songUrl.data[0].url,
      songDuration: Math.ceil(songUrl.data[0].time / 1000),
      totalTime: `${parseInt(String(songUrl.data[0].time / 1000))}:${Math.ceil((songUrl.data[0].time / 1000) % 60)}`,
    })
  }

  const audioPlay = () => {
    myAudio.current!.play()
    setPlayingStatus(!myAudio.current!.paused)
  }
  const audioPaused = () => {
    myAudio.current!.pause()
    setPlayingStatus(!myAudio.current!.paused)
  }

  const audioCanPlay = () => {
    setCurrentPlayingTime(myAudio.current!.currentTime)
  }
  const audioTimeUpdate = () => {
    setCurrentPlayingTime(myAudio.current!.currentTime)
  }

  useEffect(() => {
    init().then()
  }, [id])

  useEffect(() => {
    console.log(myAudio.current)
  }, [])
  return (
    <>
      <div className={styles.playingPercent}>
        <Slider
          value={currentPlayingTime}
          onChange={value => {
            myAudio.current!.currentTime = value as number
            setCurrentPlayingTime(value as number)
          }}
          max={playingInfo.songDuration}
          showBoundary
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
            <Button
              onClick={audioPlay}
              theme="borderless"
              type="tertiary"
              icon={<IconPlay style={{ fontSize: 32 }} />}
            ></Button>
          )}
          {playingStatus && (
            <Button
              onClick={audioPaused}
              theme="borderless"
              type="tertiary"
              icon={<IconPause style={{ fontSize: 32 }} />}
            ></Button>
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
      <audio
        ref={myAudio}
        onCanPlay={audioCanPlay}
        onTimeUpdate={audioTimeUpdate}
        controls
        src={playingInfo.songUrl}
      ></audio>
    </>
  )
}

export default Player
