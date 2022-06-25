import AmountFixParam from 'components/Customs/AmountFixParam';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const SectorsModal = ({
    modal,
    toggle
}) => {
    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de montos fijos
            </ModalHeader>
            <ModalBody>
                <AmountFixParam
                    refresh={modal}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SectorsModal