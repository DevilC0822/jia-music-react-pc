import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Song() {
  const params = useParams()
  const location = useLocation()
  useEffect(() => {
    console.log(location)
    window.localStorage.setItem('playingSongId', JSON.stringify(params.id))
    window.localStorage.setItem('playQueue', JSON.stringify(location.state?.songList ?? '[]'))
  }, [])
  return (
    <>
      <div>{params.id}</div>
    </>
  )
}

export default Song
