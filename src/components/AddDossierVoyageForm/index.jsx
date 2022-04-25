import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React from "react";

function AjoutDossierVoyage(props) {
    let defaultDate = new Date().toISOString().split('T')[0]
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
                        Ajouter un dossier de voyage
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Code'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Numéro'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Référence aller'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField disabled={true} type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date de création'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'chauffeur'} variant={'outlined'} color={'secondary'}></TextField>} options={['Mohamed Aloui','Salem Ben Salem','Salah Ben Salah']}></Autocomplete>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>} options={['120TUN2231','157TUN9820','120TUN4563']}></Autocomplete>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Remorque'} variant={'outlined'} color={'secondary'}></TextField>} options={['120TUN2231','157TUN9820','120TUN4563']}></Autocomplete>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Client'} variant={'outlined'} color={'secondary'}></TextField>} options={['Mohamed Aloui','Salem Ben Salem','Salah Ben Salah']}></Autocomplete>

                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Voyage'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date de chargement'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date de déchargement'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Montant HT'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Etat'} variant={'outlined'} color={'secondary'}></TextField>} options={['en cours','facturé']}></Autocomplete>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutDossierVoyage