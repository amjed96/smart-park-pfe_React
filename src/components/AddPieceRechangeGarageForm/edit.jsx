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


function EditPieceRechangeGarage(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        code: null,
        nom: null,
        code_casier: null,
        famille: null,
        categorie: null,
        unite: null,
        prix: null,
        nombre: null
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
          .get(`${baseURL}/piece-rechange-garage/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                code: response.data.code,
                nom: response.data.nom,
                code_casier: response.data.code_casier,
                famille: response.data.famille,
                categorie: response.data.categorie,
                unite: response.data.unite,
                prix: response.data.prix,
                nombre: response.data.nombre
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            code: datas.code,
            nom: datas.nom,
            code_casier: datas.code_casier,
            famille: datas.famille,
            categorie: datas.categorie,
            unite: datas.unite,
            prix: datas.prix,
            nombre: datas.nombre
        };
        axios
          .patch(`${baseURL}/piece-rechange-garage/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                code: response.data.code,
                nom: response.data.nom,
                code_casier: response.data.code_casier,
                famille: response.data.famille,
                categorie: response.data.categorie,
                unite: response.data.unite,
                prix: response.data.prix,
                nombre: response.data.nombre
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
                        Modifier pièce rechange
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                
                <TextField value={datas.code} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'code'} label={'Code'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.nom} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nom'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.code_casier} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'code_casier'} label={'Code casier'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    value={datas.famille}
                    onChange={(event, newValue) => {datas.famille=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'famille'}
                    renderInput={(params) => <TextField {...params} label={'Famille'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['mécanique','électrique','pneumatique/hydraulique','capteurs','électronique','divers']}>
                </Autocomplete>

                <Autocomplete
                    value={datas.categorie}
                    onChange={(event, newValue) => {datas.categorie=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'categorie'}
                    renderInput={(params) => <TextField {...params} label={'Catégorie'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['mécanique','électrique','pneumatique/hydraulique','capteurs','électronique','divers']}>
                </Autocomplete>

                <TextField value={datas.unite} onChange={handleDataChange} type={'text'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'unite'} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.prix} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'prix'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.nombre} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'nombre'} label={'Nombre'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditPieceRechangeGarage