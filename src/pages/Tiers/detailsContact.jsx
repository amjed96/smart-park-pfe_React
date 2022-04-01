import {useParams} from "react-router-dom";


function ContactDetails() {

    const { idContact } = useParams()

    return (
        <div>
            Contact { idContact }
        </div>
    )
}

export default ContactDetails