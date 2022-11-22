import { useEffect, useState, memo } from 'react'
import { Input, Toast, Dropdown, Tag, Empty } from '@douyinfe/semi-ui'
import { IllustrationFailure, IllustrationFailureDark } from '@douyinfe/semi-illustrations'
import { IconSearch } from '@douyinfe/semi-icons'
import { useNavigate } from 'react-router-dom'
import searchApi from '@/service/search'
import styles from './index.module.css'

const HeaderSearch = memo(() => {
  const navigate = useNavigate()
  const [keywords, setKeyword] = useState('')
  const [showKeywords, setShowKeywords] = useState('')
  const [hotSearchKeywordsList, setHotSearchKeywordsList] = useState<{ name: string; desc: string }[]>([])

  const keywordsInputChange = (value: string) => {
    setKeyword(value)
  }

  const search = (name: string = keywords) => {
    if (!name) {
      Toast.warning('请输入搜索关键词')
    }
    console.log(name)
    navigate(`search/${name}`)
  }
  const getDefaultSearchKeywords = () => {
    searchApi.getDefaultSearchKeywords().then(res => {
      if (res.code !== 200) {
        Toast.error(res.message)
      }
      setShowKeywords(res.data.showKeyword)
      setKeyword(res.data.realkeywords)
    })
  }
  const getHotSearchKeywordsList = () => {
    searchApi.hotSearchKeywordsList().then(res => {
      if (res.code !== 200) {
        Toast.error(res.message)
      }
      setHotSearchKeywordsList(
        res.data
          .map((item: { searchWord: string; content: string }) => ({ name: item.searchWord, desc: item.content }))
          .slice(0, 10),
      )
    })
  }
  const hotSearchKeywordsListRender = () => {
    if (hotSearchKeywordsList.length === 0) {
      return (
        <Empty
          image={<IllustrationFailure style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationFailureDark style={{ width: 150, height: 150 }} />}
          description={'热门搜索列表加载失败'}
          style={{ paddingBottom: 20 }}
        />
      )
    }
    return (
      <Dropdown.Menu>
        <Dropdown.Title>热门搜索列表</Dropdown.Title>
        {hotSearchKeywordsList.map((item, index) => (
          <Dropdown.Item
            key={index}
            type="primary"
            onClick={() => {
              setKeyword(item.name)
              search(item.name)
            }}
          >
            <div className={styles.htoKeywordsListBox}>
              <p style={{ marginRight: 10, whiteSpace: 'nowrap' }}>{item.name}</p>
              {
                item.desc &&
                <Tag color="light-blue" size="small">
                  {item.desc}
                </Tag>
              }
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    )
  }
  useEffect(() => {
    getDefaultSearchKeywords()
    getHotSearchKeywordsList()
  }, [])

  useEffect(() => {
    hotSearchKeywordsListRender()
  }, [hotSearchKeywordsList])

  return (
    <>
      <Dropdown
        className={styles.customDropdown}
        position={'bottomLeft'}
        trigger={'focus'}
        spacing={10}
        clickToHide={true}
        render={hotSearchKeywordsListRender()}
      >
        <Input
          placeholder={showKeywords}
          suffix={<IconSearch />}
          showClear
          value={keywords}
          onChange={keywordsInputChange}
          onEnterPress={() => search()}
        ></Input>
      </Dropdown>
    </>
  )
})

export default HeaderSearch
