import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { baseURL, headers } from '../../services/service'

function AjoutFicheTrajet(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    
    /* Start API */
    const initialDatasState = {
        nom: null,
        marchandise: null,
        trajet: null,
        unite: null,
        type_prestation: null,
        categorie: null,
        date_debut: defaultDate,
        date_fin: defaultDate,
        prix: null,
        prix_retour: null,
        client: null
    }
  
    const [datas, setDatas] = useState(initialDatasState)
    const [clients, setClients] = useState([])
    /*const [chauffeurs, setChauffeurs] = useState([])*/
  
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(datas)
    }
    
    const submitDatas = () => {
        let data = {
            nom: datas.nom,
            marchandise: datas.marchandise,
            trajet: datas.trajet,
            unite: datas.unite,
            type_prestation: datas.type_prestation,
            categorie: datas.categorie,
            date_debut: datas.date_debut,
            date_fin: datas.date_fin,
            prix: datas.prix,
            prix_retour: datas.prix_retour,
            client: datas.client
        };
        axios
            .post(`${baseURL}/fiche-trajet/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setDatas({
                    nom: response.data.nom,
                    marchandise: response.data.marchandise,
                    trajet: response.data.trajet,
                    unite: response.data.unite,
                    type_prestation: response.data.type_prestation,
                    categorie: response.data.categorie,
                    date_debut: response.data.date_debut,
                    date_fin: response.data.date_fin,
                    prix: response.data.prix,
                    prix_retour: response.data.prix_retour,
                    client: response.data.client
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    const retrieveClients = () => {
        axios
            .get(`${baseURL}/tiers/`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setClients(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }
  
    const { open, setOpen } = props
  
    useEffect(() => {
        //retrieveChauffeurs()
        retrieveClients()
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
                        Ajouter un fiche trajet
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
                    onChange={(event, newValue) => {datas.chauffeur=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'chauffeur'}
                    renderInput={(params) => <TextField {...params} label={'Chauffeur'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={chauffeurs.map((e) => e.id.toString())}>
                </Autocomplete> */}

                {/* <Autocomplete
                    onChange={(event, newValue) => {datas.client=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'client'}
                    renderInput={(params) => <TextField {...params} label={'Client'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={clients.map((e) => e.id.toString())}>
                </Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.client=e.target.value}}>
                    <option selected value=''>-- Client --</option>
                    {clients.map(c=>
                        <option value={c.id}>{c.intitule}</option>
                    )}
                </select>

                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nom'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'marchandise'} label={'Marchandise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'trajet'} label={'Trajet'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'unite'} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'type_prestation'} label={'Type prestation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'categorie'} label={'Catégorie'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix_retour'} label={'Prix retour'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button onClick={() => {submitDatas();setOpen(false)}} sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutFicheTrajet