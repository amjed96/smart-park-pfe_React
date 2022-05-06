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

function AjoutContratLocation(props) {

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
                        Ajouter un contrat de location
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpen(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>

                <Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '80%', margin: '10px'}} size={'small'} label={'Immatriculation Engin'} variant={'outlined'} color={'secondary'}></TextField>} options={['120TUN5523','125TUN5523','135TUN5523']}></Autocomplete>

                <TextField type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Date début'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField type={'date'} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Date fin'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Locataire'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Marque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Modèle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField sx={{width: '40%', margin: '10px'}} size={'small'} label={'Prix'} variant={'outlined'} color={'secondary'}></TextField>
                {/*<Autocomplete renderInput={(params) => <TextField {...params} sx={{width: '40%', margin: '10px'}} size={'small'} label={'Moteur'} variant={'outlined'} color={'secondary'}></TextField>} options={['essence','diesel']}></Autocomplete>*/}
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
                <h1>Ajouter un article</h1>
                <input placeholder={'Immatriculation ...'} list={'engins'} />
                <datalist id={'engins'}>
                    <option>215TUN5023</option>
                    <option>125TUN5523</option>
                    <option>198TUN3265</option>
                </datalist>

                <div className='submit-cont'>
                    <AddBtn>Enregistrer</AddBtn>
                </div>
                { props.children }
            </PopupInner>
        </Popup>
    ) : "";*/
}

export default AjoutContratLocation