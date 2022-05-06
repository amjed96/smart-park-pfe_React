import { Dialog, DialogTitle, Typography, Button, DialogContent, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, headers } from "../../services/service";

function EditFlotte(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialVehiculeState = {
        immatriculation: "",
        num_serie: "",
        kilometrage: 0,
        engin: "",
        consommation: "",
        entretien: "",
        constructeur: "",
        type_commercial: "",
        activite: "",
        genre: "",
        type_constructeur: "",
        date_pmc: "",
        carrosserie: "",
        energie: "",
        puissance_fiscale: 0,
        nombre_essieux: 0,
        charge_utile: 0,
        poids_vide: 0,
        ptac_ptra: 0,
        nombre_places: 0,
        nombre_debout: 0,
        cylidree: 0,
    }
    const [vehicule, setVehicule] = useState(initialVehiculeState)
    const handleVehiculeChange = (e) => {
        const { name, value } = e.target;
        setVehicule({ ...vehicule, [name]: value })
        console.log(value)
    }

    const retrieveVehicule = () => {
        axios
          .get(`${baseURL}/vehicule/${id}/`, {
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
                cylidree: response.data.cylindree,
            });
            console.log('DATA:'+response.data.immatriculation);
          })
          .catch((e) => {
            console.error(e);
          });
    };

    const updateVehicule = () => {
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
          .patch(`${baseURL}/vehicule/${id}/`, data, {
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
                cylidree: response.data.cylindree,
            });
            // setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      };

    useEffect(() => {
        retrieveVehicule();
    }, [openedit]);

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
                        Test dialog
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField value={vehicule.immatriculation} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'immatriculation'} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.num_serie} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'num_serie'} label={'Num° série'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.kilometrage} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'kilometrage'} label={'Kilométrage'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.engin} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'engin'} label={'Engin'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.consommation} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'consommation'} label={'Consommation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.entretien} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'entretien'} label={'Entretien'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.constructeur} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'constructeur'} label={'Constructeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.type_commercial} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type_commercial'} label={'Type Commercial'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.activite} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'activite'} label={'Activité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.genre} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'genre'} label={'Genre'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.type_constructeur} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'type_constructeur'} label={'Type constructeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.date_pmc} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'date_pmc'} label={'Date PMC'} type={'date'} variant={'outlined'} color={'secondary'} defaultValue={defaultDate}></TextField>

                <TextField value={vehicule.carrosserie} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'carrosserie'} label={'Carrosserie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.energie} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'energie'} label={'Energie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.puissance_fiscale} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'puissance_fiscale'} label={'Puissance fiscale'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.nombre_essieux} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_essieux'} label={"Nombre d'essieux"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.charge_utile} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'charge_utile'} label={'Charge utile'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.poids_vide} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'poids_vide'} label={'Poids vide'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.ptac_ptra} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'ptac_ptra'} label={'PTAC/PTRA'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.nombre_places} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_places'} label={'Nombre de places'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.nombre_debout} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'nombre_debout'} label={'Nombre debout'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={vehicule.cylindree} onChange={handleVehiculeChange} sx={{width: '40%', margin: '10px'}} size={'small'} name={'cylidree'} label={'Cylindrée'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateVehicule(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditFlotte