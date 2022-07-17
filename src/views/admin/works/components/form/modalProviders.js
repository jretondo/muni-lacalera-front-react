import UrlNodeServer from 'api/nodeServer';
import ProviderSearchRow from 'components/Lists/Rows/providersSearchRow';
import { TableList } from 'components/Lists/TableList';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';

const ModalProviders = ({
    modal,
    toggle,
    setProviderId,
    setProviderName,
    setIsProfHealth,
    setPriceHour,
    setTotal,
    setCantHours
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
                    return (<ProviderSearchRow
                        key={key}
                        id={key}
                        item={item}
                        setProviderId={setProviderId}
                        setProviderName={setProviderName}
                        setIsProfHealth={setIsProfHealth}
                        setPriceHour={setPriceHour}
                        setTotal={setTotal}
                        setCantHours={setCantHours}
                    />)
                })
            )
        } else {
            setProvidersRows(<tr><td>No hay monotributistas con los filtros colocados</td></tr>)
        }
    }, [dataPage, errorList, refreshList, setProviderId, setProviderName, setCantHours, setTotal, setPriceHour, setIsProfHealth])

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