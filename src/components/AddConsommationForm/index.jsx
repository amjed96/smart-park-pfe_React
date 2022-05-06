import React, {useState,useEffect} from 'react'
import { Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Autocomplete
} from "@mui/material";
import axios from 'axios'
import { baseURL, headers } from "../../services/service"

// const Popup = styled.div`
//     font-family: 'Montserrat', sans-serif;
//     position: fixed;
//     z-index: 100;
//     padding-top: 40px;
//     padding-bottom: 40px;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100vh;
//     background-color: rgba(0,0,0,0.2);
//     overflow-y: auto;

//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

// const PopupInner = styled.div`
//     padding: 20px;
//     position: relative;
//     background-color: #FFF;
//     width: 50%;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;

//     h1 {
//         width: 100%;
//     }

//     .close-btn {
//         border: none;
//         position: absolute;
//         top: 20px;
//         right: 10px;
//         cursor: pointer;
//         color: #C4C4C4;
//     }

//     input {
//         border: 1px solid #C4C4C4;
//         width: 45%;
//         padding: 10px;
//         margin: 5px;

//         &:focus {
//             outline: none;
//             border: 1px solid #000;
//           }
//     }

//     .submit-cont {
//         width: 100%;
//         display: flex;
//         justify-content: center;
//     }
// `

// const AddBtn = styled.button`
//   background-color: #4BF2B5;
//   border: none;
//   color: #FFF;
//   width: 87px;
//   height: 33px;
//   font-family: 'Montserrat', sans-serif;
//   font-size: 12px;
//   font-weight: bold;
//   right: 15px;
//   cursor: pointer;
//   margin: 10px;
// `

function AjoutConsommation(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    /* Start API */
    const initialConsommationState = {
        id: null,
        mois: defaultDate,
        type: null,
        kilometrage: null,
        consommation_totale: null,
        consommation: null,
        vehicule: null,
    }

    const [consommation, setConsommation] = useState(initialConsommationState)
    const [engins, setEngins] = useState([])

    const handleConsommationChange = (e) => {
        const { name, value } = e.target;
        setConsommation({ ...consommation, [name]: value })
        console.log(consommation)
    }

    /*const handleEnginChange = (e) => {
        const { name, value } = e.target;
        setConsommation({...consommation, [name]: value})
    }*/
    
    const submitConsommation = () => {
        let data = {
            mois: consommation.mois,
            type: consommation.type,
            kilometrage: consommation.kilometrage,
            consommation_totale: consommation.consommation_totale,
            consommation: consommation.consommation,
            vehicule: consommation.vehicule
        };
        axios
            .post(`${baseURL}/consommation/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setConsommation({
                    mois: response.data.mois,
                    type: response.data.type,
                    kilometrage: response.data.kilometrage,
                    consommation_totale: response.data.consommation_totale,
                    consommation: response.data.consommation,
                    vehicule: response.data.vehicule
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
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

    useEffect(() => {
        retrieveEngins()
    },[])
    /* End API */

    const { open, setOpen } = props

    return(
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={'md'}
        >
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        style={{flexGrow:1}}
                    >
                        Ajouter une consommation
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'mois'} type={'date'} defaultValue={defaultDate} label={'Mois'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type'} label={'Type'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>
                <TextField onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'kilometrage'} label={'Kilometrage'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation_totale'} label={'Consommation totale'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation'} label={'Consommation'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} onChange={handleConsommationChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'vehicule'} label={'Vehicule'} variant={'outlined'} color={'secondary'}></TextField>} options={engins.map(e => e.immatriculation)}></Autocomplete>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {submitConsommation(); setOpen(false)}}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutConsommation