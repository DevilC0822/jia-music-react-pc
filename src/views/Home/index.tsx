import {useContext} from 'react'
import { UserContext } from '@/layout'
// import match from '@nondanee/unblockneteasemusic'

function Home() {
  // console.log(match)
  // match(418602084, ['qq', 'kuwo', 'migu']).then((res) => {
  //   console.log(res)
  // })
  const value = useContext(UserContext)
  return (
    <>
      <div>Home</div>
    </>
  )
}

export default Home
