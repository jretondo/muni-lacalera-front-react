import List from './components/list';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import Filter from './components/filter';

const ReportsPending = ({
    moduleActive
}) => {
    const [data, setData] = useState([])
    return (<>
        <Filter
            setData={setData}
            moduleActive={moduleActive}
        />
        <Row>
            <Col md="8">

            </Col>
            <Col md="4">
                <List
                    data={data}
                />
            </Col>
        </Row>
    </>)
}

export default ReportsPending