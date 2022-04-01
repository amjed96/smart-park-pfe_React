import {useParams} from "react-router-dom";

function PersonnelDetails() {

    const { personnelId } = useParams()

    return (
        <div>
            Personnel { personnelId }
        </div>
    )
}

export default PersonnelDetails