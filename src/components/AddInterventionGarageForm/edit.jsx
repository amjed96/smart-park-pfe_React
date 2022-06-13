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

function EditInterventionGarage(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        date_debut: defaultDate,
        date_fin: defaultDate,
        objet: null,
        entreprise: null,
        montant_mo_ht: null,
        montant_pieces_ht: null,
        montant_total_ht: null,
        collaborateur: null,
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
          .get(`${baseURL}/intervention-garage/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                objet: response.data.objet,
                entreprise: response.data.entreprise,
                montant_mo_ht: response.data.montant_mo_ht,
                montant_pieces_ht: response.data.montant_pieces_ht,
                montant_total_ht: response.data.montant_total_ht,
                collaborateur: response.data.collaborateur,
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
            date_debut: datas.date_debut,
            date_fin: datas.date_fin,
            objet: datas.objet,
            entreprise: datas.entreprise,
            montant_mo_ht: datas.montant_mo_ht,
            montant_pieces_ht: datas.montant_pieces_ht,
            montant_total_ht: datas.montant_total_ht,
            collaborateur: datas.collaborateur,
            vehicule: datas.vehicule
        };
        axios
          .patch(`${baseURL}/intervention-garage/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                date_debut: response.data.date_debut,
                date_fin: response.data.date_fin,
                objet: response.data.objet,
                entreprise: response.data.entreprise,
                montant_mo_ht: response.data.montant_mo_ht,
                montant_pieces_ht: response.data.montant_pieces_ht,
                montant_total_ht: response.data.montant_total_ht,
                collaborateur: response.data.collaborateur,
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
                        Modifier intervention garage
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                
                <Autocomplete
                    value={datas.vehicule}
                    onChange={(event, newValue) => {datas.vehicule=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'vehicule'}
                    renderInput={(params) => <TextField {...params} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={engins.map((e) => e.immatriculation)}>
                </Autocomplete>

                <TextField value={datas.date_debut} onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_debut'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_fin} onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date_fin'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField
                    value={datas.objet}
                    onChange={handleDataChange}
                    multiline
                    rows={2}
                    maxRows={4} sx={{width: '80%', margin: '10px'}} size={'small'} name={'objet'} label={'Objet'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField value={datas.entreprise} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'entreprise'} label={'Entreprise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.montant_mo_ht} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_mo_ht'} label={"Montant main d'oeuvre HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.montant_pieces_ht} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_pieces_ht'} label={"Montant pièces HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.montant_total_ht} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'montant_total_ht'} label={"Montant total HT"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.collaborateur} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'collaborateur'} label={"Collaborateur"} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditInterventionGarage