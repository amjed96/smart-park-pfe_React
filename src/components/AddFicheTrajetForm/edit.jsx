import { 
    Dialog,
    DialogTitle,
    Typography,
    Button,
    DialogContent,
    TextField,
    Autocomplete
} from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL, headers } from "../../services/service"

function EditFicheTrajet(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

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
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/fiche-trajet/${id}/`, {
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
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
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
          .patch(`${baseURL}/fiche-trajet/${id}/`, data, {
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
            // setSubmitted(true);
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

    useEffect(() => {
        retrieveDatas()
        retrieveClients()
    }, [openedit])

    return(
        <Dialog
            open={openedit}
            onClose={() => setOpenedit(false)}
            maxWidth={'md'}
        >
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        style={{flexGrow:1}}
                    >
                        Modifier fiche trajet
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                {/**/}

                {/* <Autocomplete
                    onChange={(event, newValue) => {datas.chauffeur=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'chauffeur'}
                    renderInput={(params) => <TextField {...params} label={'Chauffeur'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={chauffeurs.map((e) => e.id.toString())}>
                </Autocomplete> */}

                {/* <Autocomplete
                    value={datas.client}
                    onChange={(event, newValue) => {datas.client=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'client'}
                    renderInput={(params) => <TextField {...params} label={'Client'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={clients.map((e) => e.id.toString())}>
                </Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.client=e.target.value}}>
                    <option value=''>-- Client --</option>
                    {clients.map(c=>
                        c.id === datas.client ?
                        <option selected value={c.id}>{c.intitule}</option>
                        : <option value={c.id}>{c.intitule}</option>
                    )}
                </select>

                <TextField value={datas.nom} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nom'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.marchandise} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'marchandise'} label={'Marchandise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.trajet} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'trajet'} label={'Trajet'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.unite} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'unite'} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.type_prestation} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'type_prestation'} label={'Type prestation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.categorie} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'categorie'} label={'Catégorie'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField value={datas.date_debut} onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_fin} onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField value={datas.prix} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.prix_retour} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix_retour'} label={'Prix retour'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditFicheTrajet