import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { KeepAlive } from 'react-activation'

const MainLayout = lazy(() => import('@/layout'))
const Home = lazy(() => import('@/views/Home'))
const Explore = lazy(() => import('@/views/Explore'))
const Search = lazy(() => import('@/views/Search'))
const NotFound = lazy(() => import('@/views/NotFound'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />, // 重定向
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: (
          <KeepAlive key={'home'}>
            <Suspense>
              <Home />
            </Suspense>
          </KeepAlive>
        ),
      },
      {
        path: 'explore',
        element: (
          <KeepAlive key={'explore'}>
            <Suspense>
              <Explore />
            </Suspense>
          </KeepAlive>
        ),
      },
      {
        path: 'search/:keywords',
        element: (
          <Suspense>
            <Search />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
export { routes }
