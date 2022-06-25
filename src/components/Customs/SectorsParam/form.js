import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import actionsBackend from 'context/actionsBackend';
import alertsContext from 'context/alerts';
import UrlNodeServer from '../../../api/nodeServer';

const FormSector = ({
    setIdSector,
    idSector,
    setOpenForm
}) => {
    const [sectorName, setSectorName] = useState("")
    const [sectorDescr, setSectorDescr] = useState("")
    const { loadingActions, axiosPost, axiosGet } = useContext(actionsBackend)
    const { newAlert, newActivity } = useContext(alertsContext)

    const sectorPost = async () => {
        const data = {
            sector: sectorName,
            description: sectorDescr
        }
        if (idSector) {
            data.id = idSector
        }
        const response = await axiosPost(UrlNodeServer.sectorsDir.sectors, data)
        if (!response.error) {
            if (idSector) {
                newAlert("success", "Sector modificado con éxito!", "")
                newActivity(`El ususario ha modificado el sector: ${sectorName}`)
            } else {
                newAlert("success", "Sector cargado con éxito!", "")
                newActivity(`El ususario ha cargado el sector: ${sectorName}`)
            }
            setIdSector(false)
            setOpenForm(false)
        } else {
            newAlert("danger", `Hubo un error`, `Error: ${response.errorMsg}`)
        }
    }

    const sectorGet = async () => {
        const response = await axiosGet(UrlNodeServer.sectorsDir.sub.details, idSector)
        if (!response.error) {
            setSectorName(response.data[0].sector)
            setSectorDescr(response.data[0].description)
        } else {
            newAlert("danger", `Hubo un error`, `Error: ${response.errorMsg}`)
            setIdSector(false)
        }
    }

    useEffect(() => {
        if (idSector) {
            sectorGet()
        }
        // eslint-disable-next-line 
    }, [idSector])

    if (loadingActions) {
        return (<Row><Col md="12" style={{ textAlign: "center" }}><Spinner style={{ width: "200px", height: "200px" }} color="warning" /></Col></Row>)
    } else {
        return (
            <Form onSubmit={e => {
                e.preventDefault()
                sectorPost()
            }}>
                <h2>{idSector ? "Modificar Sector" : "Nuevo Sector"}</h2>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Nombre del sector</Label>
                            <Input type="text" value={sectorName} onChange={e => setSectorName(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Descripción</Label>
                            <Input type="textarea" value={sectorDescr} onChange={e => setSectorDescr(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button color="primary"  >
                            {idSector ? "Modificar Sector" : "Agregar Sector"}
                        </Button>
                        <Button color="danger" onClick={e => {
                            e.preventDefault()
                            setOpenForm(false)
                            setIdSector(false)
                        }}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default FormSector