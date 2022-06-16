import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { TableList } from '../../../../../components/Lists/TableList';
import { SearchFormButtonAddon } from 'components/Search/Search2';
import { useAxiosGetList } from '../../../../../hooks/useAxiosGetList';
import UrlNodeServer from '../../../../../api/nodeServer';
import PaginationComp from 'components/Pagination/Pages';
import { SectorsListOpt } from './sectorsList';

const List = ({
    setIdMono
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [providersRows, setProvidersRows] = useState(<tr><td>No hay monotributistas con los filtros colocados</td></tr>)
    const [advanceSearch, setAdvanceSearch] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [sectorId, setSectorId] = useState("")
    const [isProf, setIsProf] = useState("")
    const [isHealthProf, setIsHealthProf] = useState("")
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.providersDir.providers,
            page, refreshList,
            [{ query: textSearch },
            { sectorId: sectorId },
            { isProf: isProf },
            { isHealthProf: isHealthProf }])


    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            let first = true
            setProvidersRows(
                dataPage.map((item, key) => {
                    if (key > 0) {
                        first = false
                    }
                    return (<providersRows
                        id={key}
                        item={item}
                        setIdDetail={setIdMono}
                        first={first}
                        page={page}
                        setPage={setPage}
                        refreshToggle={() => setRefreshList(!refreshList)}
                    />)
                })
            )
        } else {
            setProvidersRows(<tr><td>No hay monotributistas con los filtros colocados</td></tr>)
        }
    }, [dataPage, errorList, page, refreshList, setIdMono])


    return (
        <>

            <Row style={{ marginBottom: "15px" }}>
                <Col md="4" style={{ textAlign: "left" }}>
                    <SearchFormButtonAddon
                        title={"Buscar Monotributista"}
                        setStringSearched={setTextSearch}
                        stringSearched={textSearch}
                        fnButton={() => setAdvanceSearch(!advanceSearch)}
                        titleFn={advanceSearch ? "X" : "Avanzadas"}
                        refreshToggle={() => setRefreshList(!refreshList)}
                    />
                </Col>
                {!advanceSearch ? null :
                    <>
                        <Col md="4">
                            <FormGroup>
                                <Label>Sector</Label>
                                <Input value={sectorId} onChange={e => setSectorId(e.target.value)} type="select">
                                    <option value={""}>Todos los sectores</option>
                                    <SectorsListOpt />
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <FormGroup>
                                <Label>Profesional</Label>
                                <Input value={isProf} onChange={e => setIsProf(e.target.value)} type="select">
                                    <option value={""}>Todos</option>
                                    <option value={1}>Si</option>
                                    <option value={0}>No</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <FormGroup>
                                <Label>Prof. Salud</Label>
                                <Input value={isHealthProf} onChange={e => setIsHealthProf(e.target.value)} type="select">
                                    <option value={""}>Todos</option>
                                    <option value={1}>Si</option>
                                    <option value={0}>No</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </>}
            </Row>

            <Row>
                <Col>
                    {loadingList ?
                        <Col style={{ textAlign: "center" }} md="12">
                            <Spinner color="danger" style={{ width: "170px", height: "170px", margin: "auto" }} />
                        </Col>
                        :
                        <TableList titlesArray={["Nombre", "CUIT", "Sector", "Dirección", ""]}  >
                            {providersRows}
                        </TableList>}
                </Col>
            </Row>
            <Row>
                <Col>
                    {!pageObj ? null :
                        <PaginationComp
                            page={page}
                            setPage={setPage}
                            data={pageObj}
                        />}
                </Col>
            </Row>
        </>
    )
}

export default List