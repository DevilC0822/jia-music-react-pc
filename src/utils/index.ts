const artistsShow = (arr: Array<{ name: string }>) => {
  const isHaveEllipsis = arr.length > 3
  return isHaveEllipsis ? arr.map(item => item.name).join('/') + '...' : arr.map(item => item.name).join('/')
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param wait 延迟时间 ms
 */
const debounce = (fn: Function, wait: number) => {
  let timeout: NodeJS.Timeout | number
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}
/**
 * 防抖函数
 * @param timestamp 时间戳
 */
const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  return Y + M + D
}

export { artistsShow, debounce, timestampToTime }
