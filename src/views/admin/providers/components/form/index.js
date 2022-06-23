import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { SectorsListOpt } from '../sectorsList';
import AmountsFixModal from './components/amountsFix';
import AmountsPerHModal from './components/amountsPerHour';
import NdocInput from './components/nDocInput';
import SectorsModal from './components/sectors';

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

    const [modalAmountFix, setModalAmountFix] = useState(false)
    const [modalAmountPerH, setModalAmountPerH] = useState(false)
    const [modalSectors, setModalSectors] = useState(false)

    useEffect(() => {
        console.log('dataFiscal :>> ', dataFiscal);
        if (dataFiscal.datosGenerales) {
            const gralData = dataFiscal.datosGenerales
            if (gralData.apellido) {
                setDni(cuit.substring(2, 10))
                setName(gralData.apellido + " " + gralData.nombre)
            } else if (gralData.razonSocial) {
                setName(gralData.razonSocial)
            } else {
                setName("")
            }
            if (gralData.domicilioFiscal) {
                setDirection(`${gralData.domicilioFiscal.direccion}, ${gralData.domicilioFiscal.localidad ? `, ${(gralData.domicilioFiscal.localidad).replace("*", "").trim()}` : ""}${gralData.domicilioFiscal.descripcionProvincia}`)
            } else {
                setDirection("")
            }
        }
        if (dataFiscal.datosMonotributo) {
            const monotrData = dataFiscal.datosMonotributo
            setActivity(monotrData.actividadMonotributista.descripcionActividad)
            setCatMono(monotrData.categoriaMonotributo.descripcionCategoria)
        } else {
            setActivity("")
            setCatMono("")
        }
    }, [dataFiscal, cuit])

    return (
        <>
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
                    <Col md="8">
                        <FormGroup>
                            <Label>
                                Dirección
                            </Label>
                            <Input value={direction} onChange={e => setDirection(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <Label>
                            Cat. Monotr.
                        </Label>
                        <Input disabled value={catMono} onChange={e => setCatMono(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col md={parseInt(isProf) === 1 ? 6 : 8}>
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
                            <Input onChange={e => setIsProf(e.target.value)} value={isProf} type="select">
                                <option value={1}>Si</option>
                                <option value={0}>No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    {
                        parseInt(isProf) === 1 ? <Col md="2">
                            <FormGroup>
                                <Label>
                                    Nº M.P.:
                                </Label>
                                <Input value={profNumber} onChange={e => setProfNumber(e.target.value)} />
                            </FormGroup>
                        </Col> : null
                    }
                    <Col md="2">
                        <FormGroup>
                            <Label>
                                Salud
                            </Label>
                            <Input type="select" value={isHealthProf} onChange={e => setIsHealthProf(e.target.value)} >
                                <option value={1}>Si</option>
                                <option value={0}>No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label>Sectores
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
                                        setModalSectors(true)
                                    }}
                                ><i className='fa fa-plus'></i></Button>
                            </Label>
                            <Input type="select" value={sectorId} onChange={e => setSectorId(e.target.value)} >
                                <SectorsListOpt />
                            </Input>
                        </FormGroup>
                    </Col>
                    {parseInt(isHealthProf) === 1 ?
                        <>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Monto por hora ($/hs)
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
                                                setModalAmountPerH(true)
                                            }}
                                        ><i className='fa fa-plus'></i></Button>
                                    </Label>
                                    <Input type="select" value={amountId} onChange={e => setAmountId(e.target.value)} >

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup style={{ marginTop: "10px" }}>
                                    <Label>Hs por mes</Label>
                                    <Input type="number" value={hours} onChange={e => setHours(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </> : <>
                            <Col>
                                <FormGroup>
                                    <Label>Monto fijo ($)
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
                                                setModalAmountFix(true)
                                            }}
                                        ><i className='fa fa-plus'></i></Button>
                                    </Label>
                                    <Input type="select" value={monthAmount} onChange={e => setMonthAmount(e.target.value)}>

                                    </Input>
                                </FormGroup>
                            </Col>
                        </>}
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button color="primary">
                            Agregar Monotributista
                        </Button>
                        <Button color="danger">
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
            <AmountsFixModal
                toggle={() => setModalAmountFix(!modalAmountFix)}
                modal={modalAmountFix}
            />
            <AmountsPerHModal
                toggle={() => setModalAmountPerH(!modalAmountPerH)}
                modal={modalAmountPerH}
            />
            <SectorsModal
                toggle={() => setModalSectors(!modalSectors)}
                modal={modalSectors}
            />
        </>
    )

}

export default FormInput