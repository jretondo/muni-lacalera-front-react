import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import ModalProviders from './modalProviders';

const FormPayment = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = (new Date().getMonth() + 1)
    const [providerId, setProviderId] = useState(false)
    const [providerName, setProviderName] = useState("")
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [cantHours, setCantHours] = useState(0)
    const [priceHour, setPriceHour] = useState(0)
    const [total, setTotal] = useState(0)
    const [details, setDetails] = useState("")
    const [isProfHelth, setIsProfHealth] = useState(false)
    const [modalProvider, setModalProvider] = useState(false)


    const registerWork = async () => {

    }

    useEffect(() => {
        setModalProvider(false)
    }, [providerId])

    useEffect(() => {
        if (isProfHelth) {
            setTotal(cantHours * priceHour)
        }
    }, [cantHours, isProfHelth, priceHour])

    return (<>
        <Form onSubmit={e => {
            e.preventDefault()
            registerWork()
        }}>
            <Row>
                <Col md="6">
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
            </Row>
            {
                !providerId ? null :
                    isProfHelth ?
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label>
                                        Cant. de Hs.
                                    </Label>
                                    <Input type="number" min={1} step={1} value={cantHours} onChange={e => setCantHours(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>
                                        $ / Hs
                                    </Label>
                                    <Input value={priceHour} disabled />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>
                                        Total
                                    </Label>
                                    <Input value={total} disabled />
                                </FormGroup>
                            </Col>
                        </Row> :
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label>
                                        Total
                                    </Label>
                                    <Input type="number" value={total} onChange={e => setTotal(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
            }
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
            setIsProfHealth={setIsProfHealth}
            setPriceHour={setPriceHour}
            setTotal={setTotal}
            setCantHours={setCantHours}
        />
    </>)
}

export default FormPayment