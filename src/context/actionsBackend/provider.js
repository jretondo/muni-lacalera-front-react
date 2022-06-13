import axios from 'axios';
import { useState } from 'react';
import ActionsBackend from './index';
import React from 'react';

const ActionsBackendProvider = ({ children }) => {
    const [loadingActions, setLoadingActions] = useState(false)

    const axiosPost = async (url, data) => {
        setLoadingActions(true)
        return axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201 || res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    return (
        <ActionsBackend.Provider value={{
            loadingActions: loadingActions,
            axiosPost: axiosPost
        }}>
            {children}
        </ActionsBackend.Provider>
    )
}

export default ActionsBackendProvider