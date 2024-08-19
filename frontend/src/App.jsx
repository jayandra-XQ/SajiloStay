import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from "./UserContext"
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'



const App = () => {
  return (
    <div>
      <UserContextProvider>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route path='/account' element={<AccountPage />}>
              <Route path=':subpage' element={<AccountPage />} />
              <Route path=':subpage/:action' element={<AccountPage />} />
              
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
      <Toaster />

    </div>
  )
}

export default App