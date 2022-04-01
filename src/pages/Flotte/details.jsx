import { useParams } from "react-router-dom";

function FlotteDetails() {

    const { flotteId } = useParams()

    return(
        <div>
            Details Flotte { flotteId }
        </div>
    )
}

export default FlotteDetails