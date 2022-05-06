import React, { useState, useEffect } from 'react'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios';
import { baseURL, headers } from "../../services/service"


function AjoutContratVente(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    /* Start API */
    const initialContratventeState = {
      id: null,
      date: defaultDate,
      vendeur: null,
      marque: null,
      modele: null,
      chassis: null,
      moteur: null,
      prix: null,
      vehicule: null
  }

  const [contratvente, setContratvente] = useState(initialContratventeState)
  const [engins, setEngins] = useState([])

  const handleContratventeChange = (e) => {
      const { name, value } = e.target;
      setContratvente({ ...contratvente, [name]: value })
      console.log(contratvente)
  }

  /*const handleEnginChange = (e) => {
      const { name, value } = e.target;
      setConsommation({...consommation, [name]: value})
  }*/
  
  const submitContratvente = () => {
      let data = {
        date: contratvente.date,
        vendeur: contratvente.vendeur,
        marque: contratvente.marque,
        modele: contratvente.modele,
        chassis: contratvente.chassis,
        moteur: contratvente.moteur,
        prix: contratvente.prix,
        vehicule: contratvente.vehicule,
      };
      axios
          .post(`${baseURL}/contrat-achat/`, data, {
              /*headers: {
                  headers,
              },*/
          })
          .then((response) => {
            setContratvente({
                  date: response.data.date,
                  vendeur: response.data.vendeur,
                  marque: response.data.marque,
                  modele: response.data.modele,
                  chassis: response.data.chassis,
                  moteur: response.data.moteur,
                  prix: response.data.prix,
                  vehicule: response.data.vehicule,
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

  useEffect(() => {
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
                        Ajouter un contrat d'achat
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleContratventeChange} name={'date'} type={"date"} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratventeChange} name={'vendeur'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Vendeur'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} onChange={handleContratventeChange} name={'vehicule'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>} options={engins.map((e)=>e.immatriculation)}></Autocomplete>
                <TextField onChange={handleContratventeChange} name={'marque'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratventeChange} name={'modele'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratventeChange} name={'chassis'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Chassis'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField  onChange={handleContratventeChange} name={'moteur'} {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>
                <br/><Button onClick={() => {submitContratvente();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutContratVente