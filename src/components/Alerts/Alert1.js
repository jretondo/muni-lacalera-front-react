import React from 'react'
import {
    Alert
} from "reactstrap"

const Alert1 = ({
    type,
    msgStrong,
    msgGral,
    id
}) => {
    return (
        <Alert color={type} style={{ transition: "0.6s ease", position: "fixed", right: 0, left: 0, top: 0, margin: "auto", marginTop: `${id * 60}px`, zIndex: "99999", textAlign: "center" }} >
            <strong>{msgStrong}</strong>{" "}{msgGral}
        </Alert>
    )
}

export default Alert1