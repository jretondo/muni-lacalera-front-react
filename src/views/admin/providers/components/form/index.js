import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import NdocInput from './components/nDocInput';

const FormInput = ({
    idProv
}) => {
    const [cuit, setCuit] = useState("")
    const [name, setName] = useState("")
    const [sectorId, setSectorId] = useState("")
    const [dni, setDni] = useState("")
    const [direction, setDirection] = useState("")
    const [profNumber, setProfNumber] = useState("")
    const [isProf, setIsProf] = useState(0)
    const [isHealthProf, setIsHealthProf] = useState(0)
    const [hours, setHours] = useState(0)
    const [monthAmount, setMonthAmount] = useState(0)
    const [amountId, setAmountId] = useState(0)
    const [catMono, setCatMono] = useState("")
    const [activity, setActivity] = useState("")
    const [invalidDNI, setInvalidDNI] = useState(false)
    const [invalidCUIT, setInvalidCUIT] = useState(false)
    const [dataFiscal, setDataFisca] = useState([])


    useEffect(() => {
        console.log('dataFiscal :>> ', dataFiscal);
        const gralData = dataFiscal.datosGenerales
        const monotrData = dataFiscal.datosMonotributo
        setName(gralData.apellido + " " + gralData.nombre)
        setDni(cuit.substring(2, 10))
    }, [dataFiscal])
    return (
        <Form>
            <Row>
                <NdocInput
                    tipoDoc={80}
                    ndoc={cuit}
                    setNdoc={setCuit}
                    invalidNdoc={invalidCUIT}
                    setInvalidNdoc={setInvalidCUIT}
                    setDataFisca={setDataFisca}
                    colSize={3}
                />
                <NdocInput
                    tipoDoc={96}
                    ndoc={dni}
                    setNdoc={setDni}
                    invalidNdoc={invalidDNI}
                    setInvalidNdoc={setInvalidDNI}
                    colSize={3}
                />
                <Col md="6">
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input value={name} onChange={e => setName(e.target.value)} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="10">
                    <FormGroup>
                        <Label>
                            Dirección
                        </Label>
                        <Input value={direction} onChange={e => setDirection(e.target.value)} />
                    </FormGroup>
                </Col>
                <Col md="2">
                    <Label>
                        Cat. Monotr.
                    </Label>
                    <Input disabled value={catMono} onChange={e => setCatMono(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <FormGroup>
                        <Label>
                            Actividad
                        </Label>
                        <Input value={activity} disabled />
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>
                            Profesional
                        </Label>
                        <Input type="select">
                            <option value={1}>Si</option>
                            <option value={0}>No</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>
                            Nº M.P.:
                        </Label>
                        <Input value={profNumber} onChange={e => e.target.value} />
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>
                            Salud
                        </Label>
                        <Input type="select">
                            <option value={1}>Si</option>
                            <option value={0}>No</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )

}

export default FormInput