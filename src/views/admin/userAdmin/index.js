import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Header from "components/Headers/Header.js";
import UserList from './list'
import UserForm from './form'
import UserPermissions from './permissions'
import secureContext from 'context/secureRoutes';
import UrlNodeServer from '../../../api/nodeServer';

const UserAdmin = () => {
    const [newForm, setNewForm] = useState(false)
    const [detBool, setDetBool] = useState(false)
    const [idDetail, setIdDetail] = useState(0)
    const [permissionsBool, setPermissionsBool] = useState(false)
    const [idPermissions, setIdPermissions] = useState(0)
    const [userPermissions, setUserPermissions] = useState("")

    const [call, setCall] = useState(false)

    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        if (detBool || permissionsBool) {
            setNewForm(true)
        }
    }, [detBool, permissionsBool])

    useEffect(() => {
        if (!newForm) {
            setDetBool(false)
            setPermissionsBool(false)
        }
    }, [newForm])

    useEffect(() => {
        setUrlRoute(UrlNodeServer.routesDir.sub.userAdmin)
    }, [])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {
                    !newForm ?
                        <UserList
                            nvaOffer={newForm}
                            setNvaOffer={setNewForm}
                            call={call}
                            setCall={setCall}
                            setDetBool={setDetBool}
                            setIdDetalle={setIdDetail}
                            setPermisosBool={setPermissionsBool}
                            setIdPermisos={setIdPermissions}
                            setUsuarioPermiso={setUserPermissions}
                        /> :
                        permissionsBool ?
                            <UserPermissions
                                setNvaOffer={setNewForm}
                                idPermisos={idPermissions}
                                usuarioPermiso={userPermissions}
                            />
                            :
                            <UserForm
                                setNvaOffer={setNewForm}
                                idDetalle={idDetail}
                                detBool={detBool}
                            />
                }
            </Container>
        </>
    )
}

export default UserAdmin