import React from 'react'
import styled from 'styled-components'
import {Autocomplete,Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";

/*const Popup = styled.div`
    font-family: 'Montserrat', sans-serif;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);

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
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #C4C4C4;
    }

    input,select {
        border: 1px solid #C4C4C4;
        width: 45%;
        padding: 10px;
        margin: 5px;

        #novalue {
            color: #C4C4C4;
        }

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
`*/

function AjoutPersonne(props) {

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
                        Ajouter un personnel
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Nom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Prénom'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Date de naissance'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Téléphone'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'CIN'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'email'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Email'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'password'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Mot de passe'} variant={'outlined'} color={'secondary'}></TextField>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Qualification'} variant={'outlined'} color={'secondary'}></TextField>} options={['Chef de parc','Chauffeur','Chauffeur poids lourd','Mécanicien','Gardien']}></Autocomplete>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Type de permis'} variant={'outlined'} color={'secondary'}></TextField>} options={['A','B','C','D','E','F','G','H']}></Autocomplete>

                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'}>Ajouter</Button>
            </DialogContent>
        </Dialog>
    );

  /*return (props.trigger) ? (
    <Popup>
        <PopupInner>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                X
            </button>
            <h1>Ajouter une personne</h1>
            <input placeholder='Nom ...' />
            <input placeholder='Prénom ...' />
            <input placeholder='Date de naissance ...' />
            <input placeholder='Téléphone ...' />
            <input placeholder='CIN ...' />
            <input placeholder='Qualification ...' />
            <select>
                <option value="" id='novalue'>-- Qualification --</option>
                <option value="chef">Chef de parque</option>
                <option value="chauffeur">Chauffeur</option>
                <option value="chauffeur-poids-lourd">Chauffeur poids lourd</option>
                <option value="mecanicien">Mécanicien</option>
                <option value="gardien">Gardien</option>
            </select>
            <input placeholder='Salaire ...' />
            <input placeholder='Type de permis ...' />
            <select name='permis' id='type-permis'>
                <option value="" id='novalue'>-- Type permis --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>

            <div className='submit-cont'>
                <AddBtn>Enregistrer</AddBtn>
            </div>
            { props.children }
        </PopupInner>
    </Popup>
  ) : "";*/
}

export default AjoutPersonne