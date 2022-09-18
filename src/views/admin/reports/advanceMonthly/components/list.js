import { AdvancePendingRow } from 'components/Lists/Rows/advancePendingRow';
import { TableList } from 'components/Lists/TableList';
import { numberFormat } from 'function/numberFormat';
import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const List = ({ data, totalToPay, monthSelect, yearSelect }) => {
    const [pendingsList, setPendingsList] = useState(<tr><td>No hay reporte generado con los filtros colocados</td></tr>)

    useEffect(() => {
        if (data.length > 0) {
            setPendingsList(
                // eslint-disable-next-line
                data.map((item, key) => {
                    return (<AdvancePendingRow
                        key={key}
                        id={key}
                        item={item}
                    />)
                })
            )
        } else {
            setPendingsList(<tr><td>No hay reporte generado con los filtros colocados</td></tr>)
        }
    }, [data])

    return (
        <>
            <Row style={{ marginTop: "30px" }}>
                <Col md="12">
                    <TableList titlesArray={["Nombre", "CUIT", "Sector", "$ por descontar"]}  >
                        {pendingsList}
                    </TableList>
                </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
                <Col>
                    <FormGroup>
                        <Label style={{ fontWeight: "bold" }}>
                            Total a descontar en {monthSelect}/{yearSelect}
                        </Label>
                        <Input type="text" disabled style={{ fontSize: "20px", fontWeight: "bold", color: `${totalToPay < 0 ? "red" : "green"}` }} value={"$ " + numberFormat(totalToPay)} />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default List