import { SearchFormComponent } from '../../../../../components/Search/Search1';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { TableList } from '../../../../../components/Lists/TableList';

const List = () => {
    const [page, setPage] = useState(1)

    const createRows = () => {

    }

    return (
        <>
            <Row>
                <Col>
                    <SearchFormComponent
                        title={"Buscar monotributista"}

                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableList titlesArray={["Nombre", "CUIT", "Sector", "Dirección", ""]}  >

                    </TableList>
                </Col>
            </Row>
        </>
    )
}

export default List