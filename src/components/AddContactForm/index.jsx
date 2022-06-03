import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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
import { baseURL, headers } from '../../services/service'


function AjoutContact(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        type: null,
        civilite: null,
        nom: null,
        prenom: null,
        service: null,
        fonction: null,
        telephone: null,
        portable: null,
        telecopie: null,
        skype: null,
        linkedin: null,
        facebook: null,
        email: null,
        tiers: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    const [tiers, setTiers] = useState([])
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            type: datas.type,
            civilite: datas.civilite,
            nom: datas.nom,
            prenom: datas.prenom,
            service: datas.service,
            fonction: datas.fonction,
            telephone: datas.telephone,
            portable: datas.portable,
            telecopie: datas.telecopie,
            skype: datas.skype,
            linkedin: datas.linkedin,
            facebook: datas.facebook,
            email: datas.email,
            tiers: datas.tiers
        }
        console.log(data)
        axios
            .post(`${baseURL}/contact/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    type: response.data.type,
                    civilite: response.data.civilite,
                    nom: response.data.nom,
                    prenom: response.data.prenom,
                    service: response.data.service,
                    fonction: response.data.fonction,
                    telephone: response.data.telephone,
                    portable: response.data.portable,
                    telecopie: response.data.telecopie,
                    skype: response.data.skype,
                    linkedin: response.data.linkedin,
                    facebook: response.data.facebook,
                    email: response.data.email,
                    tiers: response.data.tiers
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }
  
    const { open, setOpen } = props

    const retrieveTiers = () => {
        axios
            .get(`${baseURL}/tiers/`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setTiers(response.data)
            })
            .catch((e) => {
                console.error(e)
            })  
    }

    useEffect(()=>{
        retrieveTiers()
    },[])
  
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
                        Ajouter un contact
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <Autocomplete
                    onChange={(event, newValue) => {datas.tiers=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'tiers'}
                    renderInput={(params) => <TextField {...params} label={'Tiers'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={tiers.map((e) => e.id.toString())}>
                </Autocomplete>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.civilite=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'civilite'}
                    renderInput={(params) => <TextField {...params} label={'Civilité'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['M.','Mme.','Mlle.']}>
                </Autocomplete>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nom'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prenom'} label={'Préom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'service'} label={'Service'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'fonction'} label={'Fonction'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'telephone'} label={'Téléphone'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'portable'} label={'Portable'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'telecopie'} label={'Télécopie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'skype'} label={'Skype'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'linkedin'} label={'LinkedIn'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'facebook'} label={'Facebook'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'email'} label={'Email'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutContact