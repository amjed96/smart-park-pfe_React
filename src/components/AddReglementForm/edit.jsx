import { 
    Dialog,
    DialogTitle,
    Typography,
    Button,
    DialogContent,
    TextField,
    Autocomplete
} from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL, headers } from "../../services/service"

function EditReglement(props) {

    let defaultDate = new Date().toISOString().split('T')[0]
    const { openedit, setOpenedit, id } = props

    /* Start API */
    const initialDatasState = {
        rg_no: null,
        ct_num_payeur: null,
        cb_ct_num_payeur: null,
        rg_date: defaultDate,
        rg_reference: null,
        rg_libelle: null,
        rg_montant: null,
        rg_montant_dev: null,
        n_reglement: null,
        rg_impute: null,
        rg_compta: null,
        ec_no: null,
        rg_type: null,
        rg_cours: null,
        n_devise: null,
        jo_num: null,
        cg_num_cont: null,
        rg_impaye: defaultDate,
        cg_num: null,
        rg_type_reg: null,
        rg_heure: null,
        rg_piece: null,
        rg_banque: null,
        ct_num_payeur_orig: null,
        rg_date_ech_cont: defaultDate,
        cg_num_ecart: null,
        jo_num_ecart: null,
        rg_montant_ecart: null
    }
    const [datas, setDatas] = useState(initialDatasState)
    
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value })
        console.log(value)
    }

    const retrieveDatas = () => {
        axios
          .get(`${baseURL}/c-reglement/${id}/`, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                rg_no: response.data.rg_no,
                ct_num_payeur: response.data.ct_num_payeur,
                cb_ct_num_payeur: response.data.cb_ct_num_payeur,
                rg_date: response.data.rg_date,
                rg_reference: response.data.rg_reference,
                rg_libelle: response.data.rg_libelle,
                rg_montant: response.data.rg_montant,
                rg_montant_dev: response.data.rg_montant_dev,
                n_reglement: response.data.n_reglement,
                rg_impute: response.data.rg_impute,
                rg_compta: response.data.rg_compta,
                ec_no: response.data.ec_no,
                rg_type: response.data.rg_type,
                rg_cours: response.data.rg_cours,
                n_devise: response.data.n_devise,
                jo_num: response.data.jo_num,
                cg_num_cont: response.data.cg_num_cont,
                rg_impaye: response.data.rg_impaye,
                cg_num: response.data.cg_num,
                rg_type_reg: response.data.rg_type_reg,
                rg_heure: response.data.rg_heure,
                rg_piece: response.data.rg_piece,
                rg_banque: response.data.rg_banque,
                ct_num_payeur_orig: response.data.ct_num_payeur_orig,
                rg_date_ech_cont: response.data.rg_date_ech_cont,
                cg_num_ecart: response.data.cg_num_ecart,
                jo_num_ecart: response.data.jo_num_ecart,
                rg_montant_ecart: response.data.rg_montant_ecart
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    const updateDatas = () => {
        let data = {
            rg_no: datas.rg_no,
            ct_num_payeur: datas.ct_num_payeur,
            cb_ct_num_payeur: datas.cb_ct_num_payeur,
            rg_date: datas.rg_date,
            rg_reference: datas.rg_reference,
            rg_libelle: datas.rg_libelle,
            rg_montant: datas.rg_montant,
            rg_montant_dev: datas.rg_montant_dev,
            n_reglement: datas.n_reglement,
            rg_impute: datas.rg_impute,
            rg_compta: datas.rg_compta,
            ec_no: datas.ec_no,
            rg_type: datas.rg_type,
            rg_cours: datas.rg_cours,
            n_devise: datas.n_devise,
            jo_num: datas.jo_num,
            cg_num_cont: datas.cg_num_cont,
            rg_impaye: datas.rg_impaye,
            cg_num: datas.cg_num,
            rg_type_reg: datas.rg_type_reg,
            rg_heure: datas.rg_heure,
            rg_piece: datas.rg_piece,
            rg_banque: datas.rg_banque,
            ct_num_payeur_orig: datas.ct_num_payeur_orig,
            rg_date_ech_cont: datas.rg_date_ech_cont,
            cg_num_ecart: datas.cg_num_ecart,
            jo_num_ecart: datas.jo_num_ecart,
            rg_montant_ecart: datas.rg_montant_ecart
        };
        axios
          .patch(`${baseURL}/c-reglement/${id}/`, data, {
            /*headers: {
              headers,
            },*/
          })
          .then((response) => {
            setDatas({
                rg_no: response.data.rg_no,
                ct_num_payeur: response.data.ct_num_payeur,
                cb_ct_num_payeur: response.data.cb_ct_num_payeur,
                rg_date: response.data.rg_date,
                rg_reference: response.data.rg_reference,
                rg_libelle: response.data.rg_libelle,
                rg_montant: response.data.rg_montant,
                rg_montant_dev: response.data.rg_montant_dev,
                n_reglement: response.data.n_reglement,
                rg_impute: response.data.rg_impute,
                rg_compta: response.data.rg_compta,
                ec_no: response.data.ec_no,
                rg_type: response.data.rg_type,
                rg_cours: response.data.rg_cours,
                n_devise: response.data.n_devise,
                jo_num: response.data.jo_num,
                cg_num_cont: response.data.cg_num_cont,
                rg_impaye: response.data.rg_impaye,
                cg_num: response.data.cg_num,
                rg_type_reg: response.data.rg_type_reg,
                rg_heure: response.data.rg_heure,
                rg_piece: response.data.rg_piece,
                rg_banque: response.data.rg_banque,
                ct_num_payeur_orig: response.data.ct_num_payeur_orig,
                rg_date_ech_cont: response.data.rg_date_ech_cont,
                cg_num_ecart: response.data.cg_num_ecart,
                jo_num_ecart: response.data.jo_num_ecart,
                rg_montant_ecart: response.data.rg_montant_ecart
            });
            // setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }

    useEffect(() => {
        retrieveDatas()
    }, [openedit])

    return(
        <Dialog
            open={openedit}
            onClose={() => setOpenedit(false)}
            maxWidth={'md'}
        >
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        style={{flexGrow:1}}
                    >
                        Modifier règlement
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpenedit(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                {/**/}

                <TextField value={datas.rg_no} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_no'} label={'rg_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.ct_num_payeur} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'ct_num_payeur'} label={'ct_num_payeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.cb_ct_num_payeur} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cb_ct_num_payeur'} label={'cb_ct_num_payeur'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_date} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} type={'date'} name={'rg_date'} label={'rg_date'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_reference} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_reference'} label={'rg_reference'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_libelle} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_libelle'} label={'rg_libelle'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_montant} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_montant'} label={'rg_montant'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_montant_dev} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_montant_dev'} label={'rg_montant_dev'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.n_reglement} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'n_reglement'} label={'n_reglement'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_impute} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_impute'} label={'rg_impute'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_compta} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_compta'} label={'rg_compta'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.ec_no} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'ec_no'} label={'ec_no'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_type} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_type'} label={'rg_type'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_cours} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_cours'} label={'rg_cours'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.n_devise} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'n_devise'} label={'n_devise'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.jo_num} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'jo_num'} label={'jo_num'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.cg_num_cont} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cg_num_cont'} label={'cg_num_cont'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_impaye} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} type={'date'} name={'rg_impaye'} label={'rg_impaye'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.cg_num} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cg_num'} label={'cg_num'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_type_reg} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_type_reg'} label={'rg_type_reg'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_heure} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_heure'} label={'rg_heure'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_piece} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_piece'} label={'rg_piece'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_banque} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_banque'} label={'rg_banque'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.ct_num_payeur_orig} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'ct_num_payeur_orig'} label={'ct_num_payeur_orig'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_date_ech_cont} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} type={'date'} name={'rg_date_ech_cont'} label={'rg_date_ech_cont'} defaultValue={defaultDate} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.cg_num_ecart} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'cg_num_ecart'} label={'cg_num_ecart'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.jo_num_ecart} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'jo_num_ecart'} label={'jo_num_ecart'} variant={'outlined'} color={'secondary'}></TextField>
                <TextField value={datas.rg_montant_ecart} onChange={handleDataChange} sx={{width: '80%', margin: '10px'}} size={'small'} name={'rg_montant_ecart'} label={'rg_montant_ecart'} variant={'outlined'} color={'secondary'}></TextField>


                <br/><Button sx={{margin: '10px'}} variant={'contained'} color={'secondary'} type={'submit'} onClick={() => {updateDatas(); setOpenedit(false)}}>Enregistrer</Button>
            </DialogContent>
        </Dialog>
    )

}

export default EditReglement