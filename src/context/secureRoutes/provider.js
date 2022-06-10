import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import SecureRoutesContext from './index';
import { Redirect } from "react-router-dom";

const SecureRoutesProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [urlRoute, setUrlRoute] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchSecureRoute = async () => {
        try {
            let res = await fetch(urlRoute, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                },
            })
            setLoading(true)
            let data = await res.json()
            const status = parseInt(data.status)
            if (status === 200) {
                setLoading(false)
                setIsLogin(true)
            } else {
                setLoading(false)
                setIsLogin(false)
            }
        } catch (error) {
            console.log('error :>> ', error);
            setLoading(false)
            setIsLogin(false)
        }
        setIsLogin(true)
        setUrlRoute("")
    }

    useEffect(() => {
        if (urlRoute !== "") {
            fetchSecureRoute()
        }
    }, [urlRoute])

    if (isLogin) {
        return (
            <SecureRoutesContext.Provider value={{
                setUrlRoute
            }}>
                {loading ?
                    <div style={{ width: "100%", textAlign: "center" }} >
                        <Spinner
                            style={{ width: "250px", height: "250px" }}
                        />
                    </div>
                    : children
                }
            </SecureRoutesContext.Provider>
        )
    } else {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    }
}

export default SecureRoutesProvider