import Header from 'components/Headers/Header';
import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import UrlNodeServer from "../../../api/nodeServer";
import { ButtonGroup, Card, CardBody, CardHeader, Collapse, Container } from 'reactstrap';
import ButtonOpenCollapse from 'components/Buttons/buttonOpenCollapse';
import { useWindowSize } from '../../../hooks/UseWindowSize';
import ListPayments from './components/list';
import FormPayment from './components/form';
import SumaryPayments from './components/sumary';

const PaymentsReg = () => {
    const { setUrlRoute } = useContext(secureContext)
    const [moduleActive, setModuleActive] = useState(0)
    const [idPayment, setIdPayment] = useState(false)
    const width = useWindowSize()

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.payments)
    }, [setUrlRoute])

    return (<>
        <Header />
        <Container className="mt--7" fluid>
            <Card>
                <CardHeader style={{ textAlign: "center" }}>
                    <ButtonGroup vertical={width > 1030 ? false : true}>
                        <ButtonOpenCollapse
                            action={() => setModuleActive(0)}
                            tittle={"Lista de pagos"}
                            active={moduleActive === 0 ? true : false}
                        />
                        <ButtonOpenCollapse
                            action={() => {
                                setIdPayment(false)
                                setModuleActive(1)
                            }}
                            tittle={idPayment ? "Modificar Pago" : "Nuevo Pago"}
                            active={moduleActive === 1 ? true : false}
                        />
                        <ButtonOpenCollapse
                            action={() => setModuleActive(2)}
                            tittle={"Resumenes"}
                            active={moduleActive === 2 ? true : false}
                        />
                    </ButtonGroup>
                </CardHeader>
                <CardBody>
                    <Collapse isOpen={moduleActive === 0 ? true : false} >
                        <ListPayments
                            setIdPayment={setIdPayment}
                            setModuleActive={setModuleActive}
                            moduleActive={moduleActive}
                        />
                    </Collapse>
                    <Collapse isOpen={moduleActive === 1 ? true : false} >
                        <FormPayment
                            idPayment={idPayment}
                            setModuleActive={setModuleActive}
                            setIdPayment={setIdPayment}
                        />
                    </Collapse>
                    <Collapse isOpen={moduleActive === 2 ? true : false} >
                        <SumaryPayments />
                    </Collapse>
                </CardBody>
            </Card>
        </Container>
    </>)
}

export default PaymentsReg