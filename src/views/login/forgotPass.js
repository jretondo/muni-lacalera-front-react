import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
  Spinner
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import UrlNodeServer from '../../api/nodeServer'
import axios from 'axios'
import alertsContext from 'context/alerts';

const ForgPass = () => {
  const [email, setEmail] = useState("")
  const [esperar, setEsperar] = useState(false)
  const [done, setDone] = useState(false)

  const { newAlert } = useContext(alertsContext)

  const recuperarPass = async () => {
    const datos = {
      email: email
    }
    setEsperar(true)
    await axios.patch(UrlNodeServer.authDir.auth, datos)
      .then(res => {
        setEsperar(false)
        const respuesta = res.data
        const estatus = parseInt(respuesta.status)
        if (estatus === 200) {
          newAlert("success", "Contraseña nueva!", "Su contraseña ha sido cambiada con éxito.")
          setDone(true)
        } else {
          newAlert("danger", "Error inesperado!", "Intente nuevamente.")
        }
      })
      .catch(() => {
        newAlert("danger", "Error inesperado!", "Intente nuevamente.")
      })
  }

  if (done) {
    return (
      <Redirect
        className="text-light"
        to={process.env.PUBLIC_URL + "/auth/login"}
      />
    )
  } else {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <span style={{ fontWeight: "bold" }}>Ingrese su casilla de correo:</span>
              </div>
              {
                esperar ?
                  <Col md="12" style={{ textAlign: "center" }}>
                    <Spinner color="primary" style={{ width: "250px", height: "250px" }} />
                  </Col> :
                  <Form onSubmit={e => {
                    e.preventDefault()
                    recuperarPass()
                  }}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="new-email" id="emailInp" required />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button style={{ marginTop: "3em" }} color="primary" type="submit">
                        Recuperar Contraseña
                      </Button>
                    </div>
                  </Form>
              }
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
                tag={Link}
              >
                <small>Loguearse</small>
              </NavLink>
            </Col>
            <Col className="text-right" xs="6">

            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default ForgPass;