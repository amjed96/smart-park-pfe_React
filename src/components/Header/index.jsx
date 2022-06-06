import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import profil from '../../assets/profil.jpg'
import { useContext, useEffect } from 'react'
import { LoginContext } from '../../utils/context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const StyledHeader = styled.div`
    display: flex;
    margin: 0px;
    position: relative;
    z-index: 1;
`

const Logo = styled.div`
    height: 50px;
    width: 180px;
    background-color: #373B54;
    color: #FFF;
    font-family: 'Bebas Neue';
    font-size: 18px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid #FFF;
    position: fixed;
    
    .logo-icon {
        width: 34px;
        height: 23px;
    }
`

const Menu = styled.div`
    display: flex;
    background-color: #FFF;
    flex-grow: 1;
    flex-direction: row;
    height: 50px;
    flex-wrap: nowrap;
    position: fixed;
    top: 0;
    left: 180px;
    right: 0;
`

const ToggleNav = styled.div`
    border-right: 1px solid #C4C4C4;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
`

const ToggleNavCont = styled.div`
    height: 25px;
    width: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* TODO */
    align-items: center;
`
/*TODO*/
const ToggleNavContSpan = styled.span`
    background-color: #C4C4C4;
    height: 1px;
`

const Odd = styled(ToggleNavContSpan)`
    width: 100%;
`

const Even = styled(ToggleNavContSpan)`
    width: 50%;
`

const Search = styled.div`
    flex: 1;
    color: #C4C4C4;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 50px;
    width: 50px;
    border-right: 1px solid #c4c4c4;

    .search-icon {
        height: 20px;
        width: 20px;
        margin-left: 12px;
    }

    input {
        border: none;
        color: #C4C4C4;
    }
    input:focus {
        border: none;
    }
`

const Message = styled.div`
    height: 50px;
    width: 50px;
    border-right: 1px solid #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;

    .message-icon {
        color: #C4C4C4;
    }
`

const Notif = styled.div`
    height: 50px;
    width: 50px;
    border-right: 1px solid #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;
    .notif-bell {
        color: #C4C4C4;
    }
`

const ListMenu = styled.div`
    height: 50px;
    width: 50px;
    border-right: 1px solid #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;

    .list-menu-icon {
        margin: 1px;
        color: #C4C4C4;
    }
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 50px;
    width: 160px;
    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .name {
        font-family: 'Montserrat', sans-serif;
        font-size: 10px;
        font-weight: bold;
        color: #000;
    }
    &:hover {
        div {
            display: block;
        }
    }
    .drop-down-icon {
        color: #C4C4C4;
    }
`

const DropDown = styled.div`
    display: none;
    position: fixed;
    top: 60px;
    right: 10px;
    width: 180px;
    background-color: #FFF;
    ul {
        margin: 0px;
        padding: 10px 20px;
        position: relative;
        box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
    }
    ul::before {
        content: "";
        position: fixed;
        top: 50px;
        right: 20px;
        width: 0px;
        height: 0px;
        border-bottom: 5px solid #FFF;
        border-top: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    ul li {
        list-style: none;
        font-family: 'Montserrat', sans-serif;
        color: #000;
        font-weight: bold;
        margin: 10px 0px;
    }
    ul li:hover {
        color: #6D52ED;
        margin-left: 10px;
        transition: 0.3s;
    }
`

const ProfilePhoto = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
`


function Header() {

    const { loggedin, token, user, setLoggedin, setToken, setUser } = useContext(LoginContext)
    const history = useHistory()

    const handleLogout = () => {

        // setToken(null)
        // setLoggedin(false)
        // setUser(undefined)

        localStorage.clear()

        // axios
        //     .post(`http://127.0.0.1:8000/sign/auth/logout/`,{
        //         /*headers: {
        //             headers,
        //         },*/
        //     })
        //     .then((response) => {
        //         setToken(null)
        //         setLoggedin(false)
        //         console.log(response)
        //     })
        //     .catch((e) => {
        //         console.error(e)
        //     })
    }

    useEffect(() => {
        console.log('USER : '+user)
        if(!loggedin) {
            history.push('/login')
        }
    }, [loggedin])

    return(
        <StyledHeader>
            <Logo>
                <FontAwesomeIcon icon={faTruckFast} className="logo-icon" />
                <span className="logo-text">SmartParc</span>
            </Logo>
            <Menu>
                <ToggleNav>
                    <ToggleNavCont>
                        <Odd></Odd>{/*TODO*/}
                        <Even></Even>
                        <Odd></Odd>
                        <Even></Even>
                        <Odd></Odd>
                    </ToggleNavCont>
                </ToggleNav>
                <Search>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input type="text" placeholder="Type to search ..." />
                </Search>
                <Message>
                    <FontAwesomeIcon icon={faEnvelope} className="message-icon" />
                </Message>
                <Notif>
                    <FontAwesomeIcon icon={faBell} className="notif-bell" />
                </Notif>
                <ListMenu>
                    <FontAwesomeIcon icon={faEllipsisVertical} className="list-menu-icon" />
                    <FontAwesomeIcon icon={faEllipsisVertical} className="list-menu-icon" />
                    <FontAwesomeIcon icon={faEllipsisVertical} className="list-menu-icon" />
                </ListMenu>
                <Profile>
                    <ProfilePhoto src={profil} />
                    <span className="name">{user && user.username}</span>
                    <FontAwesomeIcon icon={faCaretDown} className="drop-down-icon" />
                    <DropDown>
                        <ul>
                            <li>Profil</li>
                            <li>Paramètres</li>
                            <li>Paramètres</li>
                            <li onClick={() => {handleLogout()}}>Logout</li>
                        </ul>
                    </DropDown>
                </Profile>
            </Menu>
        </StyledHeader>
    )
}

export default Header