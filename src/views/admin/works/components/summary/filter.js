import UrlNodeServer from '../../../../../api/nodeServer';
import { SectorsListOpt } from 'components/Customs/ListsOptions/sectorsList';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, Spinner } from 'reactstrap';
import ModalProviders from './modalProviders';

const SummaryFilter = ({
    setData,
    loading,
    setLoading
}) => {
    const [sectorId, setSectorId] = useState("")
    const [providerId, setProviderId] = useState("")
    const [fromMonth, setFromMonth] = useState(1)
    const [toMonth, setToMonth] = useState(12)
    const [fromYear, setFromYear] = useState(new Date().getFullYear())
    const [toYear, setToYear] = useState(new Date().getFullYear())
    const [modalProvider, setModalProvider] = useState(false)
    const [providerName, setProviderName] = useState("")
    const { newAlert } = useContext(AlertsContext)
    const { axiosGetQuery } = useContext(ActionsBackend)

    const createReport = async () => {
        setLoading(true)
        const data = [
            { fromMonth: fromMonth },
            { fromYear: fromYear },
            { toMonth: toMonth },
            { toYear: toYear }
        ]
        if (sectorId !== "") {
            data.push({ idSector: sectorId })
        }
        if (providerId !== "") {
            data.push({ idProvider: providerId })
        }

        const response = await axiosGetQuery(UrlNodeServer.worksDir.sub.summary, data)

        if (!response.error) {
            console.log('response.data :>> ', response.data);
            setData(response.data)
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
        return (
            <>
                <Form onSubmit={e => {
                    e.preventDefault()
                    createReport()
                }}>
                    <Row>
                        <Col md="5">
                            <Row>
                                <Col md="6">
                                    <FormGroup >
                                        <Label>Mes desde</Label>
                                        <Input value={fromMonth} onChange={e => setFromMonth(e.target.value)} type="select">
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
                                <Col md="6">
                                    <FormGroup >
                                        <Label>
                                            Año desde
                                        </Label>
                                        <Input value={fromYear} onChange={e => setFromYear(e.target.value)} type="number" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup >
                                        <Label>Mes desde</Label>
                                        <Input value={toMonth} onChange={e => setToMonth(e.target.value)} type="select">
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
                                <Col md="6">
                                    <FormGroup >
                                        <Label>
                                            Año hasta
                                        </Label>
                                        <Input value={toYear} onChange={e => setToYear(e.target.value)} type="number" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="5">
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>Sectores
                                        </Label>
                                        <Input type="select" value={sectorId} onChange={e => setSectorId(e.target.value)} >
                                            <option value="">Todos los sectores</option>
                                            <SectorsListOpt
                                                refresh={false}
                                                setSectorId={setSectorId}
                                                allFirst={true}
                                            />
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>
                                            Monotributista
                                        </Label>
                                        <InputGroup>
                                            <Input
                                                value={providerId ? providerName : "Todos los Monotributistas"}
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
                            </Row>
                        </Col>
                        <Col md="2">
                            <Row style={{ marginTop: "25%" }}>
                                <Col style={{ textAlign: "center" }}>
                                    <Button color="warning" style={{ height: "80px", width: "120px" }}
                                        type="submit"
                                    >
                                        <span>Generar</span><br />
                                        <span>Reporte</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Form>
                <ModalProviders
                    modal={modalProvider}
                    toggle={() => setModalProvider(!modalProvider)}
                    setProviderId={setProviderId}
                    setProviderName={setProviderName}
                />
            </>
        )
    }
}

export default SummaryFilter