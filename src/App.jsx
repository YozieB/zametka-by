import { Board } from './pages/Board/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import { Landing } from './pages/Landing/index.jsx'
import { NotFound } from './pages/NotFound/index.jsx'
import { Profile } from './pages/Profile/index.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      errorElement: <NotFound />,
    },
    {
      path: '/board/:boardId',
      element: <Board />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/error',
      element: <NotFound />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App
