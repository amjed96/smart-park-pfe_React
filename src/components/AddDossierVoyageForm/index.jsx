import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { baseURL, headers } from '../../services/service'


function AjoutDossierVoyage(props) {
    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        code: null,
        numero: null,
        ref_aller: null,
        date_creation: defaultDate,
        remorque: null,
        voyage: null,
        date_chargement: defaultDate,
        date_dechargement: defaultDate,
        montant_ht: null,
        etat: null,
        chauffeur: null,
        vehicule: null,
        client: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    const [vehicules, setVehicules] = useState([])
    const [chauffeurs, setChauffeurs] = useState([])
    const [clients, setClients] = useState([])
  
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
            numero: datas.numero,
            ref_aller: datas.ref_aller,
            date_creation: datas.date_creation,
            remorque: datas.remorque,
            voyage: datas.voyage,
            date_chargement: datas.date_chargement,
            date_dechargement: datas.date_dechargement,
            montant_ht: datas.montant_ht,
            etat: datas.etat,
            chauffeur: datas.chauffeur,
            vehicule: datas.vehicule,
            client: datas.client
        };
        axios
            .post(`${baseURL}/dossier-voyage/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    code: response.data.code,
                    numero: response.data.numero,
                    ref_aller: response.data.ref_aller,
                    date_creation: response.data.date_creation,
                    remorque: response.data.remorque,
                    voyage: response.data.voyage,
                    date_chargement: response.data.date_chargement,
                    date_dechargement: response.data.date_dechargement,
                    montant_ht: response.data.montant_ht,
                    etat: response.data.etat,
                    chauffeur: response.data.chauffeur,
                    vehicule: response.data.vehicule,
                    client: response.data.client
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

    const retrieveChauffeurs = () => {
        axios
            .get(`${baseURL}/personnel/?qualification=Chauffeur`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setChauffeurs(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const retrieveClients = () => { /* FILTER CLIENTS */
        axios
            .get(`${baseURL}/tiers/`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setClients(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }
  
    const { open, setOpen } = props
  
    useEffect(() => {
        retrieveVehicules()
        retrieveChauffeurs()
        retrieveClients()
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
                        Ajouter un dossier de voyage
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} type={'text'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'code'} label={'Code'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'numero'} label={'Numéro'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'text'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'ref_aller'} label={'Référence aller'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField disabled={true} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_creation'} label={'Date de création'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.chauffeur=e.target.value}}>
                    <option selected value=''>-- Chauffeur --</option>
                    {chauffeurs.map(c=>
                        <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <Autocomplete
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={vehicules.map((e) => e.immatriculation)}>
                </Autocomplete>

                <Autocomplete
                    onChange={(event, newValue) => {datas.remorque=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'remorque'}
                    renderInput={(params) => <TextField {...params} label={'Remorque'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['120TUN2231','157TUN9820','120TUN4563']}>
                </Autocomplete>
                
                {/* <Autocomplete
                    onChange={(event, newValue) => {datas.client=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'client'}
                    renderInput={(params) => <TextField {...params} label={'Client'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={clients.map((e) => e.id.toString())}>
                </Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.client=e.target.value}}>
                    <option selected value=''>-- Client --</option>
                    {clients.map(c=>
                        <option value={c.id}>{c.intitule}</option>
                    )}
                </select>

                <TextField onChange={handleDataChange} type={'text'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'voyage'} label={'Voyage'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_chargement'} label={'Date de chargement'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_dechargement'} label={'Date de déchargement'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_ht'} label={'Montant HT'} variant={'outlined'} color={'secondary'}></TextField>

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.etat=e.target.value}}>
                    <option value={''}>-- Etat --</option>
                    <option value={true}>en cours</option>
                    <option value={false}>facturé</option>
                </select>


                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutDossierVoyage