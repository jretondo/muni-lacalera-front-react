import UrlNodeServer from '../../../../../api/nodeServer';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, Label, Row, Spinner } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import ModalProviders from './modalProviders';

const FormPayment = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = (new Date().getMonth() + 1)
    const [providerId, setProviderId] = useState(false)
    const [providerName, setProviderName] = useState("")
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [advance, setAdvance] = useState("")
    const [type, setType] = useState("")
    const [total, setTotal] = useState(0)
    const [details, setDetails] = useState("")
    const [modalProvider, setModalProvider] = useState(false)
    const [loading, setLoading] = useState(false)
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosPost } = useContext(ActionsBackend)

    const registerWork = async () => {
        setLoading(true)
        const data = {
            id_provider: providerId,
            month: month,
            year: year,
            amount: total,
            details: details,
            type: type,
            advance: advance
        }

        const response = await axiosPost(UrlNodeServer.paymentsDir.payments, data)

        if (!response.error) {
            setDetails("")
            newActivity(`El usuario ha registrado un nuevo ${advance === "" ? "adelanto" : "pago"} al proveedor de ID: ${providerId})`)
            newAlert("success", "Pago registrado con éxito!", "")
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
        setLoading(false)
    }

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
                            Tipo de Liquidación
                        </Label>
                        <Input type="text" value={type} onChange={e => setType(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormGroup>
                            <Label>
                                Mes
                            </Label>
                            <Input type="select" value={month} onChange={e => setMonth(e.target.value)}>
                                <option value={1}>Enero</option>
                                <option value={2}>Febrero</option>
                                <option value={3}>Marzo</option>
                                <option value={4}>Abril</option>
                                <option value={5}>Mayo</option>
                                <option value={6}>Junio</option>
                                <option value={7}>Julio</option>
                                <option value={8}>Agosto</option>
                                <option value={9}>Septiembre</option>
                                <option value={10}>Octubre</option>
                                <option value={11}>Noviembre</option>
                                <option value={12}>Diciembre</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="2">
                        <FormGroup>
                            <Label>
                                Año
                            </Label>
                            <Input type="number" min={2010} value={year} onChange={e => setYear(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <Label>
                                Total
                            </Label>
                            <Input type="number" value={total} onChange={e => setTotal(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <Label>
                            Tipo de Pago
                        </Label>
                        <Input type="select" value={advance} onChange={e => advance(e.target.value)}>
                            <option value={""}>Registro de pago</option>
                            <option value={"1"}>Adelanto de sueldo</option>
                        </Input>
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