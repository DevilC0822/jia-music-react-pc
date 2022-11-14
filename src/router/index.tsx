import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layout'))
const Home = lazy(() => import('@/views/Home'))
const Explore = lazy(() => import('@/views/Explore'))
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
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'explore',
        element: (
          <Suspense>
            <Explore />
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
