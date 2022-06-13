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


function EditDemandeGarage(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        date_demande: defaultDate,
        type: null,
        description: null,
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
          .get(`${baseURL}/demande-intervention-garage/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                date_demande: response.data.date_demande,
                type: response.data.type,
                description: response.data.description,
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
            date_demande: datas.date_demande,
            type: datas.type,
            description: datas.description,
            vehicule: datas.vehicule
        };
        axios
          .patch(`${baseURL}/demande-intervention-garage/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                date_demande: response.data.date_demande,
                type: response.data.type,
                description: response.data.description,
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
                        Modifier demande intervention garage
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField value={datas.date_demande} onChange={handleDataChange} disabled={'true'} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_demande'} label={'Date demande'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    value={datas.vehicule}
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e) => e.immatriculation)}>
                </Autocomplete>
                <Autocomplete
                    value={datas.type}
                    onChange={(event, newValue) => {datas.type=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'type'}
                    renderInput={(params) => <TextField {...params} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['préventive','curative']}>
                </Autocomplete>

                <TextField
                    value={datas.description}
                    onChange={handleDataChange}
                    multiline
                    rows={2}
                    maxRows={4}
                    sx={{width: '80%', margin: '10px'}} size={'small'} name={'description'} label={'Description'} variant={'outlined'} color={'secondary'}>
                </TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditDemandeGarage