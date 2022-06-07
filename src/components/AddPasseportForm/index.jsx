import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutPasseport(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
      numero: null,
      type: null,
      nationalite: null,
      adresse_naissance: null,
      sexe: null,
      authorite_edition: null,
      date_edition: defaultDate,
      date_expiration: defaultDate,
      personnel: null
    }

    const [datas, setDatas] = useState(initialDatasState)
    const [personnels, setPersonnels] = useState([])

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
  
  const submitDatas = () => {
      let data = {
        numero: datas.numero,
        type: datas.type,
        nationalite: datas.nationalite,
        adresse_naissance: datas.adresse_naissance,
        sexe: datas.sexe,
        authorite_edition: datas.authorite_edition,
        date_edition: datas.date_edition,
        date_expiration: datas.date_expiration,
        personnel: datas.personnel
      };
      axios
          .post(`${baseURL}/passeport/`, data, {
              /*headers: {
                  headers,
              },*/
            })
            .then((response) => {
                setDatas({
                    numero: response.data.numero,
                    type: response.data.type,
                    nationalite: response.data.nationalite,
                    adresse_naissance: response.data.adresse_naissance,
                    sexe: response.data.sexe,
                    authorite_edition: response.data.authorite_edition,
                    date_edition: response.data.date_edition,
                    date_expiration: response.data.date_expiration,
                    personnel: response.data.personnel
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
  };
  const retrievePersonnels = () => {
      axios
          .get(`${baseURL}/personnel/get_personnel_passeport/`, {
          /*headers: {
              headers,
          },*/
          })
          .then((response) => {
            setPersonnels(response.data)
          })
          .catch((e) => {
              console.error(e)
          })
      
}

const { open, setOpen } = props

  useEffect(() => {
      retrievePersonnels()
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
                        Ajouter un passeport
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'numero'} label={'Numéro'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.personnel=e.target.value}}>
                    <option selected value=''>-- Personnel --</option>
                    {personnels.map(c=>
                        <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nationalite'} label={'Nationalité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'adresse_naissance'} label={'Adresse de naissance'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    onChange={(event, newValue) => {datas.sexe=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'sexe'}
                    renderInput={(params) => <TextField {...params} label={'Sexe'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['Masculin','Féminin']}>   
                </Autocomplete>

                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'authorite_edition'} label={"Authorité d'édition"} disabled={true} value={"Ministère de l'intérieur"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_edition'} label={'Date édition'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_expiration'} label={'Date expiration'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutPasseport