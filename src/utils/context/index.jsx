import { createContext, useState } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
    const [ loggedin, setLoggedin ] = useState(false)
    const [ token, setToken ] = useState(false)
    const [ user, setUser ] = useState({})

    return (
        <LoginContext.Provider value={{ loggedin, token, user, setUser, setLoggedin, setToken }}>
            {children}
        </LoginContext.Provider>
    )
}