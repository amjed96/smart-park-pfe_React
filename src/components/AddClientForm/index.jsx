import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from '../../services/service'


function AjoutClient(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        compte: null,
        intitule: null,
        abrege: null,
        compte_collectif: null,
        qualite: null,
        interlocuteur: null,
        commentaire: null,
        type: true
    }
  
    const [datas, setDatas] = useState(initialDatasState)
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            compte: datas.compte,
            intitule: datas.intitule,
            abrege: datas.abrege,
            compte_collectif: datas.compte_collectif,
            qualite: datas.qualite,
            interlocuteur: datas.interlocuteur,
            commentaire: datas.commentaire,
            type: datas.type
        }
        console.log(data)
        axios
            .post(`${baseURL}/tiers/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    compte: response.data.compte,
                    intitule: response.data.intitule,
                    abrege: response.data.abrege,
                    compte_collectif: response.data.compte_collectif,
                    qualite: response.data.qualite,
                    interlocuteur: response.data.interlocuteur,
                    commentaire: response.data.commentaire,
                    type: response.data.type
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
                        Ajouter un client
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'compte'} label={'Compte tiers'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'intitule'} label={'Intitulé'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'abrege'} label={'Abrégé'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'compte_collectif'} label={'Compte collectif'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'qualite'} label={'Qualité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'interlocuteur'} label={'Interlocuteur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'commentaire'} label={'Commentaire'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutClient