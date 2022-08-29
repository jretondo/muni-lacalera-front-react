import { PendingRow } from 'components/Lists/Rows/pendingRow';
import { TableList } from 'components/Lists/TableList';
import { numberFormat } from 'function/numberFormat';
import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const List = ({ data, totalToPay, monthSelect, yearSelect }) => {
    const [pendingsList, setPendingsList] = useState(<tr><td>No hay reporte generado con los filtro colocados</td></tr>)

    useEffect(() => {
        if (data.length > 0) {
            setPendingsList(
                // eslint-disable-next-line
                data.map((item, key) => {
                    return (<PendingRow
                        key={key}
                        id={key}
                        item={item}
                    />)
                })
            )
        }
    }, [data])

    return (
        <>
            <Row style={{ marginTop: "30px" }}>
                <Col md="12">
                    <TableList titlesArray={["Nombre", "CUIT", "Sector", "$ por trabajos", "$ pagado", "$ por pagar"]}  >
                        {pendingsList}
                    </TableList>
                </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
                <Col>
                    <FormGroup>
                        <Label style={{ fontWeight: "bold" }}>
                            Total a pagar en {monthSelect}/{yearSelect}
                        </Label>
                        <Input type="text" disabled style={{ fontSize: "20px", fontWeight: "bold", color: `${totalToPay < 0 ? "red" : "green"}` }} value={"$ " + numberFormat(totalToPay)} />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default List