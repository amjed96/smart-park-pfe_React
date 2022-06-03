import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from '../../services/service'


function AjoutPieceRechange(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        code: null,
        nom: null,
        code_casier: null,
        famille: null,
        categorie: null,
        unite: null,
        prix: null,
        nombre: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    const [vehicules, setVehicules] = useState([])
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
  
    /*const handleEnginChange = (e) => {
        const { name, value } = e.target;
        setConsommation({...consommation, [name]: value})
    }*/
    
    const submitDatas = () => {
        let data = {
            code: datas.code,
            nom: datas.nom,
            code_casier: datas.code_casier,
            famille: datas.famille,
            categorie: datas.categorie,
            unite: datas.unite,
            prix: datas.prix,
            nombre: datas.nombre
        };
        axios
            .post(`${baseURL}/piece-rechange/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    code: response.data.code,
                    nom: response.data.nom,
                    code_casier: response.data.code_casier,
                    famille: response.data.famille,
                    categorie: response.data.categorie,
                    unite: response.data.unite,
                    prix: response.data.prix,
                    nombre: response.data.nombre
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    const retrieveVehicules = () => {
        axios
            .get(`${baseURL}/vehicule/`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setVehicules(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
        
    }
  
    const { open, setOpen } = props
  
    useEffect(() => {
        retrieveVehicules()
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
                        Ajouter un plan d'entretien
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'code'} label={'Code'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nom'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'code_casier'} label={'Code casier'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.famille=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'famille'}
                    renderInput={(params) => <TextField {...params} label={'Famille'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['mécanique','électrique','pneumatique/hydraulique','capteurs','électronique','divers']}>
                </Autocomplete>

                <Autocomplete
                    onChange={(event, newValue) => {datas.categorie=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'categorie'}
                    renderInput={(params) => <TextField {...params} label={'Catégorie'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['mécanique','électrique','pneumatique/hydraulique','capteurs','électronique','divers']}>
                </Autocomplete>

                <TextField onChange={handleDataChange} type={'text'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'unite'} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nombre'} label={'Nombre'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutPieceRechange