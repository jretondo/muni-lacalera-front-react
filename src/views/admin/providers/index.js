import Header from 'components/Headers/Header';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup, Card, CardBody, CardHeader, Collapse, Container } from 'reactstrap';
import secureContext from 'context/secureRoutes';
import UrlNodeServer from '../../../api/nodeServer';
import ButtonOpenCollapse from 'components/Buttons/buttonOpenCollapse';
import { useWindowSize } from '../../../hooks/UseWindowSize';
import List from './components/list';
import Params from './components/params';
import FormInput from './components/form';

const ProvidersModule = () => {
    const [moduleActive, setModuleActive] = useState(0)
    const [idProv, setIdProv] = useState(false)
    const { setUrlRoute } = useContext(secureContext)
    const width = useWindowSize()

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.providers)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Card>
                    <CardHeader style={{ textAlign: "center" }}>
                        <ButtonGroup vertical={width > 1030 ? false : true}>
                            <ButtonOpenCollapse
                                action={() => setModuleActive(0)}
                                tittle={"Monotributistas"}
                                active={moduleActive === 0 ? true : false}
                            />
                            <ButtonOpenCollapse
                                action={() => {
                                    setIdProv(false)
                                    setModuleActive(1)
                                }}
                                tittle={idProv ? "Modificar Datos" : "Nuevo Monotributista"}
                                active={moduleActive === 1 ? true : false}
                            />
                            <ButtonOpenCollapse
                                action={() => setModuleActive(2)}
                                tittle={"Parametros"}
                                active={moduleActive === 2 ? true : false}
                            />
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody>
                        <Collapse isOpen={moduleActive === 0 ? true : false} >
                            <List
                                setIdProv={setIdProv}
                                setModuleActive={setModuleActive}
                                moduleActive={moduleActive}
                            />
                        </Collapse>
                        <Collapse isOpen={moduleActive === 1 ? true : false} >
                            <FormInput
                                idProv={idProv}
                                setIdProv={setIdProv}
                                setModuleActive={setModuleActive}
                            />
                        </Collapse>
                        <Collapse isOpen={moduleActive === 2 ? true : false} >
                            <Params />
                        </Collapse>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default ProvidersModule