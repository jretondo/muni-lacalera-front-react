import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import actionsBackend from 'context/actionsBackend';
import alertsContext from 'context/alerts';
import UrlNodeServer from '../../../api/nodeServer';

const FormFixAmount = ({
    setIdAmount,
    idAmount,
    setOpenForm
}) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const { loadingActions, axiosPost, axiosGet } = useContext(actionsBackend)
    const { newAlert, newActivity } = useContext(alertsContext)

    const amountPost = async () => {
        const data = {
            amount_name: name,
            amount: amount,
            description: description,
            per_hour: 0
        }
        if (idAmount) {
            data.id = idAmount
        }
        const response = await axiosPost(UrlNodeServer.amountsDir.amounts, data)
        if (!response.error) {
            if (idAmount) {
                newAlert("success", "Monto modificado con éxito!", "")
                newActivity(`El ususario ha modificado el monto: ${name}`)
            } else {
                newAlert("success", "Monto cargado con éxito!", "")
                newActivity(`El ususario ha cargado el monto: ${name}`)
            }
            setIdAmount(false)
            setOpenForm(false)
        } else {
            newAlert("danger", `Hubo un error`, `Error: ${response.errorMsg}`)
        }
    }

    const amountGet = async () => {
        const response = await axiosGet(UrlNodeServer.amountsDir.sub.details, idAmount)
        if (!response.error) {
            setName(response.data[0].amount_name)
            setDescription(response.data[0].description)
            setAmount(response.data[0].amount)
        } else {
            newAlert("danger", `Hubo un error`, `Error: ${response.errorMsg}`)
            setIdAmount(false)
        }
    }

    useEffect(() => {
        if (idAmount) {
            amountGet()
        }
        // eslint-disable-next-line 
    }, [idAmount])

    if (loadingActions) {
        return (<Row><Col md="12" style={{ textAlign: "center" }}><Spinner style={{ width: "200px", height: "200px" }} color="warning" /></Col></Row>)
    } else {
        return (
            <Form onSubmit={e => {
                e.preventDefault()
                amountPost()
            }}>
                <h2>{idAmount ? "Modificar Monto" : "Nuevo Monto"}</h2>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>Nombre del monto</Label>
                            <Input required type="text" value={name} onChange={e => setName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Monto</Label>
                            <Input required type="number" step="0.01" min="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Descripción</Label>
                            <Input type="textarea" value={description} onChange={e => setDescription(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button color="primary"  >
                            {idAmount ? "Modificar Monto" : "Agregar Monto"}
                        </Button>
                        <Button color="danger" onClick={e => {
                            e.preventDefault()
                            setOpenForm(false)
                            setIdAmount(false)
                        }}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default FormFixAmount