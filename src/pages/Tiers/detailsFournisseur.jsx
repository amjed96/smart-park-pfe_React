import {useParams} from "react-router-dom";


function FournisseurDetails() {

    const { idFournisseur } = useParams()

    return (
        <div>
            Fournisseur { idFournisseur }
        </div>
    )
}

export default FournisseurDetails