import { useEffect, useState } from 'react'
import usePlayList from '@/hooks/usePlayList'
import { Collapsible, Button, Checkbox } from '@douyinfe/semi-ui'
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
  const { getPlayListCategory } = usePlayList()
  const [isOpen, setOpen] = useState(false)
  const [customPlayListCategoryOption, setCustomPlayListCategoryOption] = useState<ICustomPlayListCategory[]>([])
  const [allPlayListCategoryOption, setAllPlayListCategoryOption] = useState<IAllPlayListCategory[]>([])
  const [categoryMap, setCategoryMap] = useState<{ [key: number]: string }>({})

  const getPlayListCategoryOption = () => {
    getPlayListCategory().then((res: any) => {
      const resultCustom: ICustomPlayListCategory[] = [
        {
          value: '全部',
          category: 4,
        },
      ]
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
      console.log(resultAll)
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

  useEffect(() => {
    getPlayListCategoryOption()
  }, [])
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
    </div>
  )
}

export default Explore
