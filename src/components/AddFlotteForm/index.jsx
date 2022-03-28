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
`

function AjoutFlotte(props) {
  return (props.trigger) ? (
    <Popup>
        <PopupInner>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                X
            </button>
            <h1>Ajouter une véhicule</h1>
            <input placeholder='Num° de série ...' />
            <input placeholder='Matricule ...' />
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
            { props.children }
        </PopupInner>
    </Popup>
  ) : "";
}

export default AjoutFlotte