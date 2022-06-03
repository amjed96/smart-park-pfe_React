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

function EditContratLocation(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        vehicule: null,
        date_debut: defaultDate,
        date_fin: defaultDate,
        marque: null,
        modele: null,
        prix: null
    }
    const [datas, setDatas] = useState(initialDatasState)
    const [engins, setEngins] = useState([])
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/contrat-location/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                vehicule: response.data.vehicule,
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                marque: response.data.marque,
                modele: response.data.modele,
                prix: response.data.prix
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            vehicule: datas.vehicule,
            date_debut: datas.date_debut,
            date_fin: datas.date_fin,
            marque: datas.marque,
            modele: datas.modele,
            prix: datas.prix
        };
        axios
          .patch(`${baseURL}/contrat-location/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                vehicule: response.data.vehicule,
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                marque: response.data.marque,
                modele: response.data.modele,
                prix: response.data.prix
            });
            // setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const retrieveEngins = () => {
        axios
            .get(`${baseURL}/vehicule/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setEngins(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        retrieveDatas()
        retrieveEngins()
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
                        Modifier contrat location
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

                <Autocomplete
                    value={datas.vehicule}
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    name={'vehicule'}
                    size={'small'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation Engin'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField value={datas.date_debut} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_fin} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                {/* <TextField onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'locataire'} label={'Locataire'} variant={'outlined'} color={'secondary'}></TextField> */}
                <TextField value={datas.marque} onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'marque'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.modele} onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'modele'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.prix} onChange={handleDataChange} type={'number'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                {/*<Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>*/}
                

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditContratLocation