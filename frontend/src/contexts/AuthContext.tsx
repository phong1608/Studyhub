'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import axios from 'axios'

type User = {
  id: string,
  name: string,
  userType: string,
  profilePicture: string,
  bio: string
}

type Login = {
  email: string,
  password: string
}

const AppContext = createContext<{
  user: User | null
  setUser: () => Promise<void>
  isAuthenticated: boolean
  login: (login: Login) => Promise<void>
  logout: () => void
  loading: boolean
}>({
  user: null,
  setUser: async () => {},
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  loading: true
})

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUserState] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/user/me`, { withCredentials: true })
      if(res.data)
      {

        setUserState(res.data)
        setIsAuthenticated(true)
        return;
      }
    } catch (err) {
      console.log(err)
      setUserState(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }: Login) => {
    try {
      await axios.post(`http://localhost:3333/user/signin`, { email, password }, { withCredentials: true })
      await setUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new Error('Login failed')
    }
  }

  const logout = async () => {
    try {
      await axios.get(`http://localhost:3333/user/signout`, { withCredentials: true })
    } catch (err) {
      console.log(err)
    } finally {
      setUserState(null)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    setUser()
  }, []) 

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        logout,
        login
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
