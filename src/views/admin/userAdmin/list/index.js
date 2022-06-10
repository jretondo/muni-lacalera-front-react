import UrlNodeServer from '../../../../api/nodeServer'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner } from 'reactstrap'
import FilaUsuario from 'components/Lists/Rows/usersRow'
import BusquedaProdForm from 'components/Search/Search1'
import Paginacion from 'components/Pagination/Pages'
import ListTable from '../../../../components/Lists/ListadoTable'
import { useAxiosGetList } from '../../../../hooks/useAxiosGetList';

const titulos = ["Nombre", "Usuario", "Email", ""]

const UserList = ({
    nvaOffer,
    setNvaOffer,
    call,
    setCall,
    setDetBool,
    setIdDetalle,
    setPermisosBool,
    setIdPermisos,
    setUsuarioPermiso
}) => {
    const [loading, setloading] = useState(false)
    const [listado, setListado] = useState([])
    const [pagina, setPagina] = useState(1)
    const [plantPaginas, setPlantPaginas] = useState([])
    const [ultimaPag, setUltimaPag] = useState(0)
    const [dataState, setDataState] = useState([])
    const [busquedaBool, setBusquedaBool] = useState(false)
    const [palabraBuscada, setPalabraBuscada] = useState("")

    const {
        dataPage,
        pageObj,
        errorList,
        loadingList
    } = useAxiosGetList(
        UrlNodeServer.usuariosDir.usuarios,
        pagina, busquedaBool, palabraBuscada
    )

    const listUsers = () => {
        if (errorList) {
            setDataState([])
            setListado(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td> <span style={{ textAlign: "center", marginRight: "auto", marginLeft: "auto" }}> No hay productos cargados</span></td>
                </tr>
            )
        } else {
            setDataState(pageObj)
            setListado(
                dataPage.map((item, key) => {
                    let primero
                    if (key === 0) {
                        primero = true
                    } else {
                        primero = false
                    }
                    return (
                        <FilaUsuario
                            id={key}
                            key={key}
                            item={item}
                            setEsperar={setloading}
                            nvaOffer={nvaOffer}
                            setDetallesBool={setDetBool}
                            setIdDetalle={setIdDetalle}
                            primero={primero}
                            pagina={pagina}
                            setPagina={setPagina}
                            setNvaOffer={setNvaOffer}
                            setPermisosBool={setPermisosBool}
                            setIdPermisos={setIdPermisos}
                            setUsuarioPermiso={setUsuarioPermiso}
                        />
                    )
                })
            )
        }
    }

    useEffect(() => {
        listUsers()
    }, [dataPage, errorList, loadingList])

    return (
        <Card>
            <CardHeader className="border-0">
                <Row>
                    <Col md="4" >
                        <h2 className="mb-0">Lista de Usuarios</h2>
                    </Col>
                    <Col md="8" style={{ textAlign: "right" }}>
                        <BusquedaProdForm
                            busquedaBool={busquedaBool}
                            setPalabraBuscada={setPalabraBuscada}
                            palabraBuscada={palabraBuscada}
                            setBusquedaBool={setBusquedaBool}
                            call={call}
                            setCall={setCall}
                            titulo="Buscar un Usuario"
                        />
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        {
                            !loadingList ?
                                <ListTable
                                    titlesArray={titulos}
                                >
                                    {listado}
                                </ListTable>
                                :
                                <div style={{ textAlign: "center", marginTop: "0" }}>
                                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                                </div>
                        }
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md="6">
                        <button
                            className="btn btn-primary"
                            onClick={e => {
                                e.preventDefault();
                                setNvaOffer(true);
                            }}
                        >
                            Nuevo Usuario
                        </button>
                    </Col>
                    <Col>
                        <Paginacion
                            setPagina={setPagina}
                            setCall={setCall}
                            pagina={pagina}
                            call={call}
                            plantPaginas={plantPaginas}
                            ultimaPag={ultimaPag}
                            data={dataState}
                            setPlantPaginas={setPlantPaginas}
                            setUltimaPag={setUltimaPag}
                        />
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    )
}

export default UserList