import songApi from '@/service/song'

const useSongId = () => {
  // 获取歌曲详细信息
  const getSongDetail = (ids: string) => {
    return new Promise(resolve => {
      songApi
        .getSongDetail({
          ids,
        })
        .then(res => {
          resolve(res)
        })
    })
  }
  return {
    getSongDetail,
  }
}

export default useSongId
