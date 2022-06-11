import UrlNodeServer from '../../../../api/nodeServer'
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import alertsContext from 'context/alerts';

const UserForm = ({
    setNewForm,
    idDetail,
    detBool
}) => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [tel, setTel] = useState("")

    const { newAlert, newActivity } = useContext(alertsContext)

    const newUser = async () => {
        setLoading(true)
        const data = {
            name,
            lastname,
            email,
            user,
            tel
        }

        if (detBool) {
            data.id = idDetail
        }

        await axios.post(UrlNodeServer.usersDir.users, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201) {
                if (detBool) {
                    newActivity(`Se ha modificado al usuario ${name} ${lastname} usuario: ${user}`)
                    newAlert("success", "Usuario modificado con éxito!", "")
                    //setActividadStr("El usuario a modificado al ususario " + usuario)
                    setNewForm(false)
                } else {
                    newActivity(`Se ha creado al usuario ${name} ${lastname} usuario: ${user}`)
                    newAlert("success", "Usuario agregado con éxito!", "En breve le llegará un email con el aviso")
                    //setActividadStr("El usuario a agregado al ususario " + usuario)
                }
                ResetForm()
            } else {
                newAlert("danger", "Hubo un error!", "Revise que el nombre de usuario no esté repetido")
            }
        }).catch(() => {
            newAlert("danger", "Hubo un error!", "Revise que el nombre de usuario no esté repetido")
        }).finally(() => {
            setLoading(false)
        })
    }

    const getUser = useCallback(async () => {
        setLoading(true)
        await axios.get(`${UrlNodeServer.usersDir.sub.details}/${idDetail}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                const userData = res.data.body[0]
                setName(userData.name)
                setLastname(userData.lastname)
                setUser(userData.user)
                setEmail(userData.email)
                setTel(userData.tel)
            } else {
                newAlert("danger", "Hubo un error al querer ver el detalle", "Intente nuevamente")
            }
        }).catch((error) => {
            newAlert("danger", "Hubo un error al querer ver el detalle", "error: " + error.message)
        }).finally(() => setLoading(false))
        // eslint-disable-next-line
    }, [idDetail])

    const userName = () => {
        const firstNameLet = name.substring(0, 1)
        const userName = (firstNameLet + lastname).toLowerCase()
        setUser(userName)
    }

    const ResetForm = () => {
        setName("")
        setLastname("")
        setUser("")
        setEmail("")
        setTel("")
    }

    useEffect(() => {
        if (detBool) {
            getUser()
        }
    }, [detBool, getUser])

    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{detBool ? `Modificar usuario ${name} ${lastname}` : "Usuario Nuevo"}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setNewForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {
                    loading ?
                        <div style={{ textAlign: "center", marginTop: "0" }}>
                            <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                        </div> :
                        <Form onSubmit={e => {
                            e.preventDefault();
                            newUser();
                        }} >
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="nameTxt">Nombre</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="nameTxt"
                                            placeholder="Nombre del usuario..."
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="apellidoTxt">Apellido</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="apellidoTxt"
                                            placeholder="Apellido del usuario..."
                                            value={lastname}
                                            onChange={e => setLastname(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="userTxt">Usuario</Label>
                                        <Input
                                            type="text"
                                            name="user"
                                            id="userTxt"
                                            placeholder="Usuario..."
                                            value={user}
                                            onChange={e => setUser(e.target.value)}
                                            onFocus={userName}
                                            required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <Label for="emailTxt">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="emailTxt"
                                            placeholder="Email del usuario..."
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="telTxt">Telefóno</Label>
                                        <Input
                                            type="text"
                                            id="telTxt"
                                            placeholder="Telefóno..."
                                            value={tel}
                                            onChange={e => setTel(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: "150px", margin: "20px" }}
                                        type="submit"
                                    >
                                        {detBool ? "Modificar" : "Agregar"}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ width: "150px", margin: "20px" }}
                                        onClick={e => {
                                            e.preventDefault();
                                            setNewForm(false);
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                }
            </CardBody>
        </Card>
    </>)
}

export default UserForm