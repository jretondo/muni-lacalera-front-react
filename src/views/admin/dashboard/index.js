import React, { useContext, useEffect } from "react";
import Header from "components/Headers/Header.js";
import secureContext from 'context/secureRoutes';
import UrlNodeServer from "../../../api/nodeServer";

const Index = () => {
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.dashboard)
    }, [])

    return (
        <>
            <Header />
        </>
    )
}

export default Index;
