import UrlNodeServer from '../../../../../api/nodeServer';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { SectorsListOpt } from 'components/Customs/ListsOptions/sectorsList';
import { TableList } from 'components/Lists/TableList';
import PaginationComp from 'components/Pagination/Pages';
import { SearchFormButtonAddon } from 'components/Search/Search2';
import PaymentRow from 'components/Lists/Rows/paymentRow';

const ListPayments = ({
    setIdPayment,
    setModuleActive,
    moduleActive
}) => {
    const currentYear = new Date().getFullYear()
    const currentMonth = (new Date().getMonth() + 1)
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [paymentsRows, setPaymentsRows] = useState(<tr><td>No hay trabajos con los filtros colocados</td></tr>)
    const [textSearch, setTextSearch] = useState("")
    const [sectorId, setSectorId] = useState("")
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [advanceSearch, setAdvanceSearch] = useState(false)
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList }
        = useAxiosGetList(
            UrlNodeServer.paymentsDir.payments,
            page, refreshList,
            [{ query: textSearch },
            { sectorId: sectorId },
            { month: month },
            { year: year },
            { advanceSearch: advanceSearch }
            ])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            let first = true
            setPaymentsRows(
                dataPage.map((item, key) => {
                    if (key > 0) {
                        first = false
                    }
                    return (<PaymentRow
                        key={key}
                        id={key}
                        item={item}
                        setIdProv={setIdPayment}
                        first={first}
                        page={page}
                        setPage={setPage}
                        refreshToggle={() => setRefreshList(!refreshList)}
                        setModuleActive={setModuleActive}
                    />)
                })
            )
        } else {
            setPaymentsRows(<tr><td>No hay trabajos con los filtros colocados</td></tr>)
        }
    }, [dataPage, errorList, page, refreshList, setIdPayment, setModuleActive])

    useEffect(() => {
        setRefreshList(!refreshList)
        // eslint-disable-next-line 
    }, [moduleActive, sectorId, month, year, advanceSearch])

    return (<>

        <Row style={{ marginBottom: "15px" }}>
            <Col md="4" style={{ textAlign: "left" }}>
                <SearchFormButtonAddon
                    title={"Buscar registro de trabajo"}
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
                                <SectorsListOpt
                                    refresh={moduleActive}
                                    setSectorId={setSectorId}
                                />
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="2">
                        <FormGroup>
                            <Label>Mes</Label>
                            <Input value={month} onChange={e => setMonth(e.target.value)} type="select">
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
                        <FormGroup>
                            <Label>Año</Label>
                            <Input value={year} onChange={e => setYear(e.target.value)} type="number" />
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
                    <TableList titlesArray={["Fecha Reg.", "Monotributista", "Período", "Monto", ""]}  >
                        {paymentsRows}
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
    </>)
}

export default ListPayments