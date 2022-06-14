import React, {useState} from 'react'
import styled from 'styled-components'
import { 
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material"
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

const carBrands = [
    "Abarth",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Donkervoort",
    "DS",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "KTM",
    "Lada",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Landwind",
    "Lexus",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Morgan",
    "Nissan",
    "Opel",
    "Peugeot",
    "Porsche",
    "Renault",
    "Rolls-Royce",
    "Rover",
    "Saab",
    "Seat",
    "Skoda",
    "Smart",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo"
  ]

function AjoutFlotte(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { open, setOpen } = props

    /* Start API */
    const initialVehiculeState = {
        immatriculation: null,
        num_serie: null,
        kilometrage: null,
        engin: null,
        consommation: null,
        entretien: null,
        constructeur: null,
        type_commercial: null,
        activite: null,
        genre: null,
        type_constructeur: null,
        date_pmc: defaultDate,
        carrosserie: null,
        energie: null,
        puissance_fiscale: null,
        nombre_essieux: null,
        charge_utile: null,
        poids_vide: null,
        ptac_ptra: null,
        nombre_places: null,
        nombre_debout: null,
        cylidree: null,
        affecte: false,
    }
    const [vehicule, setVehicule] = useState(initialVehiculeState)
    const handleVehiculeChange = (e) => {
        const { name, value } = e.target;
        setVehicule({ ...vehicule, [name]: value })
    }
    const submitVehicule = () => {
        let data = {
            immatriculation: vehicule.immatriculation,
            num_serie: vehicule.num_serie,
            kilometrage: vehicule.kilometrage,
            engin: vehicule.engin,
            consommation: vehicule.consommation,
            entretien: vehicule.entretien,
            constructeur: vehicule.constructeur,
            type_commercial: vehicule.type_commercial,
            activite: vehicule.activite,
            genre: vehicule.genre,
            type_constructeur: vehicule.type_constructeur,
            date_pmc: vehicule.date_pmc,
            carrosserie: vehicule.carrosserie,
            energie: vehicule.energie,
            puissance_fiscale: vehicule.puissance_fiscale,
            nombre_essieux: vehicule.nombre_essieux,
            charge_utile: vehicule.charge_utile,
            poids_vide: vehicule.poids_vide,
            ptac_ptra: vehicule.ptac_ptra,
            nombre_places: vehicule.nombre_places,
            nombre_debout: vehicule.nombre_debout,
            cylidree: vehicule.cylidree,
        };
        axios
            .post(`${baseURL}/vehicule/`, data, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                setVehicule({
                    immatriculation: response.data.immatriculation,
                    num_serie: response.data.num_serie,
                    kilometrage: response.data.kilometrage,
                    engin: response.data.engin,
                    consommation: response.data.consommation,
                    entretien: response.data.entretien,
                    constructeur: response.data.constructeur,
                    type_commercial: response.data.type_commercial,
                    activite: response.data.activite,
                    genre: response.data.genre,
                    type_constructeur: response.data.type_constructeur,
                    date_pmc: response.data.date_pmc,
                    carrosserie: response.data.carrosserie,
                    energie: response.data.energie,
                    puissance_fiscale: response.data.puissance_fiscale,
                    nombre_essieux: response.data.nombre_essieux,
                    charge_utile: response.data.charge_utile,
                    poids_vide: response.data.poids_vide,
                    ptac_ptra: response.data.ptac_ptra,
                    nombre_places: response.data.nombre_places,
                    nombre_debout: response.data.nombre_debout,
                    cylidree: response.data.cylidree,
                });
                /*setSubmitted(true);*/
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    /* End API */

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
                        Ajouter une véhicule
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'immatriculation'} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'num_serie'} label={'Num° série'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'kilometrage'} label={'Kilométrage'} variant={'outlined'} color={'secondary'}></TextField>
                
                {/* <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'engin'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField> */}
                
                <select className='form-select mt-2' onChange={(e,newValue)=>{vehicule.engin=e.target.value}}>
                    <option selected value={''}>--Moteur--</option>
                    <option value={'essence'}>Essence</option>
                    <option value={'diesel'}>Diesel</option>
                </select>
                                
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation'} label={'Consommation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'entretien'} label={'Entretien'} variant={'outlined'} color={'secondary'}></TextField>
                
                {/* <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'constructeur'} label={'Constructeur'} variant={'outlined'} color={'secondary'}></TextField> */}
                
                <Autocomplete
                    onChange={(event, newValue) => {vehicule.constructeur=newValue}}
                    sx={{width: '80%', margin: '10px'}}
                    size={'small'}
                    name={'constructeur'}
                    renderInput={(params) => <TextField {...params} label={'Constructeur'} variant={'outlined'} color={'secondary'}></TextField>}
                    options={carBrands}>
                </Autocomplete>

                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type_commercial'} label={'Type Commercial'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'activite'} label={'Activité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'genre'} label={'Genre'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type_constructeur'} label={'Type constructeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_pmc'} label={'Date PMC'} type={'date'} variant={'outlined'} color={'secondary'} defaultValue={defaultDate}></TextField>

                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'carrosserie'} label={'Carrosserie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'energie'} label={'Energie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'puissance_fiscale'} label={'Puissance fiscale'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_essieux'} label={"Nombre d'essieux"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'charge_utile'} label={'Charge utile'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'poids_vide'} label={'Poids vide'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'ptac_ptra'} label={'PTAC/PTRA'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_places'} label={'Nombre de places'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_debout'} label={'Nombre debout'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'cylidree'} label={'Cylindrée'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {submitVehicule(); setOpen(false)}}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutFlotte