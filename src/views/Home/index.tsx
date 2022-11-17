import {useContext} from 'react'
import { UserContext } from '@/layout'

function Home() {
  const value = useContext(UserContext)
  return (
    <>
      <div>Home</div>
    </>
  )
}

export default Home
