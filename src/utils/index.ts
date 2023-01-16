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
 * @Description: 时间戳转时间字符串
 */
const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  return Y + M + D
}

/**
 * @param {Number} seconds 时间差：秒
 * @returns format as "00:00:00"
 */
const formatTime = (seconds: number) => {
  if (seconds > 60 * 60 * 60) {
    return seconds
  }
  const result = []
  let count = 2
  while (count >= 0) {
    const current = Math.floor(seconds / 60 ** count)
    result.push(current)
    seconds -= current * 60 ** count
    --count
  }
  return result.map(item => (item <= 9 ? `0${item}` : item)).join(':')
}

export { artistsShow, debounce, timestampToTime, formatTime }
