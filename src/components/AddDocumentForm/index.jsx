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
`

function AjoutDocument(props) {
  return (props.trigger) ? (
    <Popup>
        <PopupInner>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                X
            </button>
            <h1>Ajouter un document</h1>
            <input placeholder='Type document ...' />
            <input placeholder='Date ...' />
            <input placeholder='Numéro ...' />
            <input placeholder='Code tiers ...' />
            <input placeholder='Réf article ...' />
            <input placeholder='Désignation article ...' />
            <input placeholder='Quantité ...' />
            <input placeholder='Prix unitaire ...' />
            <input placeholder='Remise ...' />
            <input placeholder='Taux TVA ...' />
            <input placeholder='Prix unitaire Brut HT ...' />
            <input placeholder='Prix unitaire TTC ...' />
            <input placeholder='Prix total net HT ...' />
            <input placeholder='Prix total net TTC ...' />

            <div className='submit-cont'>
                <AddBtn>Enregistrer</AddBtn>
            </div>
            { props.children }
        </PopupInner>
    </Popup>
  ) : "";
}

export default AjoutDocument