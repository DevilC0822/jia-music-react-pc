import { useEffect, useState } from 'react'
import usePlayList from '@/hooks/usePlayList'
import type * as T from '@/types'
import type * as playListType from '@/service/playList/types'
import { Collapsible, Button } from '@douyinfe/semi-ui'
import CustomShowList from '@/components/CustomShowList'
import styles from './index.module.css'

interface ICustomPlayListCategory {
  value: string
  category: number
}
interface IAllPlayListCategory {
  category: number
  data: ICustomPlayListCategory[]
}

function Explore() {
  const { getPlayListCategory, getPlayListByCategory } = usePlayList()
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [customPlayListCategoryOption, setCustomPlayListCategoryOption] = useState<ICustomPlayListCategory[]>(
    JSON.parse(window.localStorage.getItem('customOptionSetting')!) ?? [],
  )
  const [allPlayListCategoryOption, setAllPlayListCategoryOption] = useState<IAllPlayListCategory[]>(
    JSON.parse(window.localStorage.getItem('allOptionSetting')!) ?? [],
  )
  const [categoryMap, setCategoryMap] = useState<{ [key: string]: string }>(
    JSON.parse(window.localStorage.getItem('categoryMap')!) ?? {},
  )
  const [hotPlayList, setHotPlayList] = useState<T.IPlayList[]>([])
  const [hotPlayListCategory, setHotPlayListCategory] = useState({
    cat: '全部',
    limit: 10,
    offset: 0,
    order: 'hot',
  })

  const getPlayListCategoryOption = () => {
    getPlayListCategory().then((res: any) => {
      const resultCustom: ICustomPlayListCategory[] = [
        {
          value: '全部',
          category: 4,
        },
      ]
      window.localStorage.setItem('categoryMap', JSON.stringify(res.categories))
      setCategoryMap(res.categories)
      // @ts-ignore
      res.sub.forEach((i: { name: string; category: number; hot: boolean }) => {
        if (i.hot) {
          resultCustom.push({
            value: i.name,
            category: i.category,
          })
        }
      })
      const resultAll: IAllPlayListCategory[] = []
      Object.keys(res.categories).forEach((i, index) => {
        resultAll.push({
          category: Number(i),
          data: [],
        })
        res.sub.forEach((it: { name: string; category: number }) => {
          if (it.category === Number(i)) {
            resultAll[index].data.push({
              value: it.name,
              category: it.category,
            })
          }
        })
      })
      window.localStorage.setItem('allOptionSetting', JSON.stringify(resultAll))
      setAllPlayListCategoryOption(resultAll)
      resultCustom.push({
        value: '...',
        category: -1,
      })
      setCustomPlayListCategoryOption(resultCustom)
    })
  }
  const btnClick = (val: string) => {
    if (val === '...') {
      setOpen(!isOpen)
      return
    }
    setHotPlayList([])
    setHotPlayListCategory({
      ...hotPlayListCategory,
      cat: val,
    })
  }
  const isCheck = (val: string) => {
    return customPlayListCategoryOption.find(i => i.value === val)
  }
  const allOptionClick = (val: ICustomPlayListCategory) => {
    if (isCheck(val.value)) {
      setCustomPlayListCategoryOption(customPlayListCategoryOption.filter(i => i.value !== val.value))
      return
    }
    const result = customPlayListCategoryOption.slice()
    result.splice(-1, 0, val)
    setCustomPlayListCategoryOption(result)
  }

  const getHotPlayList = (hotPlayListCategory: playListType.IPlayListCategory) => {
    setLoading(true)
    getPlayListByCategory(hotPlayListCategory)
      .then((res: any) => {
        setHasMore(res.more)
        setHotPlayList(() => {
          if (hotPlayList.length !== 0) {
            return [...hotPlayList, ...res.data].reduce((tempArr, item) => {
              if (tempArr?.findIndex((i: { id: string }) => i.id === item.id) === -1) {
                tempArr.push(item)
              }
              return tempArr
            }, [])
          }
          return res.data
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const loadMore = () => {
    setHotPlayListCategory({
      ...hotPlayListCategory,
      offset: hotPlayListCategory.offset + 10,
    })
  }

  useEffect(() => {
    window.localStorage.setItem('customOptionSetting', JSON.stringify(customPlayListCategoryOption))
  }, [customPlayListCategoryOption])

  useEffect(() => {
    if (
      !window.localStorage.getItem('customOptionSetting') ||
      !window.localStorage.getItem('allOptionSetting') ||
      !window.localStorage.getItem('categoryMap')
    ) {
      getPlayListCategoryOption()
    }
    getHotPlayList(hotPlayListCategory)
  }, [])
  useEffect(() => {
    getHotPlayList(hotPlayListCategory)
  }, [hotPlayListCategory])
  return (
    <div style={{ marginTop: 20 }}>
      {customPlayListCategoryOption.length > 1 &&
        customPlayListCategoryOption.map(i => {
          return (
            <Button
              key={i.value}
              type={'primary'}
              style={{ margin: '0 16px 12px 0' }}
              onClick={() => btnClick(i.value)}
            >
              {i.value}
            </Button>
          )
        })}
      <Collapsible isOpen={isOpen}>
        {allPlayListCategoryOption.length > 0 && (
          <div className={styles.collapseBox}>
            {allPlayListCategoryOption.map(i => {
              return (
                <div key={i.category} className={styles.collapseContent}>
                  <Button theme={'solid'} type={'primary'} style={{ marginRight: 20 }}>
                    {categoryMap[i.category]}
                  </Button>
                  <div>
                    {i.data.map(it => {
                      return (
                        <Button
                          key={it.value}
                          theme={`${isCheck(it.value) ? 'light' : 'borderless'}`}
                          type={`${isCheck(it.value) ? 'primary' : 'tertiary'}`}
                          style={{ margin: '0 16px 12px 0' }}
                          onClick={() => allOptionClick(it)}
                        >
                          {it.value}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Collapsible>
      <CustomShowList type={'playList'} dataSource={hotPlayList ?? []} title={hotPlayListCategory.cat} />
      {hotPlayList.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button disabled={!hasMore} loading={loading} type={'primary'} onClick={loadMore}>
            加载更多
          </Button>
        </div>
      )}
    </div>
  )
}

export default Explore
