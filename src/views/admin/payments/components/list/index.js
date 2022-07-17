import UrlNodeServer from '../../../../../api/nodeServer';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useState } from 'react';

const ListPayments = ({
    setIdPayment,
    setModuleActive,
    moduleActive
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [paymentsRows, setPaymentsRows] = useState(<tr><td>No hay monotributistas con los filtros colocados</td></tr>)
    const [textSearch, setTextSearch] = useState("")
    const [sectorId, setSectorId] = useState("")
    const [idProvider, setIdProvider] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.paymentsDir.payments,
            page, refreshList,
            [{ query: textSearch },
            { sectorId: sectorId },
            { idProvider: idProvider },
            { month: month },
            { year: year }
            ])

    return (<>

    </>)
}

export default ListPayments