import React from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from "../../services/service"

function CloturerDialog(props) {

  const { opencloture, setOpencloture, id } = props

  const cloturerAffectation = (id) => {
    axios
      .post(`${baseURL}/affectation/${id}/cloturer/`, {
        /*headers: {
          headers,
        },*/
      })
      .then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <Dialog
      open={opencloture}
      onClose={() => setOpencloture(false)}
      maxWidth={'md'}
    >
      <DialogTitle>Êtes-vous sûr de vouloir clôturer cette affectation ?</DialogTitle>
      <DialogContent><Button variant={'contained'} onClick={cloturerAffectation(id)}>Confirmer</Button><Button variant={'outlined'} onClick={setOpencloture(false)}>Annuler</Button></DialogContent>
    </Dialog>
  )
}

export default CloturerDialog