import UrlNodeServer from '../../../../api/nodeServer';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';

export const SectorsListOpt = () => {
    const [listSectors, setSectors] = useState(<></>)
    const {
        loadingList,
        dataPage,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.sectorsDir.sectors,
            0, false, [{ query: "" }])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            dataPage.map((item, key) => {
                return (<option value={item.id}>{item.sector}</option>)
            })
        } else {
            setSectors(<></>)
        }
    }, [errorList, dataPage])

    return (
        loadingList ? null : listSectors
    )
}