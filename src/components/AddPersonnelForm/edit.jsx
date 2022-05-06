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

function EditPersonnel(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        id: null,
        is_superuser: false,
        first_name: null,
        last_name: null,
        email: null,
        is_active: true,
        cin: null,
        date_naissance: defaultDate,
        telephone: null,
        qualification: null,
        type_permis: null,
        username: null,
        password: null
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
          .get(`${baseURL}/personnel/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                is_active: response.data.is_active,
                cin: response.data.cin,
                date_naissance: response.data.date_naissance,
                telephone: response.data.telephone,
                qualification: response.data.qualification,
                type_permis: response.data.type_permis,
                username: response.data.username,
                password: response.data.password
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            first_name: datas.first_name,
            last_name: datas.last_name,
            email: datas.email,
            cin: datas.cin,
            date_naissance: datas.date_naissance,
            telephone: datas.telephone,
            qualification: datas.qualification,
            type_permis: datas.type_permis,
            username: datas.username,
            password: datas.password
        };
        axios
          .patch(`${baseURL}/personnel/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                is_active: response.data.is_active,
                cin: response.data.cin,
                date_naissance: response.data.date_naissance,
                telephone: response.data.telephone,
                qualification: response.data.qualification,
                type_permis: response.data.type_permis,
                username: response.data.username,
                password: response.data.password
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
                        Modifier personnel
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField value={datas.last_name} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'last_name'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.first_name} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'first_name'} label={'Prénom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.date_naissance} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_naissance'} label={'Date de naissance'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.telephone} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'telephone'} label={'Téléphone'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.cin} onChange={handleDataChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'cin'} label={'CIN'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.email} onChange={handleDataChange} type={'email'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'email'} label={'Email'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.username} onChange={handleDataChange} type={'email'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'username'} label={"Nom d'utilisateur"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.password} onChange={handleDataChange} type={'password'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'password'} label={'Mot de passe'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete value={datas.qualification} onChange={(event, newValue) => {datas.qualification=newValue}} name={'qualification'} renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Qualification'} variant={'outlined'} color={'secondary'}></TextField>} options={['Chef de parc','Chauffeur','Chauffeur poids lourd','Mécanicien','Gardien']}></Autocomplete>
                <Autocomplete value={datas.type_permis} onChange={(event, newValue) => {datas.type_permis=newValue}} name={'type_permis'} renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Type de permis'} variant={'outlined'} color={'secondary'}></TextField>} options={['A','B','C','D','E','F','G','H']}></Autocomplete>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditPersonnel