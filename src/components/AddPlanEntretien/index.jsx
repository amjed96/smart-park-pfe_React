import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutPlanEntretien(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        operation: null,
        type: null,
        frequence: null,
        unite: null,
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
            operation: datas.operation,
            type: datas.type,
            frequence: datas.frequence,
            unite: datas.unite,
            vehicule: datas.vehicule
        };
        axios
            .post(`${baseURL}/plan-entretien/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    operation: response.data.operation,
                    type: response.data.type,
                    frequence: response.data.frequence,
                    unite: response.data.unite,
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

                <TextField
                    onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'operation'} label={'Opération'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={vehicules.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'frequence'} label={'Fréquence'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.unite=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'unite'}
                    renderInput={(params) => <TextField {...params} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['Kilomètres','Heures','Date']}>
                </Autocomplete>

                <br/><Button onClick={() =>{submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutPlanEntretien