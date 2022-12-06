import { useEffect } from 'react'

function Explore() {
  useEffect(() => {
    console.log('Explore 组件内useEffect 执行')
  }, [])
  return (
    <>
      <div>Explore</div>
    </>
  )
}

export default Explore
