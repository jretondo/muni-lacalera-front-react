import UrlNodeServer from '../../../api/nodeServer';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { useAxiosGetList } from '../../../hooks/useAxiosGetList';
import { TableList } from 'components/Lists/TableList';
import { SearchFormComponent } from 'components/Search/Search1';
import PaginationComp from 'components/Pagination/Pages';
import { AmountRow } from 'components/Lists/Rows/amountRow';

const ListFixAmount = ({
    setIdAmount,
    setOpenForm
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [amountsRows, setAmountsRows] = useState(<></>)

    const {
        pageObj,
        dataPage,
        errorList,
        loadingList } =
        useAxiosGetList(UrlNodeServer.amountsDir.amounts,
            page, refreshList, [{ query: textSearch }, { cantPerPage: 5 }, { type: 0 }])

    useEffect(() => {
        if (dataPage.length > 0) {
            setAmountsRows(
                dataPage.map((item, key) => {
                    let first = true
                    if (key > 0) {
                        first = false
                    }
                    return (
                        <AmountRow
                            key={key}
                            id={key}
                            item={item}
                            setIdAmount={setIdAmount}
                            refreshToggle={() => setRefreshList(!refreshList)}
                            first={first}
                            page={page}
                            setPage={setPage}
                        />
                    )
                })
            )
        } else {
            setAmountsRows(<tr><td>No hay montos listados</td></tr>)
        }
    }, [dataPage, errorList, refreshList, setRefreshList, page, setIdAmount])

    if (loadingList) {
        return (<Row><Col md="12" style={{ textAlign: "center" }}><Spinner style={{ width: "200px", height: "200px" }} color="warning" /></Col></Row>)
    } else {
        return (
            <>
                <Row style={{ marginBottom: "15px" }}>
                    <Col md="12">
                        <SearchFormComponent
                            setStringSearched={setTextSearch}
                            stringSearched={textSearch}
                            setRefreshList={setRefreshList}
                            refreshList={refreshList}
                            title="Buscar Monto"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <TableList
                            titlesArray={["Nombre", "Monto", "Descripción", ""]}
                        >
                            {amountsRows}
                        </TableList>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" >
                        <Button color="primary" onClick={e => {
                            e.preventDefault()
                            setOpenForm(true)
                        }}>
                            Nuevo Monto
                        </Button>
                    </Col>
                    <Col md="6" style={{ textAlign: "right" }}>
                        <PaginationComp
                            page={page}
                            setPage={setPage}
                            data={pageObj}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default ListFixAmount