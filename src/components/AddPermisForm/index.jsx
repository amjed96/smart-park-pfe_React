import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from "../../services/service"


function AjoutPermis(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
      reference: null,
      date: defaultDate,
      type: null,
      personnel: null
    }

    const [datas, setDatas] = useState(initialDatasState)
    const [personnels, setPersonnels] = useState([])

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        /*console.log(datas)*/
    }
  
    const submitDatas = () => {
        
      let data = {
        reference: datas.reference,
        date: datas.date,
        type: datas.type,
        personnel: datas.personnel
      };
      console.log(data)
      axios
          .post(`${baseURL}/permis/`, data, {
              /*headers: {
                  headers,
              },*/
          })
          .then((response) => {
            setDatas({
                  reference: response.data.reference,
                  date: response.data.date,
                  type: response.data.type,
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
            .get(`${baseURL}/personnel/get_personnel_permis/`, {
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
                        Ajouter un permis
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'reference'} label={'Référence'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                {/* <Autocomplete
                    onChange={(event, newValue) => {datas.personnel=newValue}} 
                    sx={{width: '40%', margin: '10px'}} 
                    size={'small'} 
                    name={'personnel'} 
                    renderInput={(params) => <TextField {...params} label={'Personnel'} variant={'outlined'} color={'secondary'}></TextField>} 
                    options={personnels.map(e => e.id.toString())}></Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.personnel=e.target.value}}>
                    <option selected value=''>-- Personnel --</option>
                    {personnels.map(c=>
                        <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <Autocomplete onChange={(event, newValue) => {datas.type=newValue}} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type'} renderInput={(params) => <TextField {...params} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>} options={['A1','A','B','B+E','C','C+E','D','D1','D+E','H']}></Autocomplete>

                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutPermis