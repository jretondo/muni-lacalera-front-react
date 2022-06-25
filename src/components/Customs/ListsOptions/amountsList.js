import UrlNodeServer from '../../../api/nodeServer';
import { useAxiosGetList } from '../../../hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { numberFormat } from 'function/numberFormat';

export const AmountsFixListOpt = ({
    refresh,
    setAmountId,
    type
}) => {
    const [listAmounts, setListAmounts] = useState(<></>)
    const {
        loadingList,
        dataPage,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.amountsDir.amounts,
            0, refresh, [{ type: String(type) }])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            setListAmounts(
                dataPage.map((item, key) => {
                    if (key === 0) {
                        setAmountId(item.id)
                    }
                    return (<option key={key} value={item.id}>{`${item.amount_name} ($ ${numberFormat(item.amount)})`}</option>)
                })
            )
        } else {
            setListAmounts(<></>)
        }
    }, [errorList, dataPage, setAmountId])

    return (
        loadingList ? null : listAmounts
    )
}