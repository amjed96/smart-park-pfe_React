import { Button, TextField, Typography } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components"
import { LoginContext } from "../../utils/context";
import axios from "axios";
import { baseURL, headers } from "../../services/service";

const LoginContainer = styled.div`
    background-color: #FFF;
    width: 30%;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const history = useHistory()

    let { loggedin, token, user, setUser, setLoggedin, setToken } = useContext(LoginContext)

    useEffect(() => {
        if (loggedin === true) {
            // setToken(localStorage.getItem('token'))
            // setUser(JSON.parse(localStorage.getItem('user')))
            // setLoggedin(localStorage.getItem('loggedin'))
            history.push('/')
            console.log('THIS First : '+loggedin)
        }
        console.log('THIS : '+loggedin)
    },[loggedin])

    const handleLogin = () => {
        let data = {
            "username": username,
            "password": password
        }
        axios
            .post(`http://127.0.0.1:8000/login/`,data,{
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                // console.log(response.data.token)
                // console.log('User: ',response.data.user)
                
                setToken(response.data.token)
                setUser(response.data.user)
                setLoggedin(true)
                localStorage.setItem('token',token)
                localStorage.setItem('user',JSON.stringify(user)) /* STRINGIFY THIS */
                localStorage.setItem('loggedin',loggedin)

                console.log('TOKEN : '+token)
                console.log('USER : '+user.username)
                console.log('LOGGEDIN : '+loggedin)
                // if(token != null) {
                //     console.log(token)
                // }
                // console.log(loggedin)
            })
            .catch((e) => {
                setErrors(true)
                console.error(e)
            })
    }
    
    return (
        <LoginContainer>
            <Typography sx={{margin: '10px'}}>Se connecter</Typography>
            {errors === true && <Typography sx={{color: 'red'}}>Vous n'arrivez pas à vous connecter ! Vérifiez vos coordonnées !</Typography>}
            <TextField onChange={e => { setUsername(e.target.value);setErrors(false)}} sx={{width: '80%', margin: '10px'}} type={'text'} name={"username"} label={"Nom d'utilisateur"} variant={'outlined'} />
            <TextField onChange={e => { setPassword(e.target.value);setErrors(false)}} sx={{width: '80%', margin: '10px'}} type={'password'} name={"password"} label={"Mot de passe"} variant={'outlined'} />
            <Button onClick={() => {handleLogin()}} sx={{margin: 'auto'}} variant={'contained'} color={'secondary'} type={'submit'}>Se connecter</Button>
        </LoginContainer>
    )
}

export default Login