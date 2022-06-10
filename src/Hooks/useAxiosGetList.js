import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAxiosGetList = (url, page, query) => {
    const [pageObj, setPagesObj] = useState({})
    const [dataPage, setDataPage] = useState([])
    const [errorList, setErrorList] = useState(null)
    const [loadingList, setLoadingList] = useState(false)

    useEffect(() => {
        const getList = async () => {
            setloading(true)
            let query1 = ""
            if (query) {
                query1 = "" + query
            }
            await axios.get(`${url}/${page}${query}`, {
                params: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }).then(res => {
                const status = res.data.status
                if (status === 200) {
                    setDataPage(res.data.body.data)
                    setDataPage(res.data.body.totalPag)
                } else {
                    setErrorList("No hay datos para mostrar")
                }
            }).catch(error => {
                setErrorList(error.message)
            }).finally(() => setloading(false))
        }
        if (url && page > 1) {
            getList()
        } else {
            setLoading(false)
        }
    }, [page, url, query])

    return { pageObj, dataPage, errorList, loadingList }
}