import React, { useContext, useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import secureContext from 'context/secureRoutes';
import UrlNodeServer from "../../../api/nodeServer";
import { ButtonGroup, Card, CardBody, CardHeader, Collapse, Container } from "reactstrap";
import ButtonOpenCollapse from "components/Buttons/buttonOpenCollapse";
import { useWindowSize } from "hooks/UseWindowSize";
import ReportsPending from "./pending";
import ReportsAdvances from "./advances";

const ReportsComp = () => {
    const [moduleActive, setModuleActive] = useState(0)
    const { setUrlRoute } = useContext(secureContext)
    const width = useWindowSize()
    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.dashboard)
    }, [setUrlRoute])

    return (<>
        <Header />
        <Container className="mt--7" fluid>
            <Card>
                <CardHeader style={{ textAlign: "center" }}>
                    <ButtonGroup vertical={width > 1030 ? false : true}>
                        <ButtonOpenCollapse
                            action={() => setModuleActive(0)}
                            tittle={"Pendientes de Pago"}
                            active={moduleActive === 0 ? true : false}
                        />
                        <ButtonOpenCollapse
                            action={() => {
                                setModuleActive(1)
                            }}
                            tittle={"Adelantos Pendientes"}
                            active={moduleActive === 1 ? true : false}
                        />
                    </ButtonGroup>
                </CardHeader>
                <CardBody>
                    <Collapse isOpen={moduleActive === 0 ? true : false} >
                        <ReportsPending
                            moduleActive={moduleActive}
                        />
                    </Collapse>
                    <Collapse isOpen={moduleActive === 1 ? true : false} >
                        <ReportsAdvances />
                    </Collapse>
                </CardBody>
            </Card>
        </Container>
    </>)
}

export default ReportsComp;
