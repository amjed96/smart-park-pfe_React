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


function AjoutReglementEcheance(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        rg_no: null,
        dr_no: null,
        do_domaine: null,
        do_type: null,
        do_piece: null,
        rc_montant: null,
        rg_type_reg: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            rg_no: datas.rg_no,
            dr_no: datas.dr_no,
            do_domaine: datas.do_domaine,
            do_type: datas.do_type,
            do_piece: datas.do_piece,
            rc_montant: datas.rc_montant,
            rg_type_reg: datas.rg_type_reg
        }
        console.log(data)
        axios
            .post(`${baseURL}/regl-ech/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    rg_no: response.data.rg_no,
                    dr_no: response.data.dr_no,
                    do_domaine: response.data.do_domaine,
                    do_type: response.data.do_type,
                    do_piece: response.data.do_piece,
                    rc_montant: response.data.rc_montant,
                    rg_type_reg: response.data.rg_type_reg
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
                        Ajouter un règlement échéance
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_no'} label={'rg_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_no'} label={'dr_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_domaine'} label={'do_domaine'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_type'} label={'do_type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_piece'} label={'do_piece'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rc_montant'} label={'rc_montant'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_type_reg'} label={'rg_type_reg'} variant={'outlined'} color={'secondary'}></TextField>
                

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutReglementEcheance