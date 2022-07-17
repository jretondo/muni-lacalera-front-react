import UrlNodeServer from 'api/nodeServer';
import React, { useContext, useEffect } from 'react';
import secureContext from 'context/secureRoutes';
import Header from 'components/Headers/Header';

const Payments = () => {
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.providers)
    }, [setUrlRoute])

    return (<>
        <Header />
    </>)
}

export default Payments