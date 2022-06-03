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

function EditFournisseur(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        compte: null,
        intitule: null,
        abrege: null,
        compte_collectif: null,
        qualite: null,
        interlocuteur: null,
        commentaire: null,
        type: true
    }
    const [datas, setDatas] = useState(initialDatasState)
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/tiers/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                compte: response.data.compte,
                intitule: response.data.intitule,
                abrege: response.data.abrege,
                compte_collectif: response.data.compte_collectif,
                qualite: response.data.qualite,
                interlocuteur: response.data.interlocuteur,
                commentaire: response.data.commentaire,
                type: response.data.type
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            compte: datas.compte,
            intitule: datas.intitule,
            abrege: datas.abrege,
            compte_collectif: datas.compte_collectif,
            qualite: datas.qualite,
            interlocuteur: datas.interlocuteur,
            commentaire: datas.commentaire,
            type: datas.type
        };
        axios
          .patch(`${baseURL}/tiers/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                compte: response.data.compte,
                intitule: response.data.intitule,
                abrege: response.data.abrege,
                compte_collectif: response.data.compte_collectif,
                qualite: response.data.qualite,
                interlocuteur: response.data.interlocuteur,
                commentaire: response.data.commentaire,
                type: response.data.type
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
                        Modifier fournisseur
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

                <TextField value={datas.compte} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'compte'} label={'Compte tiers'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.intitule} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'intitule'} label={'Intitulé'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.abrege} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'abrege'} label={'Abrégé'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.compte_collectif} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'compte_collectif'} label={'Compte collectif'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.qualite} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'qualite'} label={'Qualité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.interlocuteur} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'interlocuteur'} label={'Interlocuteur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.commentaire} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'commentaire'} label={'Commentaire'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditFournisseur