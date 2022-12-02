import { useState } from 'react'
import type * as T from '@/types'
import { Button } from '@douyinfe/semi-ui'
import { IconTreeTriangleRight } from '@douyinfe/semi-icons'
import styles from './index.module.css'

interface IProps {
  dataSource: Array<T.IPlayList | T.ISong>
  type: 'playList' | 'song' | 'artists'
  title: string
}
function Home(props: IProps) {
  const { dataSource = [], type = 'playList', title = '' } = props
  return (
    <>
      {dataSource.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p className={styles.title}>{title}</p>
          <div className={styles.box}>
            {dataSource.map(i => (
              <div className={styles.itemBox} style={{ width: `${type === 'artists' ? '15%' : '19%'}` }} key={i.id}>
                <Button
                  className={styles.playBtnIcon}
                  icon={<IconTreeTriangleRight style={{ color: '#fff', fontSize: 32 }} />}
                  aria-label="播放"
                />
                {type === 'playList' ||
                  (type === 'song' && (
                    <>
                      <img className={styles.img} src={i.picUrl} alt={''} />
                      <div className={styles.showNameBox}>
                        <p className={styles.name}>{i.playListName ?? i.songName}</p>
                        {i.songArtists && <p className={styles.songArtists}>{i.songArtists}</p>}
                      </div>
                    </>
                  ))}
                {type === 'artists' && (
                  <>
                    <img style={{ borderRadius: '50%' }} className={styles.img} src={i.picUrl} alt={''} />
                    <div style={{ justifyContent: 'center' }} className={styles.showNameBox}>
                      <p className={styles.name} style={{ marginRight: 0 }}>
                        {i.artistsName}
                      </p>
                    </div>
                  </>
                )}
                <div
                  style={{
                    borderRadius: `${type === 'artists' ? '50%' : '12px'}`,
                    backgroundImage: `url('${i.picUrl}')`,
                  }}
                  className={styles.shadow}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
