import Header from 'components/Headers/Header';
import React, { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import secureContext from 'context/secureRoutes';
import UrlNodeServer from '../../../api/nodeServer';

const ProvidersModule = () => {
    const { setUrlRoute } = useContext(secureContext)
    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.providers)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container>

            </Container>
        </>
    )
}

export default ProvidersModule