import Header from 'components/Headers/Header';
import React, { useContext, useEffect } from 'react';
import secureContext from 'context/secureRoutes';
import UrlNodeServer from "../../../api/nodeServer";

const PaymentsReg = () => {
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.providers)
    }, [setUrlRoute])

    return (<>
        <Header />
    </>)
}

export default PaymentsReg