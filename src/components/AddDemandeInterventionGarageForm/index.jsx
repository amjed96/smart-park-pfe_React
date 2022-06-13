import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutDemandeGarage(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        date_demande: defaultDate,
        type: null,
        description: null,
        etat: "en cours",
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
            date_demande: datas.date_demande,
            type: datas.type,
            description: datas.description,
            etat: true,
            vehicule: datas.vehicule
        };
        axios
            .post(`${baseURL}/demande-intervention-garage/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    date_demande: response.data.date_demande,
                    type: response.data.type,
                    description: response.data.description,
                    etat: response.data.etat,
                    vehicule: response.data.vehicule
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
                        Ajouter une demande d'intervention au garage
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} disabled={'true'} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_demande'} label={'Date demande'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={vehicules.map((e) => e.immatriculation)}>
                </Autocomplete>
                <Autocomplete
                    onChange={(event, newValue) => {datas.type=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'type'}
                    renderInput={(params) => <TextField {...params} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['préventive','curative']}>
                </Autocomplete>

                <TextField onChange={handleDataChange}
                    multiline
                    rows={2}
                    maxRows={4} sx={{width: '80%', margin: '10px'}} size={'small'} name={'description'} label={'Description'} variant={'outlined'} color={'secondary'}>
                </TextField>


                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutDemandeGarage