import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutVisiteMedicale(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
      date: defaultDate,
      diagnostique: null,
      num_ordonnance: null,
      personnel: null
    }

    const [datas, setDatas] = useState(initialDatasState)
    const [personnels, setPersonnels] = useState([])

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
        date: datas.date,
        diagnostique: datas.diagnostique,
        num_ordonnance: datas.num_ordonnance,
        personnel: datas.personnel
      };
      axios
          .post(`${baseURL}/visite/`, data, {
              /*headers: {
                  headers,
              },*/
          })
          .then((response) => {
            setDatas({
                  date: response.data.date,
                  diagnostique: response.data.diagnostique,
                  num_ordonnance: response.data.num_ordonnance,
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
            .get(`${baseURL}/personnel/`, {
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
                        Ajouter une visite médicale
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                {/* <Autocomplete
                    onChange={(event, newValue) => {datas.personnel=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'personnel'}
                    renderInput={(params) => <TextField {...params} label={'Personnel'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={personnels.map((e) => e.id.toString())}></Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.personnel=e.target.value}}>
                    <option selected value=''>-- Personnel --</option>
                    {personnels.map(c=>
                        <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'diagnostique'} label={'Diagnostique'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'num_ordonnance'} label={'Numéro ordonnance'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutVisiteMedicale