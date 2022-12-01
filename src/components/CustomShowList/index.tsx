import { useState } from 'react'
import type * as T from '@/types'
import { Button } from '@douyinfe/semi-ui'
import { IconTreeTriangleRight } from '@douyinfe/semi-icons'
import styles from './index.module.css'

interface IProps {
  dataSource: Array<T.IPlayList | T.ISong>
  type: 'playList' | 'song'
  title: string
}
function Home(props: IProps) {
  const { dataSource = [], type = 'playList', title = '' } = props
  return (
    <div style={{marginTop: 20}}>
      <p className={styles.title}>{title}</p>
      <div className={styles.box}>
        {dataSource.map(i => (
          <div className={styles.itemBox} key={i.playListId}>
            <Button
              className={styles.playBtnIcon}
              icon={<IconTreeTriangleRight style={{ color: '#fff', fontSize: 32 }} />}
              aria-label="播放"
            />
            <img className={styles.img} src={i.picUrl} alt={''} />
            <p className={styles.playListName}>{i.playListName}</p>
            <div className={styles.shadow} style={{ backgroundImage: `url('${i.picUrl}')` }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
