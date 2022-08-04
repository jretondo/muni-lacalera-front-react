import UrlNodeServer from '../../../../../api/nodeServer';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, Label, Row, Spinner } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import ModalProviders from './modalProviders';
import PeriodRow from './periosRow';
import { numberFormat } from 'function/numberFormat';

const FormPayment = () => {
    const [providerId, setProviderId] = useState(false)
    const [providerName, setProviderName] = useState("")
    const [advance, setAdvance] = useState("")
    const [total, setTotal] = useState(0)
    const [details, setDetails] = useState("")
    const [modalProvider, setModalProvider] = useState(false)
    const [loading, setLoading] = useState(false)

    const [periods, setPeriods] = useState([{ month: 1, year: new Date().getFullYear(), amount: 0 }])
    const [periodsPlant, setPeriodsPlant] = useState()

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosPostPDF } = useContext(ActionsBackend)

    const registerWork = async () => {
        if (total > 0 && providerId) {
            setLoading(true)
            const data = {
                id_provider: providerId,
                amount: total,
                details: details,
                advance: advance,
                total: total,
                periods: periods
            }

            const response = await axiosPostPDF(UrlNodeServer.paymentsDir.payments, data)

            if (!response.error) {
                setDetails("")
                setPeriods([{ month: 1, year: new Date().getFullYear(), amount: 0 }])
                setTotal(0)
                setProviderName("")
                setProviderId(false)
                newActivity(`El usuario ha registrado un nuevo ${advance === "" ? "adelanto" : "pago"} al proveedor de ID: ${providerId})`)
                newAlert("success", "Pago registrado con éxito!", "")
            } else {
                newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
            }
            setLoading(false)
        } else {
            newAlert("danger", "Datos inválidos", `Controle el total de los periodos y el monotributista`)
        }
    }

    console.log('periods :>> ', periods);

    useEffect(() => {
        let totalFinish = 0
        setPeriodsPlant(
            // eslint-disable-next-line
            periods.map((item, key) => {
                totalFinish = totalFinish + parseFloat(item.amount)
                if (key === periods.length - 1) {
                    setTotal(totalFinish)
                }
                return (
                    <PeriodRow
                        key={key}
                        id={key}
                        item={item}
                        periods={periods}
                        setPeriods={setPeriods}
                    />)
            })
        )
    }, [periods])

    useEffect(() => {
        setModalProvider(false)
    }, [providerId])

    if (loading) {
        return (
            <Row>
                <Col md="12" style={{ textAlign: "center" }}>
                    <Spinner color="danger" style={{ width: "150px", height: "150px" }} />
                </Col>
            </Row>
        )
    } else {
        return (<>
            <Form onSubmit={e => {
                e.preventDefault()
                registerWork()
            }}>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>
                                Monotributista
                            </Label>
                            <InputGroup>
                                <Input
                                    value={providerName}
                                    type="text"
                                    disabled
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        color="primary"
                                        onClick={e => {
                                            e.preventDefault()
                                            setModalProvider(true)
                                        }}
                                    ><i className='fa fa-search'></i></Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <Label>
                            Tipo de Pago
                        </Label>
                        <Input type="select" value={advance} onChange={e => setAdvance(e.target.value)}>
                            <option value={""}>Registro de pago</option>
                            <option value={"1"}>Adelanto de sueldo</option>
                        </Input>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "15px" }}>
                    <Col md="8" style={{ border: "2px solid red", padding: "15px" }}>
                        <Label style={{ fontWeight: "bold" }}>Períodos
                            <Button
                                color="warning"
                                style={{
                                    borderRadius: "50%",
                                    padding: "6px",
                                    paddingInline: "10px",
                                    marginLeft: "10px"
                                }}
                                onClick={e => {
                                    e.preventDefault()
                                    console.log('periods[periods.length - 1].month :>> ', periods[periods.length - 1].month);
                                    setPeriods(() => [...periods, { month: (periods[periods.length - 1].month === 12 ? 1 : parseInt(periods[periods.length - 1].month) + 1), year: (periods[periods.length - 1].month === 12 ? parseInt(periods[periods.length - 1].year) + 1 : parseInt(periods[periods.length - 1].year)), amount: 0 }])
                                }}
                            ><i className='fa fa-plus'></i></Button>
                        </Label>
                        <Row>
                            {periodsPlant}
                        </Row>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <Label style={{ fontSize: "22px" }}>
                                Total
                            </Label>
                            <Input style={{ fontSize: "22px", fontWeight: "bold" }} type="text" value={"$ " + numberFormat(total)} disabled />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Label>
                            Detalles u Observaciones
                        </Label>
                        <Input type="textarea" value={details} onChange={e => setDetails(e.target.value)} />
                    </Col>
                </Row>
                <Row style={{ marginTop: "25px" }}>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button
                            color="primary"
                            style={{ width: "150px", marginInline: "15px" }}
                            type="submit"
                            disabled={!providerId}
                        >Registrar</Button>
                        <Button
                            color="danger"
                            style={{ width: "150px", marginInline: "15px" }}
                        >Cancelar</Button>

                    </Col>
                </Row>
            </Form>
            <ModalProviders
                modal={modalProvider}
                toggle={() => setModalProvider(!modalProvider)}
                setProviderId={setProviderId}
                setProviderName={setProviderName}
            />
        </>)
    }
}

export default FormPayment