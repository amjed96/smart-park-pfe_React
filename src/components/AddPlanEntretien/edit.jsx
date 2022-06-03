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

function EditPlanEntretien(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        operation: null,
        type: null,
        frequence: null,
        unite: null,
        vehicule: null
    }
    const [datas, setDatas] = useState(initialDatasState)
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
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/plan-entretien/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                operation: response.data.operation,
                    type: response.data.type,
                    frequence: response.data.frequence,
                    unite: response.data.unite,
                    vehicule: response.data.vehicule
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            operation: datas.operation,
            type: datas.type,
            frequence: datas.frequence,
            unite: datas.unite,
            vehicule: datas.vehicule
        };
        axios
          .patch(`${baseURL}/plan-entretien/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                operation: response.data.operation,
                type: response.data.type,
                frequence: response.data.frequence,
                unite: response.data.unite,
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
                        Modifier plan entretien
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                
                <TextField value={datas.operation} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'operation'} label={'Opération'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    value={datas.vehicule}
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField value={datas.type} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.frequence} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'frequence'} label={'Fréquence'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    value={datas.unite}
                    onChange={(event, newValue) => {datas.unite=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'unite'}
                    renderInput={(params) => <TextField {...params} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['Kilomètres','Heures','Date']}>
                </Autocomplete>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditPlanEntretien