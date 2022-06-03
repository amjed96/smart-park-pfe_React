import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Typography
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from '../../services/service'


function AjoutDemandeAchat(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        demandeur: null,
        date: defaultDate,
        article: null,
        nombre: null,
        description: null,
        statut: "en attente"
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    /*const [chauffeurs, setChauffeurs] = useState([])*/
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            demandeur: datas.demandeur,
            date: datas.date,
            article: datas.article,
            nombre: datas.nombre,
            description: datas.description,
            statut: datas.statut
        };
        console.log(data)
        axios
            .post(`${baseURL}/demande-achat/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    demandeur: response.data.demandeur,
                    date: response.data.date,
                    article: response.data.article,
                    nombre: response.data.nombre,
                    description: response.data.description,
                    statut: response.data.statut
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }
  
    const { open, setOpen } = props
  
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
                        Ajouter une demande d'achat
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField disabled={true} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'article'} label={'Article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nombre'} label={'Nombre'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'description'} label={'Description'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button onClick={() => {submitDatas(); setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutDemandeAchat