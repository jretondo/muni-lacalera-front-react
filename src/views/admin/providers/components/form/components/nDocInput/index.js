import UrlNodeServer from '../../../../../../../api/nodeServer'
import React, { useContext, useEffect } from 'react'
import { Col, FormFeedback, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { verifyCuit } from 'function/verifyCuit'
import actionsBackend from 'context/actionsBackend';
import './shimmer.css';
const NdocInput = ({
    tipoDoc,
    ndoc,
    setNdoc,
    invalidNdoc,
    setInvalidNdoc,
    setDataFisca,
    colSize,
}) => {
    const { axiosGetQuery, loadingActions } = useContext(actionsBackend)

    const Find = async () => {
        if (parseInt(tipoDoc) === 96) {
            const largo = ndoc.length
            if (largo > 8 || largo < 7) {
                setInvalidNdoc(true)
            } else {
                setInvalidNdoc(false)
            }
        } else {
            const esCuit = verifyCuit(ndoc).isCuit
            if (esCuit) {
                getDataFiscalClient()
                setInvalidNdoc(false)
            } else {
                setInvalidNdoc(true)
            }
        }
    }

    const getDataFiscalClient = async () => {
        const verifCuit = await verifyCuit(ndoc)
        if (verifCuit.isCuit) {
            const response = await axiosGetQuery(UrlNodeServer.providersDir.sub.fiscal, [{ cuit: ndoc }])
            if (!response.error) {
                setDataFisca(response.data.data)
            } else {
                setDataFisca([])
            }
        } else {
            setDataFisca([])
        }
    }

    useEffect(() => {
        Find()
        // eslint-disable-next-line
    }, [tipoDoc, ndoc])

    return (
        <Col md={colSize}>
            <Label for="nDoc">{parseInt(tipoDoc) === 80 ? "Nº CUIT" : "Nº DNI"}</Label>
            <FormGroup>
                <Input
                    disabled={loadingActions}
                    required
                    invalid={invalidNdoc}
                    type="number"
                    id="nDoc"
                    value={ndoc}
                    onChange={e => setNdoc(e.target.value)}
                    onBlur={() => Find()}
                    className={loadingActions ? "shimmer" : ""}
                />
                <FormFeedback>{parseInt(tipoDoc) === 80 ? "El CUIT no es válido. Reviselo!" : "El DNI no es válido. Reviselo!"}</FormFeedback>
            </FormGroup>
        </Col>
    )
}

export default NdocInput