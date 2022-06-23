import UrlNodeServer from '../../../../../../../api/nodeServer';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useAxiosGetList } from '../../../../../../../hooks/useAxiosGetList';
import { TableList } from 'components/Lists/TableList';

const ListSectors = () => {
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
            page, refreshList, [{ query: textSearch }])

    useEffect(() => {
        if (dataPage.length > 0) {

        } else {

        }
    }, [dataPage, errorList])

    return (
        <Row>
            <Col md="12">
                <TableList
                    titlesArray={["Sector", "Descripción", ""]}
                >
                    {sectorRows}
                </TableList>
            </Col>
        </Row>
    )
}

export default ListSectors