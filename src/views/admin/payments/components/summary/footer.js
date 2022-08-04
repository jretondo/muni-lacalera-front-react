import { TableList } from '../../../../../components/Lists/TableList';
import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from 'function/capitalizeFisrtWord';
import moment from 'moment-with-locales-es6';
import { numberFormat } from 'function/numberFormat';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const SummaryFooter = ({
    data
}) => {
    const [amountRows, setAmountRows] = useState(<td></td>)
    const [labels, setLabels] = useState([""])
    const [finalList, setFinalList] = useState(<><tr></tr><tr></tr></>)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        let periods = []
        let amounts = <></>
        let hours = <></>
        let cantHours = 0
        let cantAmount = 0

        if (data.length > 0) {
            // eslint-disable-next-line
            data.map((item, key) => {
                cantAmount = cantAmount + parseFloat(item.totalAmount)
                cantHours = cantHours + parseFloat(item.totalHours)
                const period = moment(`${item.year}-${item.month}-01`, "YYYY-MM-DD").toDate()
                const periodStr = `${capitalizeFirstLetter(moment(period).locale("es").format("MMMM"))}/${moment(period).format("YYYY")}`
                periods.push(periodStr)
                amounts = <>{amounts} <td style={{ textAlign: "center" }}>$ {numberFormat(item.totalAmount)}</td></>
                hours = <>{hours} <td style={{ textAlign: "center" }}>{item.totalHours} hs.</td></>
                if (key === data.length - 1) {
                    setLabels(periods)
                    setAmountRows(amounts)
                    setTotalAmount(cantAmount)
                }
            })
        }
    }, [data])

    useEffect(() => {
        setFinalList(<>
            <tr className="table-light">
                <td>total en $</td>
                {amountRows}
            </tr>
        </>)
    }, [amountRows])

    return (
        <>
            <Row>
                <Col>
                    <TableList titlesArray={["Tipo", ...labels]}>
                        {finalList}
                    </TableList>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <FormGroup style={{ border: "2px solid red", padding: "15px", fontSize: "18px" }}>
                        <Label >
                            TOTAL EN PESOS
                        </Label>
                        <Input value={"$ " + numberFormat(totalAmount)} disabled />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default SummaryFooter