import React from 'react'
import styled from 'styled-components'

const Popup = styled.div`
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
      font-size: 16px;
    }
  
    h2 {
      font-size: 12px;
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
        font-size: 12px;

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

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
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

function AjoutContact(props) {
    return (props.trigger) ? (
        <Popup>
            <PopupInner>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    X
                </button>
                <h1>Ajouter un contact</h1>

                <h2>Identification</h2>
                <FormGroup>
                    <select>{/* A vérifier */}
                        <option>-- Type Contact --</option>
                        <option>Interlocuteur</option>
                        <option>Gérant</option>
                        <option>Responsable</option>
                    </select>
                    {/*<input placeholder='Type contact ...' />*/}
                    <select>{/* A vérifier */}
                        <option>-- Civilité --</option>
                        <option>M.</option>
                        <option>Mme.</option>
                        <option>Mlle.</option>
                    </select>
                    {/*<input placeholder='Civilité ...' />*/}
                    <input placeholder='Nom ...' />
                    <input placeholder='Prénom ...' />
                    <input placeholder='Service ...' />
                    <input placeholder='Fonction ...' />
                </FormGroup>

                <h2>Télécommunication</h2>
                <FormGroup>
                    <input placeholder='Téléphone ...' />
                    <input placeholder='Portable ...' />
                    <input placeholder='Télécopie ...' />
                    <input placeholder='Skype ...' />
                    <input placeholder='LinkedIn ...' />
                    <input placeholder='Facebook ...' />
                    <input placeholder='E-mail ...' />
                </FormGroup>

                <div className='submit-cont'>
                    <AddBtn>Enregistrer</AddBtn>
                </div>
                { props.children }
            </PopupInner>
        </Popup>
    ) : "";
}

export default AjoutContact