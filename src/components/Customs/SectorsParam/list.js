import UrlNodeServer from '../../../api/nodeServer';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { useAxiosGetList } from '../../../hooks/useAxiosGetList';
import { TableList } from 'components/Lists/TableList';
import { SearchFormComponent } from 'components/Search/Search1';
import PaginationComp from 'components/Pagination/Pages';
import { SectorRow } from 'components/Lists/Rows/sectorRow';

const ListSectors = ({
    setIdSector,
    setOpenForm
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [sectorRows, setSectorRows] = useState(<></>)

    const {
        pageObj,
        dataPage,
        errorList,
        loadingList } =
        useAxiosGetList(UrlNodeServer.sectorsDir.sectors,
            page, refreshList, [{ query: textSearch }, { cantPerPage: 5 }])

    useEffect(() => {
        if (dataPage.length > 0) {
            setSectorRows(
                dataPage.map((item, key) => {
                    let first = true
                    if (key > 0) {
                        first = false
                    }
                    return (
                        <SectorRow
                            key={key}
                            id={key}
                            item={item}
                            setIdSector={setIdSector}
                            refreshToggle={() => setRefreshList(!refreshList)}
                            first={first}
                            page={page}
                            setPage={setPage}
                        />
                    )
                })
            )
        } else {
            setSectorRows(<tr><td>No hay sectores listados</td></tr>)
        }
    }, [dataPage, errorList, refreshList, setRefreshList, page, setIdSector])

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
                            title="Buscar Sector"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <TableList
                            titlesArray={["Sector", "Descripción", ""]}
                        >
                            {sectorRows}
                        </TableList>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" >
                        <Button color="primary" onClick={e => {
                            e.preventDefault()
                            setOpenForm(true)
                        }}>
                            Nuevo Sector
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

export default ListSectors