import UrlNodeServer from 'api/nodeServer';
import ProviderSearchRow2 from 'components/Lists/Rows/providersSearchRow2';
import { TableList } from 'components/Lists/TableList';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';

const ModalProviders = ({
    modal,
    toggle,
    setProviderId,
    setProviderName
}) => {
    const [textSearch, setTextSearch] = useState("")
    const [refreshList, setRefreshList] = useState(false)
    const [providersRows, setProvidersRows] = useState(<></>)
    const {
        loadingList,
        dataPage,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.providersDir.providers,
            1, refreshList,
            [{ query: textSearch }])

    const search = () => {
        setRefreshList(!refreshList)
    }

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            setProvidersRows(
                dataPage.map((item, key) => {
                    return (<ProviderSearchRow2
                        key={key}
                        id={key}
                        item={item}
                        setProviderId={setProviderId}
                        setProviderName={setProviderName}
                    />)
                })
            )
        } else {
            setProvidersRows(<tr><td>No hay monotributistas con los filtros colocados</td></tr>)
        }
    }, [dataPage, errorList, refreshList, setProviderId, setProviderName])

    useEffect(() => {
        setRefreshList(!refreshList)
        // eslint-disable-next-line
    }, [])

    return (
        <Modal size="lg" toggle={toggle} isOpen={modal}>
            <ModalHeader toggle={toggle}>
                Buscar Monotributista
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>
                                Monotributista
                            </Label>
                            <InputGroup>
                                <Input
                                    value={textSearch}
                                    type="text"
                                    onChange={e => {
                                        setTextSearch(e.target.value)
                                    }}
                                    onKeyDown={e => {
                                        if (e.keyCode === 13) {
                                            setRefreshList(!refreshList)
                                        }
                                    }}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        color="primary"
                                        onClick={e => {
                                            e.preventDefault()
                                            search()
                                        }}
                                    >Buscar</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {
                            loadingList ?
                                <Spinner color="primary" />
                                :
                                <TableList
                                    titlesArray={["Monotributista", "CUIT", ""]}
                                >
                                    <ProviderSearchRow2
                                        key={-1}
                                        id={-1}
                                        item={{
                                            name: "Todos los monotributistas",
                                            cuit: "",
                                            id_provider: ""
                                        }}
                                        setProviderId={setProviderId}
                                        setProviderName={setProviderName}
                                    />
                                    {providersRows}
                                </TableList>
                        }
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>)
}

export default ModalProviders