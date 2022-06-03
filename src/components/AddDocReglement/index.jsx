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


function AjoutDocReglement(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        dr_no: null,
        do_domaine: null,
        do_type: null,
        do_piece: null,
        dr_type_regl: null,
        dr_date: defaultDate,
        dr_libelle: null,
        dr_pourcent: null,
        dr_montant: null,
        dr_montant_dev: null,
        dr_equil: null,
        ec_no: null,
        dr_regle: null,
        n_reglement: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            dr_no: datas.dr_no,
            do_domaine: datas.do_domaine,
            do_type: datas.do_type,
            do_piece: datas.do_piece,
            dr_type_regl: datas.dr_type_regl,
            dr_date: datas.dr_date,
            dr_libelle: datas.dr_libelle,
            dr_pourcent: datas.dr_pourcent,
            dr_montant: datas.dr_montant,
            dr_montant_dev: datas.dr_montant_dev,
            dr_equil: datas.dr_equil,
            ec_no: datas.ec_no,
            dr_regle: datas.dr_regle,
            n_reglement: datas.n_reglement
        }
        console.log(data)
        axios
            .post(`${baseURL}/doc-regl/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    dr_no: response.data.dr_no,
                    do_domaine: response.data.do_domaine,
                    do_type: response.data.do_type,
                    do_piece: response.data.do_piece,
                    dr_type_regl: response.data.dr_type_regl,
                    dr_date: response.data.dr_date,
                    dr_libelle: response.data.dr_libelle,
                    dr_pourcent: response.data.dr_pourcent,
                    dr_montant: response.data.dr_montant,
                    dr_montant_dev: response.data.dr_montant_dev,
                    dr_equil: response.data.dr_equil,
                    ec_no: response.data.ec_no,
                    dr_regle: response.data.dr_regle,
                    n_reglement: response.data.n_reglement
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
                        Ajouter un document règlement
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_no'} label={'dr_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_domaine'} label={'do_domaine'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_type'} label={'do_type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_piece'} label={'do_piece'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_type_regl'} label={'dr_type_regl'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_date'} label={'dr_date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_libelle'} label={'dr_libelle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_pourcent'} label={'dr_pourcent'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_montant'} label={'dr_montant'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_montant_dev'} label={'dr_montant_dev'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_equil'} label={'dr_equil'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'ec_no'} label={'ec_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dr_regle'} label={'dr_regle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'n_reglement'} label={'n_reglement'} variant={'outlined'} color={'secondary'}></TextField>
                

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutDocReglement