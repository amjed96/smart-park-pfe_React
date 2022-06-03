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

function EditPermis(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        date: defaultDate,
        type: null,
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
          .get(`${baseURL}/permis/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                reference: response.data.reference,
                date: response.data.date,
                type: response.data.type,
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
            date: datas.date,
            type: datas.type,
            personnel: datas.personnel
        };
        axios
          .patch(`${baseURL}/permis/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                reference: response.data.reference,
                date: response.data.date,
                type: response.data.type,
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
                        Modifier permis
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
                {/* <TextField value={datas.reference} onChange={handleDataChange} type={'text'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'reference'} label={'Référence'} variant={'outlined'} color={'secondary'}></TextField> */}
                <TextField value={datas.date} onChange={handleDataChange} type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                {/* <Autocomplete
                    value={datas.personnel}
                    onChange={(event, newValue) => {datas.personnel=newValue}} 
                    sx={{width: '40%', margin: '10px'}} 
                    size={'small'} 
                    name={'personnel'} 
                    renderInput={(params) => <TextField {...params} label={'Personnel'} variant={'outlined'} color={'secondary'}></TextField>} 
                    options={personnels.map(e => e.id.toString())}></Autocomplete> */}

                <select className='form-select mt-2' onChange={(e,newValue)=>{datas.personnel=e.target.value}}>
                    <option value=''>-- Personnel --</option>
                    {personnels.map(c=>
                        c.id === datas.personnel ?
                        <option selected value={c.id}>{c.first_name} {c.last_name}</option>
                        : <option value={c.id}>{c.first_name} {c.last_name}</option>
                    )}
                </select>
                
                <Autocomplete
                    value={datas.type}
                    onChange={(event, newValue) => {datas.type=newValue}}
                    sx={{width: '40%', margin: '10px'}} 
                    size={'small'}
                    name={'type'} 
                    renderInput={(params) => <TextField {...params} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={['A1','A','B','B+E','C','C+E','D','D1','D+E','H']}>
                </Autocomplete>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditPermis