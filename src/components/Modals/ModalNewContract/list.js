import UrlNodeServer from '../../../api/nodeServer';
import { TableList } from 'components/Lists/TableList';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import PaginationComp from 'components/Pagination/Pages';
import ContractsProvRow from 'components/Lists/Rows/ContractsProvRow';

const ListContractsProv = ({
    idProv
}) => {
    const [page, setPage] = useState(1)
    const [listContracts, setListContracts] = useState(<></>)
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList
    } = useAxiosGetList(
        UrlNodeServer.contractsDir.contracts,
        page, false,
        [{ idProv: idProv }])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            setListContracts(
                dataPage.map((item, key) => {
                    return (<ContractsProvRow
                        key={key}
                        id={key}
                        item={item}
                    />)
                })
            )
        }
    }, [dataPage, loadingList, errorList])

    return (
        <>
            <Row>
                <Col md="12">
                    <TableList
                        titlesArray={["Desde", "Hasta", "Observación"]}
                    >
                        {listContracts}
                    </TableList>
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

export default ListContractsProv