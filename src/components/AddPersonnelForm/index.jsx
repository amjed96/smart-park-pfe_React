import React, { useState, useEffect } from 'react'
import { 
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from "../../services/service"

function AjoutPersonne(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    /* Start API */
    const initialDatasState = {
        is_superuser: false,
        first_name: null,
        last_name: null,
        email: null,
        is_active: true,
        cin: null,
        date_naissance: null,
        telephone: null,
        qualification: null,
        type_permis: null,
        username: null,
        password: null,
        affecte: false,
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    const [engins, setEngins] = useState([])
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            is_superuser: datas.is_superuser,
            first_name: datas.first_name,
            last_name: datas.last_name,
            email: datas.email,
            is_staff: datas.is_staff,
            is_active: datas.is_active,
            cin: datas.cin,
            date_naissance: datas.date_naissance,
            telephone: datas.telephone,
            qualification: datas.qualification,
            type_permis: datas.type_permis,
            username: datas.username,
            password: datas.password,
            affecte: datas.affecte
        };
        axios
            .post(`${baseURL}/personnel/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
              setDatas({
                    is_superuser: response.data.is_superuser,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    is_active: response.data.is_active,
                    cin: response.data.cin,
                    date_naissance: response.data.date_naissance,
                    telephone: response.data.telephone,
                    qualification: response.data.qualification,
                    type_permis: response.data.type_permis,
                    username: response.data.username
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    const retrieveEngins = () => {
        axios
            .get(`${baseURL}/vehicule/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setEngins(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
        
  }
  
  const { open, setOpen } = props
  
    useEffect(() => {
        retrieveEngins()
    },[open])
    /* End API */

    
    return(
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={'md'}
        >
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        style={{flexGrow:1}}
                    >
                        Ajouter un personnel
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'last_name'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'first_name'} label={'Prénom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_naissance'} label={'Date de naissance'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'telephone'} label={'Téléphone'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'cin'} label={'CIN'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'email'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'email'} label={'Email'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'email'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'username'} label={"Nom d'utilisateur"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'password'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'password'} label={'Mot de passe'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete onChange={(event, newValue) => {datas.qualification=newValue}} sx={{width: '40%', margin: '10px'}} size={'small'} name={'qualification'} renderInput={(params) => <TextField {...params} label={'Qualification'} variant={'outlined'} color={'secondary'}></TextField>} options={['Chef de parc','Chauffeur','Chauffeur poids lourd','Mécanicien','Gardien']}></Autocomplete>
                <Autocomplete onChange={(event, newValue) => {datas.type_permis=newValue}} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type_permis'} renderInput={(params) => <TextField {...params} label={'Type de permis'} variant={'outlined'} color={'secondary'}></TextField>} options={['A','B','C','D','E','F','G','H']}></Autocomplete>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutPersonne