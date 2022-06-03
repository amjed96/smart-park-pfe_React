import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutIntervention(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        date_debut: defaultDate,
        date_fin: defaultDate,
        objet: null,
        entreprise: null,
        montant_mo_ht: null,
        montant_pieces_ht: null,
        montant_total_ht: null,
        collaborateur: null,
        vehicule: null
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
            date_debut: datas.date_debut,
            date_fin: datas.date_fin,
            objet: datas.objet,
            entreprise: datas.entreprise,
            montant_mo_ht: datas.montant_mo_ht,
            montant_pieces_ht: datas.montant_pieces_ht,
            montant_total_ht: datas.montant_total_ht,
            collaborateur: datas.collaborateur,
            vehicule: datas.vehicule
        };
        axios
            .post(`${baseURL}/intervention/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
              setDatas({
                    date_debut: response.data.date_debut,
                    date_fin: response.data.date_fin,
                    objet: response.data.objet,
                    entreprise: response.data.entreprise,
                    montant_mo_ht: response.data.montant_mo_ht,
                    montant_pieces_ht: response.data.montant_pieces_ht,
                    montant_total_ht: response.data.montant_total_ht,
                    collaborateur: response.data.collaborateur,
                    vehicule: response.data.vehicule
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }

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
                        Ajouter une intervention
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
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={vehicules.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange}
                    multiline
                    rows={2}
                    maxRows={4} sx={{width: '80%', margin: '10px'}} size={'small'} name={'objet'} label={'Objet'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'entreprise'} label={'Entreprise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_mo_ht'} label={"Montant main d'oeuvre HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_pieces_ht'} label={"Montant pièces HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_total_ht'} label={"Montant total HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'collaborateur'} label={"Collaborateur"} variant={'outlined'} color={'secondary'}></TextField>
                
                
                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutIntervention