import AmountFixParam from 'components/Customs/AmountFixParam';
import AmountPerHParam from 'components/Customs/AmountPerHParam';
import SectorsParam from 'components/Customs/SectorsParam';
import React, { useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';


const Params = () => {
    const [typeParam, setTypeParam] = useState(0)
    return (<>
        <Row>
            <Col md="3"></Col>
            <Col md="6">
                <FormGroup>
                    <Label>Tipo de parámetro</Label>
                    <Input type="select" value={typeParam} onChange={e => setTypeParam(e.target.value)} >
                        <option value={0} >Sectores</option>
                        <option value={1}>Montos Fijos Mensuales</option>
                        <option value={2} >Montos por Hora</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col md="3"></Col>
        </Row>
        {
            parseInt(typeParam) === 0 ?
                <SectorsParam
                    refresh={typeParam}
                /> : parseInt(typeParam) === 1 ?
                    <AmountFixParam
                        refresh={typeParam}
                    /> : <AmountPerHParam
                        refresh={typeParam}
                    />
        }
    </>)
}
export default Params