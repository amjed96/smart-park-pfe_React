import React from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";


function AjoutDocument(props) {

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
                        Ajouter un document/facture
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Type document'} variant={'outlined'} color={'secondary'}></TextField>} options={['Facture','Bon de sortie','Bon de livraison']}></Autocomplete>

                <TextField type={'date'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>

                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Numéro'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Code tiers'} variant={'outlined'} color={'secondary'}></TextField>} options={['CL140524','CL140201','CL140632']}></Autocomplete>

                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Référence article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '80%', margin: '10px'}} size={'small'} label={'Désignation article'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Quantité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix unitaire'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Remise (%)'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix unitaire brut HT'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix unitaire TTC'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix total net HT'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'number'} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Prix total net TTC'} variant={'outlined'} color={'secondary'}></TextField>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

}

export default AjoutDocument