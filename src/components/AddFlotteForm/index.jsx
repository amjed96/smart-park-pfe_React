import React from 'react'
import styled from 'styled-components'
import { Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Popup = styled.div`
    font-family: 'Montserrat', sans-serif;
    position: fixed;
    z-index: 100;
    padding-top: 40px;
    padding-bottom: 40px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
    overflow-y: auto;

    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupInner = styled.div`
    padding: 20px;
    position: relative;
    background-color: #FFF;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h1 {
        width: 100%;
    }

    .close-btn {
        border: none;
        position: absolute;
        top: 20px;
        right: 10px;
        cursor: pointer;
        color: #C4C4C4;
    }

    input {
        border: 1px solid #C4C4C4;
        width: 45%;
        padding: 10px;
        margin: 5px;

        &:focus {
            outline: none;
            border: 1px solid #000;
          }
    }

    .submit-cont {
        width: 100%;
        display: flex;
        justify-content: center;
    }
`

const AddBtn = styled.button`
  background-color: #4BF2B5;
  border: none;
  color: #FFF;
  width: 87px;
  height: 33px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: bold;
  right: 15px;
  cursor: pointer;
  margin: 10px;
`

function AjoutFlotte(props) {

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
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Num° série'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Matricule'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Kilométrage'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Engin'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Consommation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Entretien'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Constructeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Type Commercial'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Activité'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Genre'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Type constructeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Date PMC'} type={'date'} variant={'outlined'} color={'secondary'} defaultValue={defaultDate}></TextField>
                {/*<DesktopDatePicker
                    label="Date PMC"
                    inputFormat="dd/MM/yyyy"
                 date={'10-08-2000'}/>*/}
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Carrosserie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Energie'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Puissance fiscale'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={"Nombre d'essieux"} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Charge utile'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Poids vide'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'PTAC/PTRA'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Nombre de places'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Nombre debout'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Cylindrée'} variant={'outlined'} color={'secondary'}></TextField>
                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );


    {/*return (props.trigger) ? (
    <Popup>
        <PopupInner>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                X
            </button>
            <h1>Ajouter une véhicule</h1>
            <input placeholder='Num° de série ...' />
            <input placeholder='Matricule ...' />
            <input placeholder='Kilométrage ...' />
            <input placeholder='Engin ...' />
            <input placeholder='Consommation ...' />
            <input placeholder='Entretien ...' />
            <input placeholder='Constructeur ...' />
            <input placeholder='Type commercial ...' />
            <input placeholder='Activité ...' />
            <input placeholder='Genre ...' />
            <input placeholder='Type constructeur ...' />
            <input type='date' placeholder='DPMC (date)' />
            <input placeholder='Carrosserie ...' />
            <input placeholder='Energie ...' />
            <input placeholder='Puissance fiscale ...' />
            <input placeholder='Nombre d&#8217;essieux ...' />
            <input placeholder='Charge utile ...' />
            <input placeholder='PV (Poids Vide) ...' />
            <input placeholder='PTAC/PTRA ...' />
            <input placeholder='Nombre de places ...' />
            <input placeholder='Nombre debout ...' />
            <input placeholder='Cylindrée ...' />
            <input placeholder='N° d&#8217;immatriculation précédent ...' />
            <input placeholder='N° certificat Date et lieu d&#8217;établissement ...' />
            <div className='submit-cont'>
                <AddBtn>Enregistrer</AddBtn>
            </div>
            { props.children }
        </PopupInner>
    </Popup>
  ) : "";*/}
}

export default AjoutFlotte