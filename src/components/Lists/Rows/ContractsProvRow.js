import { capitalizeFirstLetter } from 'function/capitalizeFisrtWord';
import moment from 'moment-with-locales-es6';
import React from 'react';

const ContractsProvRow = ({
    id,
    item
}) => {

    return (
        <tr>
            <td style={{ textAlign: "center" }}>

                {`${capitalizeFirstLetter(moment(item.from).locale("es").format("MMMM"))}/${moment(item.from).format("YYYY")}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {`${capitalizeFirstLetter(moment(item.to).locale("es").format("MMMM"))}/${moment(item.to).format("YYYY")}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.detail}
            </td>
        </tr>
    )
}

export default ContractsProvRow