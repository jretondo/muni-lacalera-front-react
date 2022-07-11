import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AmountsFixListOpt } from '../../../../../components/Customs/ListsOptions/amountsList';

import AmountsFixModal from './components/amountsFix';
import AmountsPerHModal from './components/amountsPerHour';
import NdocInput from './components/nDocInput';
import SectorsModal from './components/sectors';
import actionsBackend from 'context/actionsBackend';
import alertsContext from 'context/alerts';
import UrlNodeServer from '../../../../../api/nodeServer';
import { SectorsListOpt } from 'components/Customs/ListsOptions/sectorsList';

const FormInput = ({
    idProv,
    setIdProv,
    setModuleActive
}) => {
    const [cuit, setCuit] = useState("")
    const [name, setName] = useState("")
    const [sectorId, setSectorId] = useState("")
    const [dni, setDni] = useState("")
    const [direction, setDirection] = useState("")
    const [profNumber, setProfNumber] = useState("")
    const [isProf, setIsProf] = useState(0)
    const [isHealthProf, setIsHealthProf] = useState(0)
    const [hours, setHours] = useState("")
    const [amountId, setAmountId] = useState("")
    const [category, setCategory] = useState("")
    const [activity, setActivity] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [invalidDNI, setInvalidDNI] = useState(false)
    const [invalidCUIT, setInvalidCUIT] = useState(false)
    const [dataFiscal, setDataFisca] = useState([])
    const [fromMonth, setFromMonth] = useState(1)
    const [toMonth, setToMonth] = useState(1)

    const [modalAmountFix, setModalAmountFix] = useState(false)
    const [modalAmountPerH, setModalAmountPerH] = useState(false)
    const [modalSectors, setModalSectors] = useState(false)

    const { newAlert, newActivity } = useContext(alertsContext)
    const { loadingActions, axiosPost, axiosGet } = useContext(actionsBackend)

    const resetForm = () => {
        setCuit("")
        setName("")
        setDni("")
        setDirection("")
        setProfNumber("")
        setHours("")
        setCategory("")
        setActivity("")
        setEmail("")
        setPhone("")
        setInvalidDNI(false)
        setInvalidCUIT(false)
        setDataFisca([])
    }

    const providersPost = async () => {
        const data = {
            name: name,
            sector_id: sectorId,
            dni: dni,
            cuit: cuit,
            direction: direction,
            prof_numb: profNumber,
            is_professional: isProf,
            is_health_prof: isHealthProf,
            hours: hours,
            month_amount: 0,
            amount_id: amountId,
            category: category,
            activity: activity,
            email: email,
            phone: phone,
            from_month: fromMonth,
            to_month: toMonth
        }
        if (idProv) {
            data.id_provider = idProv
        }
        const response = await axiosPost(UrlNodeServer.providersDir.providers, data)
        if (!response.error) {
            if (idProv) {
                newActivity(`El usuario ha modificado al monotributista ${name} (CUIT: ${cuit})`)
                newAlert("success", "Monotributista modificado con éxito!", "")
                setModuleActive(0)
            } else {
                newActivity(`El usuario ha creado al monotributista ${name} (CUIT: ${cuit})`)
                newAlert("success", "Monotributista agregado con éxito!", "")
            }
            resetForm()
            setIdProv(false)
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
    }

    const providerGet = async () => {
        const response = await axiosGet(UrlNodeServer.providersDir.sub.details, idProv)
        if (!response.error) {
            setName(response.data[0].name)
            setSectorId(response.data[0].sector_id)
            setDni(response.data[0].dni)
            setCuit(response.data[0].cuit)
            setDirection(response.data[0].direction)
            setIsProf(response.data[0].is_professional)
            setIsHealthProf(response.data[0].is_health_prof)
            setHours(response.data[0].hours)
            setAmountId(response.data[0].amount_id)
            setCategory(response.data[0].category)
            setActivity(response.data[0].activity)
            setEmail(response.data[0].email)
            setPhone(response.data[0].phone)
            setFromMonth(response.data[0].from_month)
            setToMonth(response.data[0].to_month)
        } else {
            newAlert("danger", `Hubo un error`, `Error: ${response.errorMsg}`)
        }
    }

    useEffect(() => {
        if (idProv) {
            providerGet()
        } else {
            //resetForm()
        }
        // eslint-disable-next-line 
    }, [idProv])

    useEffect(() => {
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
                setDirection(`${gralData.domicilioFiscal.direccion}, ${gralData.domicilioFiscal.localidad ? ` ${(gralData.domicilioFiscal.localidad).replace("*", "").trim()}, ` : ""}${gralData.domicilioFiscal.descripcionProvincia}`)
            } else {
                setDirection("")
            }
        }
        if (dataFiscal.datosMonotributo) {
            const monotrData = dataFiscal.datosMonotributo
            setActivity(monotrData.actividadMonotributista.descripcionActividad)
            setCategory(monotrData.categoriaMonotributo.descripcionCategoria)
        } else {
            setActivity("")
            setCategory("")
        }
    }, [dataFiscal, cuit])

    return (
        <>
            <Form onSubmit={e => {
                e.preventDefault()
                providersPost()
            }} className={loadingActions ? "shimmer" : ""}>
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
                        <Input disabled value={category} onChange={e => setCategory(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <Label>Telefóno</Label>
                            <Input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                        </FormGroup>
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
                            <Input type="select" value={isHealthProf} onChange={e => {
                                setAmountId(false)
                                setIsHealthProf(e.target.value)
                            }} >
                                <option value={1}>Si</option>
                                <option value={0}>No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={parseInt(isHealthProf) === 1 ? 3 : 4}>
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
                                <SectorsListOpt
                                    refresh={modalSectors}
                                    setSectorId={setSectorId}
                                />
                            </Input>
                        </FormGroup>
                    </Col>
                    {parseInt(isHealthProf) === 1 ?
                        <>
                            <Col md="3">
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
                                        <AmountsFixListOpt
                                            refresh={modalAmountPerH || isHealthProf}
                                            type={1}
                                            setAmountId={setAmountId}
                                        />
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup style={{ marginTop: "10px" }}>
                                    <Label>Hs por período</Label>
                                    <Input type="number" value={hours} onChange={e => setHours(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </> : <>
                            <Col md="4">
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
                                    <Input type="select" value={amountId} onChange={e => setAmountId(e.target.value)}>
                                        <AmountsFixListOpt
                                            refresh={modalAmountFix || isHealthProf}
                                            type={0}
                                            setAmountId={setAmountId}
                                        />
                                    </Input>
                                </FormGroup>
                            </Col>
                        </>}
                    <Col md="2">
                        <FormGroup style={{ marginTop: "10px" }}>
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
                    <Col md="2">
                        <FormGroup style={{ marginTop: "10px" }}>
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
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button disabled={!sectorId || !amountId} color="primary" type="submit">
                            {idProv ? "Modificar Monotributista" : "Agregar Monotributista"}
                        </Button>
                        <Button color="danger" onClick={e => {
                            e.preventDefault()
                            resetForm()
                            setIdProv(false)
                            setModuleActive(0)
                        }}>
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