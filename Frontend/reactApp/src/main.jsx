import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import {store} from './state/store.jsx'

import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/error/NotFoundPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CreatorNavigationLayout from './pages/profiles/Creator/CreatorNavigationLayout.jsx'
import CreatorPage from './pages/profiles/Creator/CreatorPage.jsx'
import AuthFilter from './filters/AuthFilter.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <AuthFilter Component={HomePage} />,
    errorElement:<NotFoundPage/>
    
  },
  {
    path:'/login',
    element:<LoginPage/>,
    errorElement:<NotFoundPage/>
    
  },
  {
    path:'/home',
    element: <AuthFilter Component={HomePage} />,
  },
  {
    path:'/auth',
    element:<AuthFilter Component={AuthPage} />
  },
  {
    // creator/ url will be invalid unless followed by child
    path:'/creators',
    children: [
      { path: "", element: <AuthFilter Component={CreatorPage} />},
      { path: ":param", element:<AuthFilter Component={CreatorNavigationLayout} /> }
    ]
  }
]); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide access to redux store */}
    <Provider store={store}>
      {/* Entry point to app */}
      <RouterProvider router={router}/>
      {/* <App /> */}
    </Provider>
  </StrictMode>,
)
