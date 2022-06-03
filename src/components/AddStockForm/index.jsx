import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from '../../services/service'


function AjoutStock(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        reference: null,
        article: null,
        codecasier: null,
        dateachat: defaultDate,
        quantite: null,
        unite: null
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
            reference: datas.reference,
            article: datas.article,
            codecasier: datas.codecasier,
            dateachat: datas.dateachat,
            quantite: datas.quantite,
            unite: datas.unite
        };
        axios
            .post(`${baseURL}/stock/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    reference: response.data.reference,
                    article: response.data.article,
                    codecasier: response.data.codecasier,
                    dateachat: response.data.dateachat,
                    quantite: response.data.quantite,
                    unite: response.data.unite
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
                        Ajouter un article
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'reference'} label={'Référence'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'article'} label={'Article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'codecasier'} label={'Code casier'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dateachat'} label={"Date d'achat"} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'quantite'} label={'Quantité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Unité'} name={'unite'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutStock