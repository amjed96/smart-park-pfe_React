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

function EditContratVente(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
const initialContratVenteState = {
        date: null,
        vendeur: null,
        marque: null,
        modele: null,
        chassis: null,
        moteur: null,
        prix: null,
        vehicule: null
    }
    const [contratvente, setContratvente] = useState(initialContratVenteState)
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
    
    const handleContratVenteChange = (e) => {
        const { name, value } = e.target;
        setContratvente({ ...contratvente, [name]: value })
        console.log(value)
    }

    const retrieveContratvente = () => {
        axios
          .get(`${baseURL}/contrat-achat/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setContratvente({
                date: response.data.date,
                vendeur: response.data.vendeur,
                marque: response.data.marque,
                modele: response.data.modele,
                chassis: response.data.chassis,
                moteur: response.data.moteur,
                prix: response.data.prix,
                vehicule: response.data.vehicule
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateContratvente = () => {
        let data = {
            date: contratvente.date,
            vendeur: contratvente.vendeur,
            marque: contratvente.marque,
            modele: contratvente.modele,
            chassis: contratvente.chassis,
            moteur: contratvente.moteur,
            prix: contratvente.prix,
            vehicule: contratvente.vehicule
        };
        axios
          .patch(`${baseURL}/contrat-achat/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setContratvente({
                date: response.data.date,
                vendeur: response.data.vendeur,
                marque: response.data.marque,
                modele: response.data.modele,
                chassis: response.data.chassis,
                moteur: response.data.moteur,
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
        retrieveContratvente()
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
                        Modifier constrat vente
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField type={'date'} value={contratvente.date} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratvente.vendeur} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'vendeur'} label={'Vendeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratvente.marque} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'marque'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratvente.modele} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'modele'} label={'Modele'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={contratvente.chassis} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'chassis'} label={'Chassis'} variant={'outlined'} color={'secondary'}></TextField>
                
                <Autocomplete
                    value={contratvente.moteur}
                    onChange={(event, newValue) => {contratvente.moteur=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'moteur'}
                    renderInput={(params) => <TextField {...params} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['essence','diesel']}>
                </Autocomplete>
                
                <TextField type={'number'} value={contratvente.prix} onChange={handleContratVenteChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                
                <Autocomplete
                    value={contratvente.vehicule}
                    onChange={(event, newValue) => {contratvente.vehicule=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Vehicule'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e)=>e.immatriculation)}>
                </Autocomplete>
                
                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateContratvente(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditContratVente