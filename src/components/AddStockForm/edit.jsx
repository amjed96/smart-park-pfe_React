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

function EditStock(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        reference: null,
        article: null,
        codecasier: null,
        dateachat: defaultDate,
        quantite: null,
        unite: null
    }
    const [datas, setDatas] = useState(initialDatasState)
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/stock/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                reference: response.data.reference,
                article: response.data.article,
                codecasier: response.data.codecasier,
                dateachat: response.data.dateachat,
                quantite: response.data.quantite,
                unite: response.data.unite
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            reference: datas.reference,
            article: datas.article,
            codecasier: datas.codecasier,
            dateachat: datas.dateachat,
            quantite: datas.quantite,
            unite: datas.unite
        };
        axios
          .patch(`${baseURL}/stock/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                reference: response.data.reference,
                article: response.data.article,
                codecasier: response.data.codecasier,
                dateachat: response.data.dateachat,
                quantite: response.data.quantite,
                unite: response.data.unite
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
                        Modifier article
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

                {/* <TextField value={datas.reference} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'reference'} label={'Référence'} variant={'outlined'} color={'secondary'}></TextField> */}
                <TextField value={datas.article} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'article'} label={'Article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.codecasier} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'codecasier'} label={'Code casier'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField value={datas.dateachat} onChange={handleDataChange} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'dateachat'} label={"Date d'achat"} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.quantite} onChange={handleDataChange} type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} name={'quantite'} label={'Quantité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.unite} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Unité'} name={'unite'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditStock