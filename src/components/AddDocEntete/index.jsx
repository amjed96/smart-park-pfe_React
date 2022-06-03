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


function AjoutDocEntete(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        do_domaine: null,
        do_type: null,
        do_piece: null,
        cb_do_piece: null,
        do_date: defaultDate,
        do_ref: null,
        do_tiers: null,
        cb_do_tiers: null,
        co_no: null,
        cb_co_no: null,
        do_period: null,
        do_devise: null,
        do_cours: null,
        de_no: null,
        cb_de_no: null,
        li_no: null,
        cb_li_no: null,
        cb_ct_num_payeur: null,
        do_exp_edit: null,
        do_nb_facture: null,
        do_bl_facture: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            do_domaine: datas.do_domaine,
            do_type: datas.do_type,
            do_piece: datas.do_piece,
            cb_do_piece: datas.cb_do_piece,
            do_date: datas.do_date,
            do_ref: datas.do_ref,
            do_tiers: datas.do_tiers,
            cb_do_tiers: datas.cb_do_tiers,
            co_no: datas.co_no,
            cb_co_no: datas.cb_co_no,
            do_period: datas.do_period,
            do_devise: datas.do_devise,
            do_cours: datas.do_cours,
            de_no: datas.de_no,
            cb_de_no: datas.cb_de_no,
            li_no: datas.li_no,
            cb_li_no: datas.cb_li_no,
            cb_ct_num_payeur: datas.cb_ct_num_payeur,
            do_exp_edit: datas.do_exp_edit,
            do_nb_facture: datas.do_nb_facture,
            do_bl_facture: datas.do_bl_facture
        }
        console.log(data)
        axios
            .post(`${baseURL}/doc-entete/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    compte: response.data.compte,
                    do_domaine: response.data.do_domaine,
                    do_type: response.data.do_type,
                    do_piece: response.data.do_piece,
                    cb_do_piece: response.data.cb_do_piece,
                    do_date: response.data.do_date,
                    do_ref: response.data.do_ref,
                    do_tiers: response.data.do_tiers,
                    cb_do_tiers: response.data.cb_do_tiers,
                    co_no: response.data.co_no,
                    cb_co_no: response.data.cb_co_no,
                    do_period: response.data.do_period,
                    do_devise: response.data.do_devise,
                    do_cours: response.data.do_cours,
                    de_no: response.data.de_no,
                    cb_de_no: response.data.cb_de_no,
                    li_no: response.data.li_no,
                    cb_li_no: response.data.cb_li_no,
                    cb_ct_num_payeur: response.data.cb_ct_num_payeur,
                    do_exp_edit: response.data.do_exp_edit,
                    do_nb_facture: response.data.do_nb_facture,
                    do_bl_facture: response.data.do_bl_facture
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
                        Ajouter un en tête document
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_domaine'} label={'do_domaine'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_type'} label={'do_type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_piece'} label={'do_piece'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_do_piece'} label={'cb_do_piece'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} defaultValue={defaultDate} name={'do_date'} label={'do_date'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_ref'} label={'do_ref'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_tiers'} label={'do_tiers'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_do_tiers'} label={'cb_do_tiers'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'co_no'} label={'co_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_co_no'} label={'cb_co_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_period'} label={'do_period'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_devise'} label={'do_devise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_cours'} label={'do_cours'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'de_no'} label={'de_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_de_no'} label={'cb_de_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'li_no'} label={'li_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_li_no'} label={'cb_li_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_ct_num_payeur'} label={'cb_ct_num_payeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_exp_edit'} label={'do_exp_edit'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_nb_facture'} label={'do_nb_facture'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'do_bl_facture'} label={'do_bl_facture'} variant={'outlined'} color={'secondary'}></TextField>
                

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutDocEntete