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

function EditConsommation(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialConsommationState = {
        mois: null,
        type: null,
        kilometrage: null,
        consommation_totale: null,
        consommation: null,
        vehicule: null
    }
    const [consommation, setConsommation] = useState(initialConsommationState)
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
    
    const handleConsommationChange = (e) => {
        const { name, value } = e.target;
        setConsommation({ ...consommation, [name]: value })
        console.log(value)
    }

    const retrieveConsommation = () => {
        axios
          .get(`${baseURL}/consommation/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setConsommation({
                mois: response.data.mois,
                type: response.data.type,
                kilometrage: response.data.kilometrage,
                consommation_totale: response.data.consommation_totale,
                consommation: response.data.consommation,
                vehicule: response.data.vehicule
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateConsommation = () => {
        let data = {
            mois: consommation.mois,
            type: consommation.type,
            kilometrage: consommation.kilometrage,
            consommation_totale: consommation.consommation_totale,
            consommation: consommation.consommation,
            vehicule: consommation.vehicule
        };
        axios
          .patch(`${baseURL}/consommation/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setConsommation({
                mois: response.data.mois,
                type: response.data.type,
                kilometrage: response.data.kilometrage,
                consommation_totale: response.data.consommation_totale,
                consommation: response.data.consommation,
                vehicule: response.data.vehicule,
            });
            // setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    useEffect(() => {
        retrieveConsommation()
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
                        Modifier consommation
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField type={'date'} value={consommation.mois} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'mois'} label={'Mois'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} value={consommation.type} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete> {/* TO CHECK */}
                <TextField value={consommation.kilometrage} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'kilometrage'} label={'Kilometrage'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={consommation.consommation_totale} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation_totale'} label={'Consommation totale'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={consommation.consommation} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation'} label={'Consommation'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} value={consommation.vehicule} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'vehicule'} label={'Vehicule'} variant={'outlined'} color={'secondary'}></TextField>} options={engins.map((e) => e.immatriculation)}></Autocomplete>
 
                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateConsommation(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditConsommation