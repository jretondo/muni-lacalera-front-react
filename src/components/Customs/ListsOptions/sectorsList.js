import UrlNodeServer from '../../../api/nodeServer';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';

export const SectorsListOpt = ({
    refresh,
    setSectorId
}) => {
    const [listSectors, setListSectors] = useState(<></>)
    const {
        loadingList,
        dataPage,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.sectorsDir.sectors,
            0, refresh, [{ query: "" }])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            setListSectors(
                dataPage.map((item, key) => {
                    if (key === 0) {
                        setSectorId(item.id)
                    }
                    return (<option key={key} value={item.id}>{item.sector}</option>)
                })
            )
        } else {
            setListSectors(<></>)
        }
    }, [errorList, dataPage, setSectorId])

    return (
        loadingList ? null : listSectors
    )
}