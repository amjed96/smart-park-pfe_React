import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

function DeleteDialog(props) {

    const { opendelete, setOpendelete, id, deleteData } = props

    return (
        <Dialog
            open={opendelete}
            onClose={() => {setOpendelete(false)}}
            maxWidth={'md'}
        >
            <DialogTitle>
            <div style={{display:'flex'}}>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        style={{flexGrow:1}}
                    >
                        Supprimer
                    </Typography>
                    <Button
                        color={'secondary'}
                        text={'X'}
                        onClick={() => setOpendelete(false)}
                    >X</Button>
                </div>
            </DialogTitle>
            <DialogContent>
                Êtes-vous sûr de vouloir supprimer cet élément ?
                <br/><br/>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <Button onClick={() => {deleteData(id);setOpendelete(false)}}>Supprimer</Button>
                    <Button onClick={() => setOpendelete(false)} style={{backggroundColor: 'red'}} variant={'contained'}>Annuler</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteDialog