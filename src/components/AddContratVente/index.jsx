import React from 'react'
import styled from 'styled-components'
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";

/*const Popup = styled.div`
  font-family: 'Montserrat', sans-serif;
  position: fixed;
  z-index: 100;
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
  justify-content: center;

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

  input, select, textarea {
    border: 1px solid #C4C4C4;
    width: 60%;
    padding: 10px;
    margin: 5px;

    &:focus {
      outline: none;
      border: 1px solid #000;
    }
  }

  label {
    width: 60%;
    font-weight: bold;
    margin-left: -20px;
  }

  textarea {
    resize: none;
  }

  select {
    width: 63% !important;
    option {
      height: 50px;
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

function AjoutContratVente(props) {

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
                        Ajouter un contrat d'achat
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField type={"date"} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Num° série'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Vendeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Immatriculation'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Chassis'} variant={'outlined'} color={'secondary'}></TextField>
                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>
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
                <h1>Ajouter un contrat de vente</h1>

                <label>Date :</label> {/!* To check *!/}
                <input type={"date"} defaultValue={defaultDate} />
                <input placeholder={'Vendeur ...'} />
                <input placeholder={'Matricule ...'} />
                <input placeholder={"Marque ..."} />
                <input placeholder={"Modèle ..."} />
                <input placeholder={"Chassis ..."} />
                <label>Moteur</label>
                <select>
                    <option value={'essence'}>Essence</option>
                    <option value={'diesel'}>Diesel</option>
                </select>
                <input placeholder={"Prix ..."} />

                <div className='submit-cont'>
                    <AddBtn>Enregistrer</AddBtn>
                </div>
                { props.children }
            </PopupInner>
        </Popup>
    ) : "";*/}
}

export default AjoutContratVente