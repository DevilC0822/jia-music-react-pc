import React, { useState } from 'react'
import { Layout, Nav, Button, Avatar } from '@douyinfe/semi-ui'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  IconSemiLogo,
  IconChevronLeft,
  IconChevronRight,
  IconBell,
  IconGithubLogo,
  IconHome,
  // IconMoon,
  // IconSun,
  IconGridView,
  IconMusic,
} from '@douyinfe/semi-icons'
import HeaderSearch from '@/components/HeaderSearch'
import styles from './index.module.css'

const MainLayout = () => {
  const navigate = useNavigate()
  const { Header, Content } = Layout
  // const [themeName, setThemeName] = useState('light')
  // const switchMode = () => {
  //   const body = document.body
  //   if (body.hasAttribute('theme-mode')) {
  //     body.removeAttribute('theme-mode')
  //     setThemeName('light')
  //   } else {
  //     body.setAttribute('theme-mode', 'dark')
  //     setThemeName('dark')
  //   }
  // }

  return (
    <Layout>
      <Header>
        <div>
          <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
            <Nav.Header>
              <Nav.Item
                onClick={() => navigate(-1)}
                itemKey="back"
                icon={<IconChevronLeft size="large" />}
                style={{ margin: 0 }}
              />
              <Nav.Item
                onClick={() => navigate(1)}
                itemKey="forward"
                icon={<IconChevronRight size="large" />}
                style={{ margin: 0 }}
              />
            </Nav.Header>
            <Nav.Item onClick={() => navigate('/home')} itemKey="Home" text="首页" icon={<IconHome size="large" />} />
            <Nav.Item
              onClick={() => navigate('/explore')}
              itemKey="Live"
              text="发现"
              icon={<IconGridView size="large" />}
            />
            <Nav.Item itemKey="Setting" text="音乐库" icon={<IconMusic size="large" />} />
            <Nav.Footer>
              <HeaderSearch></HeaderSearch>
              {/* 白天与黑暗模式切换 */}
              {/*<div>*/}
              {/*  {themeName === 'light' && (*/}
              {/*    <Tooltip content="切换至暗色模式">*/}
              {/*      <Button*/}
              {/*        theme="borderless"*/}
              {/*        icon={<IconMoon size="large" />}*/}
              {/*        onClick={switchMode}*/}
              {/*        style={{*/}
              {/*          color: 'var(--semi-color-text-2)',*/}
              {/*          marginRight: '12px',*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </Tooltip>*/}
              {/*  )}*/}
              {/*  {themeName === 'dark' && (*/}
              {/*    <Tooltip content="切换至亮色模式">*/}
              {/*      <Button*/}
              {/*        theme="borderless"*/}
              {/*        icon={<IconSun size="large" />}*/}
              {/*        onClick={switchMode}*/}
              {/*        style={{*/}
              {/*          color: 'var(--semi-color-text-2)',*/}
              {/*          marginRight: '12px',*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </Tooltip>*/}
              {/*  )}*/}
              {/*</div>*/}
              <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
              <Button
                theme="borderless"
                icon={<IconGithubLogo size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
                onClick={() => {
                  window.open('https://github.com/DevilC0822/jia-music-react-pc')
                }}
              />
              <Avatar color="orange" size="small" style={{ flexShrink: 0 }}>
                login
              </Avatar>
            </Nav.Footer>
          </Nav>
        </div>
      </Header>
      <Content className={styles.MainContent}>
        {/*<Breadcrumb*/}
        {/*  style={{*/}
        {/*    marginBottom: '24px',*/}
        {/*  }}*/}
        {/*  routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}*/}
        {/*/>*/}
        {/*<div*/}
        {/*  style={{*/}
        {/*    borderRadius: '10px',*/}
        {/*    border: '1px solid var(--semi-color-border)',*/}
        {/*    height: '376px',*/}
        {/*    padding: '32px',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={false}>*/}
        {/*    <p>Hi, Bytedance dance dance.</p>*/}
        {/*    <p>Hi, Bytedance dance dance.</p>*/}
        {/*  </Skeleton>*/}
        {/*</div>*/}
        <Outlet />
      </Content>
      {/*<Footer*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'space-between',*/}
      {/*    padding: '20px',*/}
      {/*    color: 'var(--semi-color-text-2)',*/}
      {/*    backgroundColor: 'rgba(var(--semi-grey-0), 1)',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <span*/}
      {/*    style={{*/}
      {/*      display: 'flex',*/}
      {/*      alignItems: 'center',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />*/}
      {/*    <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>*/}
      {/*  </span>*/}
      {/*  <span>*/}
      {/*    <span style={{ marginRight: '24px' }}>平台客服</span>*/}
      {/*    <span>反馈建议</span>*/}
      {/*  </span>*/}
      {/*</Footer>*/}
    </Layout>
  )
}

export default MainLayout