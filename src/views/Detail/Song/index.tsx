import { useParams } from 'react-router-dom'

function Song() {
  const params = useParams()
  return (
    <>
      <div>{params.id}</div>
    </>
  )
}

export default Song
