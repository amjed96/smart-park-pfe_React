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


function EditDemandeAchat(props) {

    /*let defaultDate = new Date().toISOString().split('T')[0]*/
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        demandeur: null,
        date: null,
        article: null,
        nombre: null,
        description: null,
        statut: null
    }
    const [datas, setDatas] = useState(initialDatasState)
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/demande-achat/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                demandeur: response.data.demandeur,
                date: response.data.date,
                article: response.data.article,
                nombre: response.data.nombre,
                description: response.data.description,
                statut: response.data.statut
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            demandeur: datas.demandeur,
            date: datas.date,
            article: datas.article,
            nombre: datas.nombre,
            description: datas.description,
            statut: datas.statut
        };
        axios
          .patch(`${baseURL}/demande-achat/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                demandeur: response.data.demandeur,
                date: response.data.date,
                article: response.data.article,
                nombre: response.data.nombre,
                description: response.data.description,
                statut: response.data.statut
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
                        Modifier demande achat
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

                <TextField value={datas.date} disabled={true} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField value={datas.article} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'article'} label={'Article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.nombre} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nombre'} label={'Nombre'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.description} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'description'} label={'Description'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditDemandeAchat