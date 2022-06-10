import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAxiosGetList = (url, page, queryBool, query) => {
    const [pageObj, setPagesObj] = useState([])
    const [dataPage, setDataPage] = useState([])
    const [errorList, setErrorList] = useState(null)
    const [loadingList, setLoadingList] = useState(false)

    useEffect(() => {
        const getList = async () => {
            setPagesObj([])
            setDataPage([])
            setErrorList(null)
            setLoadingList(true)
            let query1 = ""
            if (query) {
                query1 = "?query=" + query
            }
            console.log('query1 :>> ', query);
            await axios.get(`${url}/${page}${query1}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }).then(res => {
                if (res.data.status === 200) {
                    if (res.data.body.data.length > 0) {
                        setDataPage(res.data.body.data)
                        setPagesObj(res.data.body.totalPag)
                    } else {
                        setErrorList("No hay datos para mostrar")
                    }
                } else {
                    setErrorList("No hay datos para mostrar")
                }
            }).catch(error => {
                setErrorList(error.message)
            }).finally(() => setLoadingList(false))
        }
        if (url && page > 0) {
            getList()
        } else {
            setLoadingList(false)
        }
    }, [page, url, query])

    return { pageObj, dataPage, errorList, loadingList }
}