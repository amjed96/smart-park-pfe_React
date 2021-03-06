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

function EditPasseport(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        type: null,
        nationalite: null,
        adresse_naissance: null,
        sexe: null,
        authorite_edition: null,
        date_edition: defaultDate,
        date_expiration: defaultDate,
        personnel: null
    }
    const [datas, setDatas] = useState(initialDatasState)
    const [personnels, setPersonnels] = useState([])

    const retrievePersonnels = () => {
        axios
            .get(`${baseURL}/personnel/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setPersonnels(response.data)
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
          .get(`${baseURL}/passeport/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                numero: response.data.numero,
                type: response.data.type,
                nationalite: response.data.nationalite,
                adresse_naissance: response.data.adresse_naissance,
                sexe: response.data.sexe,
                authorite_edition: response.data.authorite_edition,
                date_edition: response.data.date_edition,
                date_expiration: response.data.date_expiration,
                personnel: response.data.personnel
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            type: datas.type,
            nationalite: datas.nationalite,
            adresse_naissance: datas.adresse_naissance,
            sexe: datas.sexe,
            authorite_edition: datas.authorite_edition,
            date_edition: datas.date_edition,
            date_expiration: datas.date_expiration,
            personnel: datas.personnel
        };
        axios
          .patch(`${baseURL}/passeport/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                numero: response.data.numero,
                type: response.data.type,
                nationalite: response.data.nationalite,
                adresse_naissance: response.data.adresse_naissance,
                sexe: response.data.sexe,
                authorite_edition: response.data.authorite_edition,
                date_edition: response.data.date_edition,
                date_expiration: response.data.date_expiration,
                personnel: response.data.personnel
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
        retrievePersonnels()
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
                        Modifier passeport
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
                {/* <TextField value={datas.numero} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'numero'} label={'Num??ro'} variant={'outlined'} color={'secondary'}></TextField> */}
                <TextField value={datas.type} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>

                {/* <Autocomplete
                    value={datas.personnel}
                    onChange={(event, newValue) => {datas.personnel=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'personnel'}
                    renderInput={(params) => <TextField {...params} label={'Personnel'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={personnels.map((e) => e.id.toString())}>
                </Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.personnel=e.target.value}}>
                    <option value=''>-- Personnel --</option>
                    {personnels.map(c=>
                        c.id === datas.personnel ?
                        <option selected value={c.id}>{c.first_name} {c.last_name}</option>
                        : <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>

                <TextField value={datas.nationalite} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nationalite'} label={'Nationalit??'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.adresse_naissance} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'adresse_naissance'} label={'Adresse de naissance'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete
                    value={datas.sexe}
                    onChange={(event, newValue) => {datas.sexe=newValue}}
                    sx={{width: '40%', margin: '10px'}}
                    size={'small'}
                    name={'sexe'}
                    renderInput={(params) => <TextField {...params} label={'Sexe'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['Masculin','F??minin']}>   
                </Autocomplete>

                <TextField onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'authorite_edition'} label={"Authorit?? d'??dition"} disabled={true} value={"Minist??re de l'int??rieur"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_edition} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_edition'} label={'Date ??dition'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_expiration} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_expiration'} label={'Date expiration'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditPasseport