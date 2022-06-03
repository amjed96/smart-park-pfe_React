import { 
    Dialog,
    DialogTitle,
    Typography,
    Button,
    DialogContent,
    TextField,
    Autocomplete
} from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, headers } from "../../services/service";

function EditContratLocationFlotte(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
const initialContratLocationState = {
        date_debut: null,
        date_fin: null,
        marque: null,
        modele: null,
        prix: null,
        vehicule: null
    }
    const [contratlocation, setContratlocation] = useState(initialContratLocationState)
    const [engins, setEngins] = useState([])

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
    
    const handleContratLocationChange = (e) => {
        const { name, value } = e.target;
        setContratlocation({ ...contratlocation, [name]: value })
        console.log(value)
    }

    const retrieveContratlocation = () => {
        axios
          .get(`${baseURL}/contrat-location-flotte/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setContratlocation({
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                marque: response.data.marque,
                modele: response.data.modele,
                prix: response.data.prix,
                vehicule: response.data.vehicule
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateContratlocation = () => {
        let data = {
            date_debut: contratlocation.date_debut,
            date_fin: contratlocation.date_fin,
            marque: contratlocation.marque,
            modele: contratlocation.modele,
            prix: contratlocation.prix,
            vehicule: contratlocation.vehicule
        };
        axios
          .patch(`${baseURL}/contrat-location-flotte/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setContratlocation({
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                marque: response.data.marque,
                modele: response.data.modele,
                prix: response.data.prix,
                vehicule: response.data.vehicule
            });
            // setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    useEffect(() => {
        retrieveContratlocation()
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
                <TextField type={'date'} value={contratlocation.date_debut} onChange={handleContratLocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'date'} value={contratlocation.date_fin} onChange={handleContratLocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratlocation.marque} onChange={handleContratLocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'marque'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratlocation.modele} onChange={handleContratLocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'modele'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} value={contratlocation.prix} onChange={handleContratLocationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                
                <Autocomplete
                    value={contratlocation.vehicule}
                    onChange={(event, newValue) => {contratlocation.vehicule=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Engin'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e)=>e.immatriculation)}>
                </Autocomplete>
                

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateContratlocation(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditContratLocationFlotte