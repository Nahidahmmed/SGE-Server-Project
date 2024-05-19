import { createContext, useState } from "react"

export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
export default function AuthProviders({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authInfo = {
        user,
        loading
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
