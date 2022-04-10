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
`

function AjoutPlanEntretien(props) {

    return (props.trigger) ? (
        <Popup>
            <PopupInner>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    X
                </button>
                <h1>Ajouter un plan d'entretien</h1>
                <input placeholder='Opération ...' />
                <input placeholder='Matricule véhicule ...' list={"flotte"} />
                <datalist id={"flotte"}>
                    <option value={'120TUN5023'} />
                    <option value={'152TUN2568'} />
                    <option value={'168TUN1023'} />
                </datalist>
                <input placeholder={'Type ...'} />
                <input placeholder={'Fréquence ...'} />
                <select>
                    <option>-- Unité --</option>
                    <option>Km</option>
                    <option>Jour</option>
                    <option>Date</option>
                </select>

                <div className='submit-cont'>
                    <AddBtn>Enregistrer</AddBtn>
                </div>
                { props.children }
            </PopupInner>
        </Popup>
    ) : "";
}

export default AjoutPlanEntretien