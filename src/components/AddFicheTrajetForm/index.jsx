import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React from "react";

function AjoutFicheTrajet(props) {

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
                        Ajouter un fiche trajet
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Chauffeur'} variant={'outlined'} color={'secondary'}></TextField>} options={['Mohamed Aloui','Salem Ben Salem','Salah Ben Salah']}></Autocomplete>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Client'} variant={'outlined'} color={'secondary'}></TextField>} options={['Mohamed Aloui','Salem Ben Salem','Salah Ben Salah']}></Autocomplete>

                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Marchandise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Trajet'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Unité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Type prestation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Catégorie'} variant={'outlined'} color={'secondary'}></TextField>

                <TextField type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix retour'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AjoutFicheTrajet