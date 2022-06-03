import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Autocomplete
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from "../../services/service"

function AjoutAffectation(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    /* Start API */
    const initialAffectationState = {
        date_debut: defaultDate,
        date_fin: defaultDate,
        etat: true,
        vehicule: null,
        chauffeur: null
    }
    const [affectation, setAffectation] = useState(initialAffectationState)
    const [engins, setEngins] = useState([])
    const [chauffeurs, setChauffeurs] = useState([])

    const handleAffectationChange = (e) => {
        const { name, value } = e.target;
        setAffectation({ ...affectation, [name]: value })
        console.log(affectation)
    }

    const submitAffectation = () => {
        let data = {
            date_debut: affectation.date_debut,
            date_fin: affectation.date_fin,
            etat: affectation.etat,
            vehicule: affectation.vehicule,
            chauffeur: affectation.chauffeur,
        };
        axios
            .post(`${baseURL}/affectation/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setAffectation({
                    date_debut: response.data.date_debut,
                    date_fin: response.data.date_fin,
                    etat: response.data.etat,
                    vehicule: response.data.vehicule,
                    chauffeur: response.data.chauffeur,
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    const affecterChauffeur = (id) => {
        axios
            .post(`${baseURL}/personnel/${id}/affecter/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((e) => {
                console.error(e);
            })
    }

    const affecterVehicule = (id) => {
        axios
            .post(`${baseURL}/vehicule/${id}/affecter/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((e) => {
                console.error(e);
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

    useEffect(() => {
        retrieveChauffeurs()
        retrieveEngins()
    },[])
    /* End API */

    const { open, setOpen } = props

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
                        Ajouter une affectation
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <select className='form-select mt-2' onChange={(e,newValue)=>{affectation.chauffeur=e.target.value}}>
                    <option selected value=''>-- Chauffeur --</option>
                    {chauffeurs.map(c=>
                        <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <select className='form-select mt-2' onChange={(e,newValue)=>{affectation.vehicule=e.target.value}}>
                <option selected value=''>-- Engin --</option>
                    {engins.map(c=>
                        <option value={c.immatriculation}>{c.immatriculation}</option>
                    )}
                </select>

                <TextField onChange={handleAffectationChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} type={'date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleAffectationChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} type={'date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button onClick={() => {submitAffectation();affecterChauffeur(affectation.chauffeur);affecterVehicule(affectation.vehicule);setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutAffectation