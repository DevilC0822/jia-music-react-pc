import { useParams } from 'react-router-dom'

function Artists() {
  const params = useParams()
  return (
    <>
      <div>{params.id}</div>
    </>
  )
}

export default Artists
