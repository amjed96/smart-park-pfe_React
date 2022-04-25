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

function AjoutPermis(props) {

    let defaultDate = new Date().toISOString().split('T')[0]

    return (props.trigger) ? (
        <Popup>
            <PopupInner>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    X
                </button>
                <h1>Ajouter un permis</h1>

                <input placeholder={'Référence ...'} />
                <label>Date :</label> {/* To check */}
                <input type={"date"} defaultValue={defaultDate} />
                <input placeholder={'Personnel ...'} list={'personnel'} />
                <datalist id={'personnel'}>
                    <option value={'Mohamed Bouallegui'} />
                    <option value={'Ali Ben Salah'} />
                    <option value={'Salem Abdelli'} />
                </datalist>
                <input placeholder={"Type ..."} list={'permis'} />
                <datalist id={'permis'}>
                    <option>A1</option>
                    <option>A</option>
                    <option>B</option>
                    <option>B+E</option>
                    <option>C</option>
                    <option>C+E</option>
                    <option>D</option>
                    <option>D1</option>
                    <option>D+E</option>
                    <option>H</option>
                </datalist>

                <div className='submit-cont'>
                    <AddBtn>Enregistrer</AddBtn>
                </div>
                { props.children }
            </PopupInner>
        </Popup>
    ) : "";
}

export default AjoutPermis