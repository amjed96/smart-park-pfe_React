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


function AjoutContratLocation(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        vehicule: null,
        date_debut: defaultDate,
        date_fin: defaultDate,
        marque: null,
        modele: null,
        prix: null
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
            vehicule: datas.vehicule,
            date_debut: datas.date_debut,
            date_fin: datas.date_fin,
            marque: datas.marque,
            modele: datas.modele,
            prix: datas.prix
        };
        console.log(data)
        axios
            .post(`${baseURL}/contrat-location/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    vehicule: response.data.vehicule,
                    date_debut: response.data.date_debut,
                    date_fin: response.data.date_fin,
                    marque: response.data.marque,
                    modele: response.data.modele,
                    prix: response.data.prix
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }

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

    useEffect(()=> {
        retrieveEngins()
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
                        Ajouter un contrat de location
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
                    onChange={(event, newValue) => {datas.vehicule=newValue;console.log(datas.vehicule)}}
                    sx={{width: '80%', margin: '10px'}}
                    name={'vehicule'}
                    size={'small'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation Engin'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                {/* <TextField onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'locataire'} label={'Locataire'} variant={'outlined'} color={'secondary'}></TextField> */}
                <TextField onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'marque'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'modele'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                {/*<Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>*/}
                
                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutContratLocation