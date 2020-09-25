import React, { createContext, useState, useEffect } from "react"
import { getCurrentUserService } from "./services/auth"
export const MyContext = createContext()

export default function Provider({ children }) {
  const [user, setUser] = useState(null)

  const setCtxUser = user => setUser(user)
  const clearCtxUser = () => setUser(null)

  useEffect(() => {
    async function profile() {
      const {
        data: { user }
      } = await getCurrentUserService()
      setCtxUser(user)
    }
    profile()
  }, [])

  useEffect(() => {
    
    if(!user)
      console.log(`Se logeo el user ${user}`)
    else
      console.log(`loggeado ${user}`)
    
  }, [user])

  return (
    <MyContext.Provider
      value={{
        user,
        setCtxUser,
        clearCtxUser
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
