import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Body from "../../components/Body"
import Header from "../../components/Header"
import { LoginContext } from "../../utils/context"

function Admin() {

    const { loggedin } = useContext(LoginContext)

    const history = useHistory()

    useEffect(() => {
        if(!loggedin) {
            history.push('/login')
        }
    },[])

    return (
        <div>
            <Header />
            <Body />
        </div>
    )
}

export default Admin