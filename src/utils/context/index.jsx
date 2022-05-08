import { createContext, useState } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
    const [ loggedin, setLoggedin ] = useState(false)
    const [ token, setToken ] = useState(false)

    return (
        <LoginContext.Provider value={{ loggedin, token, setLoggedin, setToken }}>
            {children}
        </LoginContext.Provider>
    )
}