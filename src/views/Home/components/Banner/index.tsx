import { useEffect, useState } from 'react'
import { Carousel } from '@douyinfe/semi-ui'
import bannerApi from '@/service/banner'
import styles from './index.module.css'

interface IBannerList {
  [propsName: string]: any
  picUrl?: string
}

function Banner() {
  const [bannerList, setBannerList] = useState<IBannerList[]>([])
  const getBanner = () => {
    bannerApi.getBanner({}).then(res => {
      const result: IBannerList[] = []
      res.banners.forEach((i: { imageUrl: string }) => {
        result.push({
          picUrl: i.imageUrl,
        })
      })
      setBannerList(result)
    })
  }
  useEffect(() => {
    getBanner()
  }, [])

  const renderNode = () => {
    console.log(bannerList)
    if (!bannerList.length) return <></>
    return bannerList.map((i, index) => {
      return <div key={index} style={{ height: 200, backgroundImage: `url(${i.picUrl})` }}></div>
    })
  }

  return (
    <>
      <Carousel className={styles.carouselBox} theme="dark">
        {renderNode()}
        {/*<div>*/}
        {/*  {bannerList.map((i, index) => {*/}
        {/*    console.log(i.picUrl)*/}
        {/*    return (*/}
        {/*      <div key={index} style={{ backgroundImage: `url(${i.picUrl})` }}>*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</div>*/}
      </Carousel>
      {renderNode()}
    </>
  )
}

export default Banner
