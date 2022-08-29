import UrlNodeServer from '../../../../../api/nodeServer';
import { SectorsListOpt } from 'components/Customs/ListsOptions/sectorsList';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, Spinner } from 'reactstrap';
import ModalProviders from 'views/admin/payments/components/form/modalProviders';

const Filter = ({
    moduleActive,
    setData,
    setMonthSelect,
    setYearSelect,
    setLoading,
    loading
}) => {
    const [sectorId, setSectorId] = useState("")
    const [providerId, setProviderId] = useState("")
    const [providerName, setProviderName] = useState("")
    const [providerModal, setProviderModal] = useState(false)
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const { axiosGetQuery } = useContext(ActionsBackend)
    const { newAlert } = useContext(AlertsContext)

    const generateReport = async () => {
        setLoading(true)
        const data = [
            { providerId: providerId },
            { sectorId: sectorId },
            { month: month },
            { year: year }
        ]
        if (sectorId !== "") {
            data.push({ idSector: sectorId })
        }
        if (providerId !== "") {
            data.push({ idProvider: providerId })
        }

        const response = await axiosGetQuery(UrlNodeServer.reportsDir.sub.advances, data)

        if (!response.error) {
            setYearSelect(year)
            switch (month) {
                case 1:
                    setMonthSelect("Enero")
                    break;
                case 2:
                    setMonthSelect("Febrero")
                    break;
                case 3:
                    setMonthSelect("Marzo")
                    break;
                case 4:
                    setMonthSelect("Abril")
                    break;
                case 5:
                    setMonthSelect("Mayo")
                    break;
                case 6:
                    setMonthSelect("Junio")
                    break;
                case 7:
                    setMonthSelect("Julio")
                    break;
                case 8:
                    setMonthSelect("Agosto")
                    break;
                case 9:
                    setMonthSelect("Septiembre")
                    break;
                case 10:
                    setMonthSelect("Octubre")
                    break;
                case 11:
                    setMonthSelect("Noviembre")
                    break;
                case 12:
                    setMonthSelect("Diciembre")
                    break;

                default:
                    break;
            }
            setData(response.data.data)
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
        setLoading(false)
    }

    return (
        <>
            <Row style={{ marginBottom: "15px" }}>
                <Col md="4">
                    <FormGroup>
                        <Label>Sector</Label>
                        <Input value={sectorId} onChange={e => setSectorId(e.target.value)} type="select">
                            <option value={""}>Todos los sectores</option>
                            <SectorsListOpt
                                refresh={moduleActive}
                                setSectorId={setSectorId}
                                allFirst={true}
                            />
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="4">
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
                                        setProviderModal(true)
                                    }}
                                ><i className='fa fa-search'></i></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <Label>
                            Periodo desde
                        </Label>
                        <Row>
                            <Col md="8">
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
                            </Col>
                            <Col md="4">
                                <Input type="number" value={year} onChange={e => setYear(e.target.value)} />
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12" style={{ textAlign: "center" }}>
                    {loading ? <Spinner color="primary" /> : <Button color="primary" onClick={e => {
                        e.preventDefault()
                        generateReport()
                    }} >
                        Generar Reporte
                    </Button>}
                </Col>
            </Row>
            <ModalProviders
                modal={providerModal}
                toggle={() => setProviderModal(!providerModal)}
                setProviderId={setProviderId}
                setProviderName={setProviderName}
            />
        </>
    )
}
export default Filter