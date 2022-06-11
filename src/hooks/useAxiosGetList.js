import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAxiosGetList = (url, page, refresh, querys) => {
    const [pageObj, setPagesObj] = useState([])
    const [dataPage, setDataPage] = useState([])
    const [errorList, setErrorList] = useState(null)
    const [loadingList, setLoadingList] = useState(false)

    const processQuerys = async (querysArray = [{
        query: ""
    }]) => {
        let queryString = ""
        if (querysArray.length > 0) {
            return new Promise((resolve, reject) => {
                // eslint-disable-next-line
                querysArray.map((item, key) => {
                    const obj = Object.keys(item)
                    if (item[obj[0]]) {
                        if (queryString === "") {
                            queryString = `?${queryString}${obj[0]}=${item[obj[0]]}`
                        } else {
                            queryString = `${queryString}&${obj[0]}=${item[obj[0]]}`
                        }
                    }
                    if (key === querysArray.length - 1) {
                        resolve(queryString)
                    }
                })
            })
        }
    }

    useEffect(() => {
        const getList = async () => {
            setPagesObj([])
            setDataPage([])
            setErrorList(null)
            setLoadingList(true)
            let query = ""
            if (querys.length > 0) {
                query = await processQuerys(querys)
            }
            let urlApi = url
            if (page > 0) {
                urlApi = `${url}/${page}`
            }
            await axios.get(`${urlApi}${query}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }).then(res => {
                if (res.data.status === 200) {
                    if (res.data.body.data.length > 0) {
                        setDataPage(res.data.body.data)
                        setPagesObj(res.data.body.pagesObj)
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
        if (url) {
            getList()
        } else {
            setLoadingList(false)
        }
        // eslint-disable-next-line
    }, [page, url, refresh])

    return { pageObj, dataPage, errorList, loadingList }
}