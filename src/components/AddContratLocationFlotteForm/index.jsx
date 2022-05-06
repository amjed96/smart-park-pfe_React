import React, { useState, useEffect } from 'react'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import axios from 'axios';
import { baseURL, headers } from "../../services/service"


function AjoutContratLocationFlotte(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    /* Start API */
    const initialContratlocationState = {
        id: null,
        date_debut: defaultDate,
        date_fin: defaultDate,
        marque: null,
        modele: null,
        prix: null,
        vehicule: null
  }

  const [contratlocation, setContratlocation] = useState(initialContratlocationState)
  const [engins, setEngins] = useState([])

  const handleContratlocationChange = (e) => {
      const { name, value } = e.target;
      setContratlocation({ ...contratlocation, [name]: value })
      console.log(contratlocation)
  }

  /*const handleEnginChange = (e) => {
      const { name, value } = e.target;
      setConsommation({...consommation, [name]: value})
  }*/
  
  const submitContratlocation = () => {
      let data = {
        date_debut: contratlocation.date_debut,
        date_fin: contratlocation.date_fin,
        marque: contratlocation.marque,
        modele: contratlocation.modele,
        prix: contratlocation.prix,
        vehicule: contratlocation.vehicule
      };
      axios
          .post(`${baseURL}/contrat-location-flotte/`, data, {
              /*headers: {
                  headers,
              },*/
          })
          .then((response) => {
            setContratlocation({
                  date_debut: response.data.date_debut,
                  date_fin: response.data.date_fin,
                  marque: response.data.marque,
                  modele: response.data.modele,
                  prix: response.data.prix,
                  vehicule: response.data.vehicule
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
                <TextField onChange={handleContratlocationChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratlocationChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratlocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'marque'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratlocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'modele'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleContratlocationChange} type={'number'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params}  onChange={handleContratlocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'vehicule'} label={'Engin'} variant={'outlined'} color={'secondary'}></TextField>} options={engins.map((e) => e.immatriculation)}></Autocomplete>
                
                <br/><Button onClick={() => {submitContratlocation();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutContratLocationFlotte