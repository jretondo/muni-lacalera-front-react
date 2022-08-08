import UrlNodeServer from '../../../../../api/nodeServer';
import { SectorsListOpt } from 'components/Customs/ListsOptions/sectorsList';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import ModalProviders from 'views/admin/payments/components/form/modalProviders';

const Filter = ({
    moduleActive,
    setData
}) => {
    const [sectorId, setSectorId] = useState("")
    const [providerId, setProviderId] = useState("")
    const [providerName, setProviderName] = useState("")
    const [providerModal, setProviderModal] = useState(false)
    const [groupType, setGroupType] = useState(1)
    const [loading, setLoading] = useState(false)
    const { axiosGetQuery } = useContext(ActionsBackend)
    const { newAlert } = useContext(AlertsContext)

    const generateReport = async () => {
        setLoading(true)
        const data = [
            { groupBy: groupType },
            { providerId: providerId },
            { sectorId: sectorId }
        ]
        if (sectorId !== "") {
            data.push({ idSector: sectorId })
        }
        if (providerId !== "") {
            data.push({ idProvider: providerId })
        }

        const response = await axiosGetQuery(UrlNodeServer.reportsDir.sub.pending, data)

        if (!response.error) {
            setData(response.data)
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
                            Agrupar por
                        </Label>
                        <Input type="select" value={groupType} onChange={e => setGroupType(e.target.value)}>
                            <option value={1}>Por Monotributista</option>
                            <option value={2}>Por Sector</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12" style={{ textAlign: "center" }}>
                    <Button color="primary" onClick={e => {
                        e.preventDefault()
                        generateReport()
                    }} >
                        Generar Reporte
                    </Button>
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