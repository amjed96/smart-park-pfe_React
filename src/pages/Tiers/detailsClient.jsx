import {useParams} from "react-router-dom";


function ClientDetails() {

    const { idClient } = useParams()

    return (
        <div>
            Client { idClient }
        </div>
    )
}

export default ClientDetails