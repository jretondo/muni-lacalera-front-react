import React from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

const PeriodRow = ({
    id,
    periods,
    setPeriods,
    item
}) => {

    return (
        <Col md="12">
            <Row>
                <Col md="5">
                    <FormGroup>
                        <Label>
                            Mes
                        </Label>
                        <Input type="select" value={item.month} onChange={e => {
                            const newArray = [...periods]
                            newArray.splice(id, 1, { month: e.target.value, year: item.year, amount: item.amount })
                            setPeriods(() => [...newArray])
                        }}>
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
                <Col md="3">
                    <FormGroup>
                        <Label>
                            Año
                        </Label>
                        <Input type="number" min={2010} value={item.year} onChange={e => {
                            const newArray = [...periods]
                            newArray.splice(id, 1, { month: item.month, year: e.target.value, amount: item.amount })
                            setPeriods(() => [...newArray])
                        }} />
                    </FormGroup>
                </Col>
                <Col md="3">
                    <FormGroup>
                        <Label>
                            Importe
                        </Label>
                        <Input type="number" min={0.01} step={0.01} value={item.amount} onChange={e => {
                            const newArray = [...periods]
                            newArray.splice(id, 1, { month: item.month, year: item.year, amount: e.target.value })
                            setPeriods(() => [...newArray])
                        }} />
                    </FormGroup>
                </Col>
                {id === 0 ? null :
                    <Col md="1">
                        <Button
                            color="danger"
                            style={{
                                borderRadius: "50%",
                                padding: "6px",
                                paddingInline: "13px",
                                marginLeft: "10px",
                                position: "absolute",
                                top: "30%",
                                right: "40%",
                                fontSize: "20px"
                            }}
                            onClick={e => {
                                e.preventDefault()
                                const newArray = [...periods]
                                newArray.splice(id, 1)
                                setPeriods(() => [...newArray])
                            }}
                        ><i className='fa fa-times'></i></Button>
                    </Col>}
            </Row >
        </Col >
    )
}

export default PeriodRow