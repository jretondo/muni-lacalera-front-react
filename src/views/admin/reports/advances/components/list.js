import CompleteCerosLeft from 'function/completeCeroLeft';
import { monthToStr } from 'function/monthStr';
import { numberFormat } from 'function/numberFormat';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';

const List = ({ data, monthSelect, yearSelect, loading }) => {
    const [pendingsList, setPendingsList] = useState(<tr><td>No hay reporte generado con los filtro colocados</td></tr>)
    const [multiToggle, setMultiToggle] = useState([false, false, false, false])

    const toggle = (key) => {
        const actualState = multiToggle[key]
        console.log('actualState :>> ', actualState);
        const newMultiToggle = multiToggle
        newMultiToggle.splice(key, 1, !actualState)
        setMultiToggle(() => [...newMultiToggle])
    }

    useEffect(() => {
        let multiArray = []
        // eslint-disable-next-line 
        data.map((item, key) => {
            multiArray.push(false)
            if (data.length - 1 === key) {
                setMultiToggle(multiArray)
            }
        })
    }, [data])

    useEffect(() => {
        setPendingsList(
            data.map((item, key) => {
                return (
                    <Row style={{ marginTop: "30px", background: "#959595" }}>
                        <Col md="12">
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label style={{ color: "white" }}>Comprobante</Label>
                                        <Input type="text" disabled style={{ fontWeight: "bold" }} value={`Nº: ${CompleteCerosLeft(item.paymentData.pv, 5)}-${CompleteCerosLeft(item.paymentData.number, 8)} (${moment(item.paymentData.date).format("DD/MM/YYYY H:m")}hs)`} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label style={{ color: "white" }}>Monotributista</Label>
                                        <Input type="text" disabled style={{ fontWeight: "bold" }} value={`${item.paymentData.name} (${item.paymentData.cuit})`} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label style={{ color: "white" }}>Monto total solicitado</Label>
                                        <Input type="text" disabled style={{ fontWeight: "bold" }} value={`$ ${numberFormat(item.paymentData.total)}`} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" onClick={() => toggle(key)} style={{ marginBottom: '1rem' }}>{multiToggle[key] ? "Ocultar cuotas" : "Ver cuotas pendientes"}</Button>
                            <Collapse isOpen={multiToggle[key]}>
                                {item.installments.map((item2, key2) => {
                                    return (
                                        <Row>
                                            <Col md="2">

                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label style={{ color: "white" }}>
                                                        Periodo
                                                    </Label>
                                                    <Input type="text" disabled style={{ fontWeight: "bold" }} value={`${monthToStr(item2.month)}/${item2.year}`} />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <Label style={{ color: "white" }}>
                                                        Monto cuota
                                                    </Label>
                                                    <Input type="text" disabled style={{ fontWeight: "bold" }} value={numberFormat(item2.amount)} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Collapse>
                        </Col>
                    </Row>
                )
            })
        )
        // eslint-disable-next-line 
    }, [multiToggle])

    return (
        <>
            {
                loading ?
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <Spinner style={{ width: "150px", height: "150px" }} />
                        </Col>
                    </Row> :
                    <>
                        {pendingsList}
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <FormGroup>
                                    <Label style={{ fontWeight: "bold" }}>
                                        Periodo filtrado desde (inclusive)
                                    </Label>
                                    <Input type="text" disabled style={{ fontSize: "20px", fontWeight: "bold" }} value={`${monthSelect}/${yearSelect}`} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default List