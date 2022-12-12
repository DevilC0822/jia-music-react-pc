import { IconPlayCircle } from '@douyinfe/semi-icons'
import styles from './index.module.css'

interface IProps {
  playCount: number
}
const convert = (n: number) =>
  n.toFixed(0).replace(/(\d{1,4})((\d{4})*)$/, (a, b, c) => {
    const t = ['', '万', '亿', '万亿'][c.length / 4]
    return t ? `${b}.${c.slice(0, 2)}${t}` : b
  })

function PlayCount(props: IProps) {
  const { playCount = 100 } = props
  return (
    <>
      <div className={styles.box}>
        <IconPlayCircle style={{ marginRight: 4, fontSize: 14 }} />
        {convert(playCount)}
      </div>
    </>
  )
}

export default PlayCount
