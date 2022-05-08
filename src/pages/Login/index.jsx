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

    const { loggedin, token, setLoggedin, setToken } = useContext(LoginContext)

    const handleLogin = () => {
        let data = {
            "username": username,
            "email": "",
            "password": password
        }
        axios
            .post(`http://127.0.0.1:8000/sign/auth/login/`,data,{
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setToken(response.data)
                setLoggedin(true)
                if(token != null) {
                    console.log(token)
                }
                console.log(loggedin)
            })
            .catch((e) => {
                setErrors(true)
                console.error(e)
            })
    }

    useEffect(() => {
        if (loggedin) {
            history.push('/')
        }
        console.log(loggedin)
    },[loggedin])
    
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